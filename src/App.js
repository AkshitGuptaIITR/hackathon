import logo from "./logo.svg";
import "./App.css";
import Main from "./Containers/Main";
import "antd/dist/antd.css";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { AxiosGet } from "./Components/Apicaller";
import { useDispatch } from "react-redux";

function App() {
  const [cookie] = useCookies();
  const dispach = useDispatch();

  useEffect(() => {
    (async () => {
      console.log(cookie.token)
      if (cookie.token) {
        try {
          const response = await AxiosGet(
            `https://grub-it.herokuapp.com/api/v1/user/refresh`,
            cookie.token
          );
          console.log();
          dispach({ type: "login", data: response.data.data.user });
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Main />
    </div>
  );
}

export default App;
