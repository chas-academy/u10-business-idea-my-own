import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import UserCard from './UserCard';

class showUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:8082/api/users')
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(err => {
                console.log('Error from ShowUserList');
            })
    };


    render() {
        const users = this.state.users;
        let userList;

        if (!users) {
            userList = "there is no user record!";
        } else {
            userList = users.map((user, k) =>
                <UserCard user={user} key={k} />
            );
        }

        return (
            <div className="ShowUsers">
                <div className="container">
                    <div className="row">

                        <div className="col-md-12">
                            <br />
                            <h2 className="display-4 text-center">User List</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10 m-auto">
                            <br /> <br />
                            <Link to="/" className="btn btn-outline-warning float-left">
                                Show Book List
                            </Link>
                        </div>
                        <br />
                    </div>
                    <div className="list">
                        {userList}
                    </div>

                </div>
            </div>
        );
    }
}

export default showUsers;