import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:8082/api/users/' + this.props.match.params.id)
            .then(res => {
                // console.log("Print-showBookDetails-API-response: " + res.data);
                this.setState({
                    user: res.data
                });
            })
            .catch(err => {
                console.log("Error from ShowUserDetails");
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


    render() {

        const user = this.state.user;
        const loggedInUserID = getCookie("user");
        return (
            <div className="User">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 m-auto">
                            <br /> <br />
                            <Link to="/" className="btn btn-outline-warning float-left">
                                Show Book List
                            </Link>
                        </div>
                        <br />
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">{user.username}</h1>
                            <hr /> <br />
                        </div>
                    </div>
                    <div>
                    </div>
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