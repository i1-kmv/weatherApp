import React from 'react'
import {Route, Switch } from 'react-router-dom'
import './App.css'
import {Menu} from "./pages/Menu/Menu"
import {Time} from "./pages/Time/Time"
import {Weather} from "./pages/Weather/Weather"

// src => enum => file => route to enum

function App() {
  return (
    <div className="App">
      <h1>Welcome to WeatherApp</h1>

        <Switch>
          <Route exact path={'/'} render={() => <Menu/>}/>
          <Route path={'/time'} render={() => <Time/>}/>
          <Route path={'/weather'} render={() => <Weather/>}/>
        </Switch>
    </div>
  );
}

export default App;
