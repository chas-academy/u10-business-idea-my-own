import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import CreateBook from './components/CreateBook';
import ShowBookList from './components/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails';
import UpdateBookInfo from './components/UpdateBookInfo';
import Register from './components/Register';
import Login from './components/Login';
import User from './components/User';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' component={ShowBookList} />
                    <Route path='/create-book' component={CreateBook} />
                    <Route path='/edit-book/:id' component={UpdateBookInfo} />
                    <Route path='/show-book/:id' component={ShowBookDetails} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Route path='/user/:id' component={User} />
                </div>
            </Router>
        );
    }
}

export default App;