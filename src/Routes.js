import React from 'react'
import { Switch, Route } from 'react-router-dom'

import IndexPage from './pages/IndexPage/index'
import PostPage from './pages/PostPage/index'
import Signup from './pages/Signup/index'

const Routes = () => (
    <Switch>
        <Route exact path='/' component={IndexPage} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/posts' component={PostPage} />
    </Switch>
)

export default Routes