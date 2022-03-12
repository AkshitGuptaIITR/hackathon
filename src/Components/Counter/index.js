import { useRef, useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button } from "../ExportStyles";

const Counterdiv = styled.div`
  display: flex;
  gap: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
`;

const Counterbutton = styled(Button)`
  padding: 5px 15px;
  color: white;
  opacity: 0.8;
`;

const Counter = ({ data, order }) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  //   const placeorderdata = {...data,count}
  useEffect(() => {
      if (order && count>0) {
        dispatch({ type: "placeOrder", data: { ...data, count } });
      }
  }, [order]);

  return (
    <Counterdiv className="counter">
      <Counterbutton
        bg="#FE724D"
        onClick={() =>
          setCount((prev) => {
            if (count == 0) {
              return 0;
            } else {
              return prev - 1;
            }
          })
        }
      >
        -
      </Counterbutton>
      <Counterbutton bg="#FE724D">{count}</Counterbutton>
      <Counterbutton bg="#FE724D" onClick={() => setCount((prev) => prev + 1)}>
        +
      </Counterbutton>
      {/* {(order && count>0)? dispatch({type:'placeOrder',data:{...data,count}}):''} */}
    </Counterdiv>
  );
};

export default Counter;
