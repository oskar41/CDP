import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { increment, decrement } from "../features/counter/counterSlice";
import { fetchCounterValue } from "../features/counter/counterActions";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const status = useSelector((state) => state.counter.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCounterValue()); // Отримуємо значення при завантаженні компонента
  }, [dispatch]);

  return (
    <div>
      <h1>Counter: {status === "loading" ? "Loading..." : count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(fetchCounterValue())}>Fetch Random</button>
    </div>
  );
};

export default Counter;
