import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            username: this.state.username,
            password: this.state.password
        };

        axios
            .get('http://localhost:8082/api/users')
            .then(res => {
                let theData = res.data;
                for (let i = 0; i < theData.length; i++) {
                    if (theData[i].password === data.password) {
                        console.log("password match");
                        document.cookie = "loggedIn=true; path=/";
                        document.cookie = "user=" + theData[i]._id + "; path=/";
                        window.location.assign("/");
                    }
                }
            })
            .catch(err => {
                console.log("Error from User");
            })
    };

    render() {
        return (
            <div className="Login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br />
                            <Link to="/" className="btn btn-outline-warning float-left">
                                Show Book List
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add Book</h1>
                            <p className="lead text-center">
                                Register user
                            </p>

                            <form noValidate onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Username'
                                        name='username'
                                        className='form-control'
                                        value={this.state.username}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <br />

                                <div className='form-group'>
                                    <input
                                        type='password'
                                        placeholder='Password'
                                        name='password'
                                        className='form-control'
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    className="btn btn-outline-warning btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;