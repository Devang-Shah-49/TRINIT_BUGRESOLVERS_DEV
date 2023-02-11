import "./App.css";
import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import { appContext } from "./context";
import { BubbleChart } from "./components/BubbleChart";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const context = { user, setUser, token, setToken };
  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("appUser")))
  //   setToken(localStorage.getItem("appToken"))
  //   // setAccount(JSON.parse(localStorage.getItem("kpupAccount")))
  // }, [])
  return (
    <div className="App">
      <appContext.Provider value={context}>
        <Router>
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/" element={<BubbleChart />} />
            <Route path="*" element={<Navigate replace to="/home" />} />
          </Routes>
        </Router>
      </appContext.Provider>
    </div>
  );
}

export default App;
