import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { RESTAURANT_API } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  // local state variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RESTAURANT_API);

    const json = await data.json();
    const arrayOfCards = json.data.cards;
    const restaurant_list = "restaurant_grid_listing";

    for (const cardObj of arrayOfCards) {
      if (cardObj.card.card && cardObj.card.card.id === restaurant_list) {
        const resData =
          cardObj.card?.card?.gridElements?.infoWithStyle?.restaurants;
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

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus)
    return <h1>Seems like you're offline, please connect to internet!!!</h1>;

  // Shimmer Effect before loading (conditional rendering)
  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex m-2 items-center px-10 py-2">
        <div>
          <input
            type="text"
            className="p-2 border rounded-md py-1"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-1 mx-2 bg-green-100 rounded-lg"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
        <div className="">
          <button
            className="px-4 py-1 mx-2 bg-green-100 rounded-lg items-end"
            onClick={handleFilterClick}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>
      <div className="flex flex-wrap px-20">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant?.info.id}
            to={"/restaurant/" + restaurant?.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
