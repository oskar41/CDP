import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../features/counter/counterSlice";
import Counter from "../components/counter";

const HomePage = () => {
  const count = useSelector((state) => state.counter.value);
  return (
    <div>
      <h1>RTK query {count}</h1>
      <Counter />
    </div>
  );
};

export default HomePage;
