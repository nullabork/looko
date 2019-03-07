import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Dashboard } from '@Containers/Dashboard';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import IDashboardProps from '@Containers/Dashboard/IDashboardProps';
ReactDOM.render(

    <Router basename={'/'}>
        <div>
            <Route exact path="/dashboard/:workspace" component={(props :any) => <Dashboard workspace={props.match.params.workspace} {...props}/>} />
            <Route exact path="/dashboard" component={(props :any) => <Dashboard {...props}/> } />
        </div>
    </Router>,

document.getElementById('root'));