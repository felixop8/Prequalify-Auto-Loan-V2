import React from 'react';
import Prequalify from './components/Prequalify/Prequalify';
import CreateAccount from './components/CreateAccount/CreateAccount';
import Disqualified from './components/Disqualified/Disqualified'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';

function App() {
return (
    <Router>
      <div>
        <Route exact path="/">
          <Prequalify />
        </Route>
        <PrivateRoute path="/account">
          <CreateAccount />
        </PrivateRoute>
        <Route path="/disqualified">
          <Disqualified />
        </Route>
      </div>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }: any) {
  const { prequalify_status } = useSelector((state: RootState) => state.prequalify);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        Object.is(prequalify_status, 1) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
