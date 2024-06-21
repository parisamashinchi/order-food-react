import FoodItem from "./FoodItem";
import "../index.css";
import useHttp from "./hooks/useHttp";
import Error from "./Error";
import { useEffect } from "react";

const FoodItems = () => {
  const { data: foods, isLoading, error, fetchData } = useHttp();

  useEffect(() => {
    fetchData("http://localhost:3000/meals", {});
  }, []);

  if (isLoading) {
    return <p className="center">isLoading...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch" message={error.message} />;
  }

  return (
    <ul id="meals">
      {foods?.map((food) => (
        <FoodItem food={food} key={food.id} />
      ))}
    </ul>
  );
};
export default FoodItems;
