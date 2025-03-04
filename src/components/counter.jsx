import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { increment, decrement } from "../features/counter/counterSlice";
import { useGetCounterValueQuery } from "../features/counter/counterApi";

const Counter = () => {
  const { data: counterValue, isLoading, isFetching, isError, refetch } =
    useGetCounterValueQuery();
  
    useEffect(() => {
      console.log('isLoading', isLoading)
    }, [isLoading])

  if (isFetching) return <p>Loading...</p>;
  if (isError) return <p>Error loading counter</p>;

  return (
    <div>
      <h1>Counter: {counterValue .length}</h1>
      <button onClick={() => refetch()}>Reload</button>
    </div>
  );
};
export default Counter;
