import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IntercomProvider, useIntercom } from "react-use-intercom";
import axios from "axios";
import Intercom from "intercom-react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

const INTERCOM_APP_ID = "bci035u3";

const HomePage = () => {
  const { boot, shutdown, hide, show, update } = useIntercom();

  return <button onClick={boot}>Boot intercom! ☎️</button>;
};

function App() {
  const [user, setUser] = useState(null);

   // Empty dependency array ensures that this effect runs only once on mount

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <IntercomProvider appId={INTERCOM_APP_ID}>
        <HomePage />
      </IntercomProvider>
    </div>
  );
}

export default App;
