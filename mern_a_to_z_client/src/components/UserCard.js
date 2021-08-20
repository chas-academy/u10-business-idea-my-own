import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const UserCard = (props) => {
    const user = props.user;

    return (
        <div className="card-container">
            <div className="desc">
                <h2>
                    <Link to={`/user/${user._id}`}>
                        {user.username}
                    </Link>
                </h2>
            </div>
        </div>
    )
};

export default UserCard;