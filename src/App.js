import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";

function App() {
  return (
    <main>
      <section>
        <Router>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/about">
              <div> About Hello World!</div>
            </Route>
          </Switch>
        </Router>
      </section>
    </main>
  );
}

export default App;
