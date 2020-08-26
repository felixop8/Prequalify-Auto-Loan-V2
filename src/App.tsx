import React from 'react';
import AutoLoanForm from './components/AutoLoanForm/AutoLoanForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import DisqualificationPage from './components/DisqualificationPage/DisqualificationPage'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

function App() {
return (
    <Router>
      <div>
        <Route exact path="/">
          <AutoLoanForm />
        </Route>
        <PrivateRoute path="/registration">
          <RegistrationForm />
        </PrivateRoute>
        <Route path="/disqualification">
          <DisqualificationPage />
        </Route>
      </div>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }: any) {
  const { prequalification_status } = useSelector((state: any) => state.applicationState);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        Object.is(prequalification_status, 1) ? (
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
