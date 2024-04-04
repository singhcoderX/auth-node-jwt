import { useState } from "react";

type Props = {};

const Counter = (props: Props) => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Counter {counter}
      </button>
    </div>
  );
};

export default Counter;
