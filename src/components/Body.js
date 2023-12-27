import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

const Body = () => {
  // local state variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=31.001213&lng=75.9608385&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    const arrayOfCards = json.data.cards;
    const restaurant_list = "restaurant_grid_listing";

    for (const cardObj of arrayOfCards) {
      if (cardObj.card.card && cardObj.card.card.id === restaurant_list) {
        const resData =
          cardObj.card?.card?.gridElements?.infoWithStyle?.restaurants;
        console.log(resData);
        setListOfRestaurants(resData);
        setFilteredRestaurant(resData);
      }
    }
  };

  const handleFilterClick = () => {
    const filteredList = listOfRestaurants.filter(
      (res) => res?.info?.avgRating > 4
    );
    setFilteredRestaurant(filteredList);
  };

  const handleSearchClick = () => {
    // Filter the restaurant cards and update the UI
    const filteredRestaurants = listOfRestaurants.filter((res) => {
      return res?.info.name
        .toLowerCase()
        .trim()
        .includes(searchText.toLowerCase().trim());
    });

    setFilteredRestaurant(filteredRestaurants);
  };

  // Shimmer Effect before loading (conditional rendering)
  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button onClick={handleSearchClick}>Search</button>
        </div>
        <div className="top-rated">
          <button className="filter-btn" onClick={handleFilterClick}>
            Top Rated Restaurants
          </button>
        </div>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant?.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
