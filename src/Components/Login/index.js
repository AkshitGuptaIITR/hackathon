import styled from "styled-components";
import { Button, Text, Wrapper } from "../../Components/ExportStyles";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { get } from "loadsh";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { notification } from "antd";
import { AxiosGet, AxiosPost, URL } from "../../Components/Apicaller";
import { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";

const Form = styled.form`
  position: absolute;
  top: 110px;
  right: 10px;
  z-index: 5;
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

const LoginCard = ({toggleLogin,toggleSignup,loginClicked,signUpClicked,show}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies();
//   const [loginClicked, toggleLogin] = useState(false);
//   const [signUpClicked, toggleSignup] = useState(false);

  const handleValidate = (value) => {
    const errors = {};
    if (!value.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email)) {
      errors.email = "Invalid email address";
    }
    if (!value.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const handleValidate1 = (value) => {
    const errors = {};
    if (!value.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email)) {
      errors.email = "Invalid email address";
    }
    if (!value.password) {
      errors.password = "Required";
    } else if (value.password != value.confirmPassword) {
      errors.confirmPassword = "Please enter the same password";
    } else if (!value.confirmPassword) {
      errors.confirmPassword = "Required";
    }
    if (!value.contact) {
      errors.contact = "Required";
    } else if (value.contact.length != 10) {
      errors.contact = "Please enter correct contact number";
    }
    return errors;
  };

  console.log(cookie.token)

  const handleOnSubmit = async (values) => {
    console.log("HANDLE SUBMIT");
    if (values.name) {
      setLoading(true);
      const data = {
        ...values,
        college: "622bd54dbf985e0ddb37462b",
        contact: parseInt(values.contact),
      };
      try {
        console.log("SIGNUP");
        dispatch({ type: "signup", data: values });
        const response = await AxiosPost(
          "https://grub-it.herokuapp.com/api/v1/user/signup",
          data
        );
        if (response.status == "success") {
          setLoading(false);
          notification.success({
            message: "Successfully Signed up!",
          });
          navigate("/home");
        }
      } catch (err) {
        setLoading(false);
        notification.error({
          message: get(err, "response.data.message", "Error"),
        });
      }
    } else {
      console.log("LOGIN");
      setLoading(true);
      try {
        // const user = await api.post("/api/v1/user/login", values);
        // if (cookie.session) {
        //   removeCookie("session");
        // }
        // setCookie(
        //   "session",
        //   { token: get(user, "data.token"), path: "/home" },
        //   {
        //     maxAge: 24 * 60 * 60,
        //   }
        // );
        // dispach(setAuth({ user: get(user, "data.data.user") }));
        const response = await AxiosPost(
          "https://grub-it.herokuapp.com/api/v1/user/login",
          values
        );
        if (response.data.status == "success") {
          if(cookie.token){
            removeCookie('token');
          }
          console.log(response.data.data.token)
          setCookie('token', response.data.data.token)
          setLoading(false);
          dispatch({ type: "login", data: response?.data?.data?.user });
          notification.success({
            message: "Successfully Logged In!",
          });
          navigate("/");
        }
      } catch (err) {
        setLoading(false);
        notification.error({
          message: get(err, "response.data.message", "Error"),
        });
      }
    }
  };

  return (
    <>
      {loginClicked ? (
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={handleValidate}
          onSubmit={handleOnSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form>
              <CloseOutlined
                className="closeButton"
                onClick={() =>
                  toggleLogin((prevState) => {
                    return !prevState;
                  })
                }
              />
              <Text
                color="#FE724D"
                size="40px"
                weight="600"
                style={{ marginBottom: "20px" }}
              >
                LOGIN
              </Text>
              <input
                name="email"
                placeholder="Enter Email"
                type="email"
                className={
                  errors.email && touched.email
                    ? "form-input-error"
                    : "form-input"
                }
                value={values.email}
                onChange={handleChange}
              />
              <input
                name="password"
                placeholder="Enter Password"
                type="password"
                value={values.password}
                className={
                  errors.password && touched.password
                    ? "form-input-error"
                    : "form-input"
                }
                onChange={handleChange}
              />
              <Button
                style={{ width: "65%", marginTop: "20px" }}
                type={"submit"}
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        ""
      )}
      {signUpClicked ? (
        <Formik
          initialValues={{
            email: "",
            password: "",
            contact: "",
            confirmPassword: "",
            name: "",
          }}
          validate={handleValidate1}
          onSubmit={handleOnSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form>
              <CloseOutlined
                className="closeButton"
                onClick={() =>
                  toggleSignup((prevState) => {
                    return !prevState;
                  })
                }
              />
              <Text
                color="#FE724D"
                size="40px"
                weight="600"
                style={{ marginBottom: "20px" }}
              >
                SIGN UP
              </Text>
              <input
                name="name"
                className="form-input"
                placeholder="Your Name"
                value={values.name}
                onChange={handleChange}
              />
              <input
                name="contact"
                className={
                  errors.contact && touched.contact
                    ? "form-input-error"
                    : "form-input"
                }
                placeholder="Contact"
                value={values.contact}
                onChange={handleChange}
              />
              <input
                name="email"
                placeholder="Enter Email"
                type="email"
                className={
                  errors.email && touched.email
                    ? "form-input-error"
                    : "form-input"
                }
                value={values.email}
                onChange={handleChange}
              />
              <input
                style={{ marginTop: "18px" }}
                name="password"
                placeholder="Enter Password"
                type="password"
                value={values.password}
                className={
                  errors.password && touched.password
                    ? "form-input-error"
                    : "form-input"
                }
                onChange={handleChange}
              />
              <input
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                value={values.confirmPassword}
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? "form-input-error"
                    : "form-input"
                }
                onChange={handleChange}
              />
              <Button
                style={{ width: "65%", marginTop: "20px" }}
                type={"submit"}
                onClick={handleSubmit}
                loading={loading}
              >
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        ""
      )}
    </>
  );
};

export default LoginCard;
