import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Home from "./pages/Home";
import { appContext } from "./context";
import { BubbleChart } from "./components/BubbleChart";

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <appContext.Provider value={context}>
          <Router>
            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/" element={<BubbleChart />} />
              <Route path="*" element={<Navigate replace to="/home" />} />
            </Routes>
          </Router>
        </appContext.Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
