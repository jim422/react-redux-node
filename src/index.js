import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import './config.js'
import './index.css'
import reducers from './reducer.js'
import Login from './container/login/login.js'
import Register from './container/register/register.js'
import AuthRoute from './component/authroute/authroute.js'
import BossInfo from './container/bossinfo/bossinfo.js'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard.js'
import Chat from './component/chat/chat'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
              <AuthRoute/>

              <Switch>
                <Route path='/bossinfo' component={BossInfo}/>
                <Route path='/geniusinfo' component={GeniusInfo}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/chat/:user' component={Chat}/>
                <Route component={Dashboard}/>
              </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)