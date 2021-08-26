import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import CommentCard from './CommentCard';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            comments: [],
            author: '',
            targetUser: '',
            title: '',
            description: ''
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8082/api/users/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    user: res.data
                });
            })
            .catch(err => {
                console.log("Error from ShowUserDetails");
            });
        console.log(this.props);
        axios
            .get('http://localhost:8082/api/comments/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    comments: res.data
                });
            })
            .catch(err => {
                console.log("Error from ShowCommentDetails");
            });
    };
    onSubmit = e => {
        e.preventDefault();

        const data = {
            author: getCookie("user"),
            targetUser: this.state.user._id,
            title: this.state.title,
            description: this.state.description
        };
        axios
            .post('http://localhost:8082/api/comments', data)
            .then(res => {
                this.setState({
                    comments: []
                })
                this.props.history.push(this.state.user._id);
                window.location.assign(window.location.href);
            })
            .catch(err => {
                console.log("Error in Register!");
            })
    };

    onDeleteClick(id) {
        axios
            .delete('http://localhost:8082/api/users/' + id)
            .then(res => {
                this.props.history.push("/");
            })
            .catch(err => {
                console.log("Error form ShowUsersDetails_deleteClick");
            })
        document.cookie = "loggedIn=false; path=/";
        document.cookie = "user=; path=/";
        window.location.assign("/")
    };
    onLoggoutClick() {
        document.cookie = "loggedIn=false; path=/";
        document.cookie = "user=; path=/";
        window.location.assign("/")
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };


    render() {
        const comments = this.state.comments;
        let commentList;

        if (!comments) {
            commentList = "there is no comment record!";
        } else {
            commentList = comments.map((comment, k) =>
                <CommentCard comment={comment} key={k} />
            );
        }

        const user = this.state.user;
        const loggedInUserID = getCookie("user");
        const loggedIn = getCookie("loggedIn");
        return (
            <div className="User">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 m-auto">
                            <br /> <br />
                            <Link to="/users" className="btn btn-outline-warning float-left">
                                Show User List
                            </Link>
                        </div>
                        <br />
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">{user.username}</h1>
                            <hr /> <br />
                        </div>
                    </div>
                    {loggedIn === "true" ? (
                        <div>
                            <h1>Comment:</h1>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Title'
                                        name='title'
                                        className='form-control'
                                        value={this.state.title}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <br />

                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Description'
                                        name='description'
                                        className='form-control'
                                        value={this.state.description}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    className="btn btn-outline-warning btn-block mt-4"
                                />
                            </form>
                        </div>) : (
                        <div>
                        </div>)}
                    {user._id === loggedInUserID ? (
                        <div>
                            <div className="row">
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this, user._id)}>Delete User</button><br />
                                </div>
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onLoggoutClick}
                                    >Logg out User</button><br />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )
                    }

                    <div className="list">
                        {commentList}
                    </div>
                </div>
            </div >
        );
    }
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default User;