import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import PublicRoute from "./components/Utils/PublicRoute";
import PrivateRoute from "./components/Utils/PrivateRoute";
import ViewOrders from "./components/orderDetails/viewOrder";
import PlaceOrder from "./components/orderDetails/placeOrder";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { Provider } from "react-redux";
import store from "./components/store";


function App() {
  const client = new ApolloClient({
    uri: "http://localhost:5211/graphql",
  });

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <PublicRoute exact path="/" component={Login} />
            <PrivateRoute
              exact
              path="/vieworders"
              component={ViewOrders}
            />
            <PrivateRoute exact path="/placeorder" component={PlaceOrder} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
