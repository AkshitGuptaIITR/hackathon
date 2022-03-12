import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Wrapper, Text, Button } from "../../Components/ExportStyles";
import Card from "../../Components/FoodCard";
import Header from "../../Components/Header";
import Menucard from "../../Components/Menucard";
import { Toppickdiv } from "../Canteenlist";

const Menu = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;

  .categories {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: left;
    margin-right: 200px;

    p {
      :hover {
        cursor: pointer;
        color: #fe724d;
      }
    }
  }

  .foodlist {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 40px;
    row-gap: 20px;
  }
`;

const Placeorderdiv = styled.div`
  display: flex;
  width: 26%;
  justify-content: space-between;
  margin-top: 50px;
`;

const Canteenmenu = () => {
  const navigate = useNavigate();
  const selectedCanteen = useSelector((state) => state.selectedCanteen);
  const placedOrders = useSelector((state) => state.placeOrder);
  const categories = ["Patties", "Rolls", "Parathas"];
  const [placeOrder, setPlaceOrder] = useState(false);
  const collegeName = selectedCanteen?.canteen?.college?.name;
  // console.log(selectedCanteen.menu.rolls, "MENU");
  useEffect(()=>{
    if(placedOrders.length>0){
      navigate('/placeorder')
    }
  },[placedOrders])

  function PlaceOrder() {
    console.log("INSIDE PLACEORDER");
    setPlaceOrder(true);
  }

  return (
    <>
      <Header college={collegeName} />
      <Wrapper>
        <Text
          size="36px"
          weight="500"
          style={{ marginTop: "40px", textAlign: "left" }}
        >
          {selectedCanteen.canteen.name.toUpperCase()}
        </Text>
        <Toppickdiv>
          <div className="toppick-header">
            <Text size="24px" weight="500">
              Top picks
            </Text>
          </div>
          <div className="img-div">
            {selectedCanteen.menu.rolls.map((item, key) => {
              return <Card key={key} data={item} order={placeOrder} />;
            })}
          </div>
        </Toppickdiv>
        <Toppickdiv>
          <div className="toppick-header">
            <Text size="24px" weight="500">
              Recommendations
            </Text>
          </div>
          <div className="img-div">
            {selectedCanteen.menu.burger.map((item, key) => {
              return <Card key={key} data={item} order={placeOrder} />;
            })}
          </div>
        </Toppickdiv>

        <Text
          size="30px"
          weight="600"
          style={{ marginTop: "50px", textAlign: "left" }}
        >
          MENU
        </Text>
        <Menu>
          <div className="categories">
            <Text size="22px" style={{ textDecoration: "underline" }}>
              {" "}
              Categories
            </Text>
            {categories.map((item, key) => {
              return <Text size="20px">{item}</Text>;
            })}
          </div>
          <div className="foodlist">
            {selectedCanteen.menu.rolls.map((item, key) => {
              return <Menucard key={key} data={item} order={placeOrder} />;
            })}
          </div>
        </Menu>
        <Placeorderdiv>
          <Button onClick={() => PlaceOrder()} bg="#FE724D">
            {" "}
            PROCEED
          </Button>
          <Button> GO BACK</Button>
        </Placeorderdiv>
      </Wrapper>
    </>
  );
};

export default Canteenmenu;
