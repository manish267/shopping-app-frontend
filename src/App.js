import React, { useContext } from 'react';
import ProductList from './Components/products/ProductList';
import './App.css'
import { Route, Switch,Redirect } from 'react-router-dom';
import Layout from './Components/layout/Layout';
import Home from './Components/pages/Home';


// pages
import New from './Components/pages/New';
import Show from './Components/pages/Show';
import Edit from './Components/pages/Edit';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import UserContext from './store/user-context';
import Cart from './Components/pages/Cart';

const App=()=>{
  const currentUser=useContext(UserContext);
  console.log(currentUser)

  const {isLoggedIn} =currentUser;

    return (
      <Layout>
        <Switch>
              <Route exact path="/" component={Home}/>
              
              <Route exact path="/allproducts" component={ProductList}/>
              <Route exact path="/products/:id" component={Show} />

              
              <Route exact path="/new"  render={()=>{
                return isLoggedIn === false ? <Redirect to="/login" /> : <New/>
              }}/>
              <Route exact path="/products/:id/edit" component={Edit} />
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={SignUp}/>
              <Route exact path="/cart" component={Cart}/>


            </Switch>
      </Layout>
    )
  }


export default App;
