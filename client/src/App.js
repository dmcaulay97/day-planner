import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Calendar from './components/Calendar';
import About from './components/About';
import Success from './pages/Success';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path='/' exact component={SignIn}/>
          <Route path='/SignUp' exact component={SignUp}/>
          <ProtectedRoute path='/Calendar' exact component={Calendar}/>
          <ProtectedRoute path='/About' exact component={About}/>
          <ProtectedRoute exact path="/success" component={Success} />
          <ProtectedRoute exact path="/Profile" component={Profile} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}



export default App;
