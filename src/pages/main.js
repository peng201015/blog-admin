import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import login from './login';
import adminLayout from './layout';

function Main() {
    return(
        <Router>
            <Route path="/login" component={login}></Route>
            <Route path="/index" component={adminLayout}></Route>
        </Router>
    )
}

export default Main;