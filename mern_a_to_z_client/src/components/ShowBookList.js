import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

class ShowBookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:8082/api/books')
            .then(res => {
                this.setState({
                    books: res.data
                })
            })
            .catch(err => {
                console.log('Error from ShowBookList');
            })
    };


    render() {
        const books = this.state.books;
        let bookList;

        if (books !== []) {
            bookList = "there is no book record!";
        } else {
            bookList = books.map((book, k) =>
                <BookCard book={book} key={k} />
            );
        }
        const loggedIn = getCookie("loggedIn");
        const id = "/user/" + getCookie("user");
        return (
            <div className="ShowBookList">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <br />
                            <h2 className="display-4 text-center">Books List</h2>
                        </div>
                        <div className="col-md-8">
                            <Link to="/create-book" className="btn btn-outline-warning float-right">
                                + Add New Book
                            </Link>
                            <br />
                            <br />
                            <hr />
                        </div>
                        {loggedIn === "true" ? (

                            <div className="col-md-1">
                                <Link to={id} className="btn btn-outline-warning float-right">
                                    User
                                </Link>
                                <br />
                                <br />
                                <hr />
                            </div>
                        ) : (
                            <div className="col-md-2">
                                <div className="col-md-6 float-left">
                                    <Link to="/register" className="btn btn-outline-warning float-right">
                                        Register
                                    </Link>
                                    <br />
                                    <br />
                                    <hr />
                                </div>
                                <div className="col-md-6 float-left">
                                    <Link to="/login" className="btn btn-outline-warning float-right">
                                        Login
                                    </Link>
                                    <br />
                                    <br />
                                    <hr />
                                </div>
                            </div>)
                        }
                    </div>
                    <div className="list">
                        {bookList}
                    </div>
                </div >
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
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default ShowBookList;