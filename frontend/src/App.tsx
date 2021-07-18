import { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import API from "./api";
import PlayerContext from "./store/PlayerContext";
import GuardedRoute from "./components/GuardedRoute";
import Login from "./views/Login";
import Lobby from "./views/Lobby";
import Match from "./views/Match";

function App() {
  const playerContext = useContext(PlayerContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.checkAuth()
      .then((response) => {
        if (response.status === 200) {
          playerContext.loginPlayer(response.data.name);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          playerContext.logoutPlayer();          
          setLoading(false);
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return loading ? null : (
    <Switch>
      <GuardedRoute authenticated={playerContext.authenticated} exact path="/">
        <Lobby />
      </GuardedRoute>
      <GuardedRoute
        authenticated={playerContext.authenticated}
        path="/match/:id"
      >
        <Match />
      </GuardedRoute>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
