import Footer from "../../Components/Footer";
import styled from "styled-components";
import { Button, Text, Wrapper } from "../../Components/ExportStyles";
import Header from "../../Components/Header";
import bgimg from "../../Images/bgimg.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AxiosGet, AxiosPost, URL } from "../../Components/Apicaller";
import { useEffect, useState } from "react";

const Subdiv = styled.div`
  display: flex;
  height: 90vh;
  align-items: center;
  justify-content: space-between;
  // padding: 0px 5%;

  .info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: left;
  }
  .bgimg {
    width: 580px;
  }
`;

const Inputdiv = styled.div`
  display: flex;
  // border-radius: 10px;
  width: 100%;
  margin-top: 20px;
  position: relative;

  .input {
    border-radius: 5px;
    padding: 25px;
    width: 80%;
    border: none;
    font-size: 25px;
  }
  .input::placeholder {
    font-size: 25px;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    color: white;
    background: #fe724d;
    width: 20%;
    font-size: 30px;

    &:hover {
      cursor: pointer;
      transform: scale(${(props) => props.scale});
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
  }

  .dropdown {
    position: absolute;
    z-index: 3;
    top: 80px;
    background: white;
    padding: 10px 80px;
    display: flex;
    flex-direction: column;
  }
`;
const About = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 10px;
  padding: 100px 0px;
`;

const Form = styled.form`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1;
  display: flex;
  width: 600px;
  height: 650px;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
  background: white;

  .form-input {
    padding: 15px;
    font-size: 15px;
    width: 60%;
  }
  .form-input-error {
    padding: 15px;
    font-size: 15px;
    width: 65%;
    border: 1px red solid;
  }

  .closeButton {
    position: absolute;
    zindex: 2;
    top: 20px;
    left: 25px;
    padding: 10px;

    :hover {
      background: #a0a0a0;
      padding: 10px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
`;

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [college, findCollege] = useState("");
  const [collegeList, setCollegeList] = useState({});

  useEffect(() => {
    async function collegeapi() {
      const response = await AxiosGet(
        "https://grub-it.herokuapp.com/api/v1/college/name"
      );
      if (response.data.status == "success") {
        console.log(response?.data?.data.college);
        dispatch({ type: "collegelist", data: response?.data?.data.college });
      }
    }
    collegeapi();
  }, []);

  const colleges = useSelector((state) => state?.collegeList);
  const collegeName = colleges?.map((item, key) => {
    return item.name;
  });

  const college_id = colleges?.[collegeName.indexOf(college)]?._id;

  const handleSubmitCollege = async () => {
    const response = await AxiosGet(
      `https://grub-it.herokuapp.com/api/v1/canteen/${college_id}`
    );
    if (response.data.status == "success") {
      console.log(response.data.data.canteen, "SUBMIT COLLEGE ID");
      dispatch({ type: "canteenData", data: response?.data?.data.canteen });
      navigate("/canteenlist");
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        {/* <LoginCard loginClicked={loginClicked} signUpClicked={signUpClicked} toggleLogin={toggleLogin} toggleSignup={toggleSignup}/> */}
        <Subdiv>
          <div className="info">
            <Text size="50px" weight="700">
              LOVE YOUR HUNGER
            </Text>
            <Text size="25px" weight="100">
              Wanna eat? Grab your grub from your favourite canteen.
            </Text>
            <Inputdiv>
              <input
                placeholder="Search College"
                className="input"
                onChange={(e) => findCollege(e.target.value)}
                value={college}
              />
              {college ? (
                <div className="dropdown">
                  <Text
                    size="20px"
                    weight="200"
                    onClick={(e) => findCollege(e.target.innerHTML)}
                  >
                    {collegeName.find((item) => {
                      return Object.values(item)
                        .join("")
                        .toLowerCase()
                        .includes(college.toLowerCase());
                    })}
                  </Text>
                </div>
              ) : (
                ""
              )}
              <div className="button" onClick={handleSubmitCollege}>
                Go
              </div>
              {/* <Button>GO</Button> */}
            </Inputdiv>
          </div>
          <img className="bgimg" src={bgimg} />
        </Subdiv>
        <About>
          <Text color="#FE724D" size="30px" weight="600">
            ABOUT
          </Text>
          <Text color="black" size="25px">
            Now the food walks to you
          </Text>
        </About>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Homepage;
