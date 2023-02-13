import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";

function Answer({ answer, question, onUpdateAnswer, onDeleteAnswer }) {
    const { isAuthenticated } = useContext(AuthContext);
    const [likes, setLikes] = useState(answer.likes);
    const [dislikes, setDislikes] = useState(answer.dislikes);
    const [reacted, setReacted] = useState(false);

    const handleLike = () => {
        if (isAuthenticated && !reacted) {
            fetch(`http://localhost:4000/questions/${question.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ likes: likes + 1 }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setLikes(data.likes);
                    setReacted(true);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleDislike = () => {
        if (isAuthenticated && !reacted) {
            fetch(`http://localhost:4000/questions/${question.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dislikes: dislikes + 1 }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setDislikes(data.dislikes);
                    setReacted(true);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };



    return (
        <div className="answer">
            <p>{answer.text}</p>
            <p>
                Posted by {answer.authorId} on {new Date(answer.createdAt).toLocaleString()}
            </p>
            <p>
                <button onClick={handleLike}>Like</button> {likes} |{" "}
                <button onClick={handleDislike}>Dislike</button> {dislikes}
            </p>
            {isAuthenticated && (
                <div>
                    <button onClick={() => onUpdateAnswer(answer.id)}>Edit</button>
                    <button onClick={() => onDeleteAnswer(answer.id)}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default Answer;
