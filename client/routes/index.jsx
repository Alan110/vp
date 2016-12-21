import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { createAction } from 'redux-actions';

import { Global } from '../config/global';
import { getInitialUserStatus, getInitialLogin } from '../services/resource.js';
import App from '../modules/app/index.jsx';
import ErrorPage from '../modules/errorPage';
import Hello from '../modules/hello';
import Support from '../modules/support';
import Auth from '../modules/auth';
import Color from '../modules/color';



const Routes = ({ history, store }) => {

  const initAuth = (nextState, replace, callback) => {
    getInitialLogin().then((res) => {
      const ac = createAction('auth/init');
      store.dispatch(ac(res));
      callback();
    }, (res2) => {
      replace('/auth');
    }).then(()=>{
      callback();
    });
  };
  const checkAuth = (nextState, replace, callback) => {

    if(Global.isDev){
      callback();
    }else{
      getInitialUserStatus().then((res) => {
        if(!res.isAuth){
          replace('/auth');
        }else {
          const ac = createAction('auth/loadUser');
          store.dispatch(ac(res));
        }
      }, (res2) => {
        replace('/auth');
      }).then(()=>{
        callback();
      });
    }
  };

  return <Router history={history} >
    <Route path="/auth"
           component={Auth}
           onEnter={initAuth}
      />
    <Route path="/"
           component={App}
           onEnter={checkAuth}>
      <IndexRoute component={Hello}/>
      <Route path="support" component={Support} />
      <Route path="color" component={Color} />
      <Route path="*" component={ErrorPage} />
    </Route>
  </Router>;
};


Routes.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default Routes;