import React, { useState, useContext } from "react";
import Moment from "react-moment";
import AuthContext from '../context/AuthContext';

function Answer({ answer }) {
    const { isAuthenticated } = useContext(AuthContext);
    const [likes, setLikes] = useState(answer.likes);
    const [dislikes, setDislikes] = useState(answer.dislikes);
    const { text, authorId, createdAt } = answer;

    const handleLike = () => {
        if (!isAuthenticated) {
            fetch(`http://localhost:4000/questions/${answer.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ likes: likes + 1 })
            })
                .then(res => res.json())
                .then(data => {
                    setLikes(data.likes);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleDislike = () => {
        if (!isAuthenticated) {
            fetch(`http://localhost:4000/questions/${answer.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dislikes: dislikes + 1 })
            })
                .then(res => res.json())
                .then(data => {
                    setDislikes(data.dislikes);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    if (!isAuthenticated) {
        return <p>Please log in to post an answer.</p>;
    }

    return (
        <div className="answer">
            <p>{text}</p>
            <p>
                Created by user {authorId} on{" "}
                <Moment format="YYYY-MM-DD">{createdAt}</Moment>
            </p>
            <p>
                <button onClick={handleLike}>Like</button> {likes} |{" "}
                <button onClick={handleDislike}>Dislike</button> {dislikes}
            </p>
        </div>
    );
}

export default Answer;