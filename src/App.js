import React, {useEffect, Suspense} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Spinner from './components/UI/Spinner/Spinner';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';


const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
})

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
})

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
})

const App = (props) => {
  const { onTryAutoSignup } = props;
  
  useEffect(() => {
    onTryAutoSignup();  
  }, [onTryAutoSignup])

    let routes = (             
      <Switch>
       <Route path="/auth" render={(props) => <Auth {...props} />} />  
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
    );

    if (props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" render={(props) => <Checkout {...props} />} />  
          <Route path="/orders" render={(props) => <Orders {...props} />} />  
          <Route path="/logout" component={Logout} />  
          <Route path="/auth" render={(props) => <Auth {...props} />} />  
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
      </Switch>
      )
    }
    return (
        <BrowserRouter>
          <div>
            <Layout>
              <Suspense fallback={<Spinner />}>{routes}</Suspense>
              
            </Layout>
          </div>
        </BrowserRouter>
    );
  
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
