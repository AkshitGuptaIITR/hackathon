import styled from "styled-components";
import bg from "../Images/bg.svg";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background: #d7d7d7;
  padding: 20px 5%;
  background-image: url(${bg});
  // height: 100vh;

  // .BgImg {
  //   position: absolute;
  //   z-index: -1;
  //   width: 100vw;
  //   height: 100vh;
  //   object-fit: cover;
  //   filter: blur(2px);
  // }
`;

export const Button = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  color: ${(props) => props.color};
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 0.15rem;
  transition: all 0.3s;
  background: ${(props) => props.bg};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  text-align: center;
  border: none;

  &:hover {
    cursor: pointer;
    transform: scale(${(props) => props.scale});
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const Text = styled.p`
  margin: 0px;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  font-family: ${(props) => props.family};
  color: ${(props) => props.color};
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
