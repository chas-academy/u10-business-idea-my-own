import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const CommentCard = (props) => {
    const comment = props.comment;

    return (
        <div className="card-container">
            <div className="desc">
                <h2>
                    <Link to={`/user/${comment.author}`}>
                        Author
                    </Link>
                </h2>
                <h3>
                    {comment.title}
                </h3>
                <p>
                    {comment.description}
                </p>
            </div>
        </div>
    )
};

export default CommentCard;