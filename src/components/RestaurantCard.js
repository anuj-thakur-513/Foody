import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { name, cloudinaryImageId, cuisines, costForTwo, avgRating } =
    resData?.info;

  const { deliveryTime } = resData?.info?.sla;

  return (
    <div className="m-4 w-[250px] h-[350px] overflow-hidden rounded-lg transform transition-transform scale-100 hover:scale-95">
      <img
        className="rounded-xl w-full h-44"
        alt={name}
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-bold pt-2 pl-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {name}
      </h3>
      <h4 className="font-semibold pl-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {cuisines.join(", ")}
      </h4>
      <h4 className="pl-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {avgRating} ⭐
      </h4>
      <h4 className="pl-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {costForTwo}
      </h4>
      <h4 className="pl-2 pb-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {deliveryTime} minutes
      </h4>
    </div>
  );
};

export default RestaurantCard;
