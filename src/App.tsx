import React from 'react';
import PrequalifyForm from './components/PrequalifyForm/PrequalifyForm';
import PrequalifyResult from './components/PrequalifyResult/PrequalifyResult';
import LoginUserForm from './components/LoginUserForm/LoginUserForm';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';

function App() {
return (
    <Router>
      <div>
        <Route exact path="/">
          <PrequalifyForm />
        </Route>
        <PrivateRoute path="/prequalifyResult">
          <PrequalifyResult />
        </PrivateRoute>
        <Route path="/logginUser">
          <LoginUserForm />
        </Route>
      </div>
    </Router>
  );
}

// Requirements
// It checks if the user has submited a prequalify form, if they are,
// it renders the "children" prop that includes the component. If not, it redirects
// the user to "/" prequalifyForm".
function PrivateRoute({ children, ...rest }: any) {
  const { status } = useSelector((state: RootState) => state.prequalify);
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !status ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}

export default App;
