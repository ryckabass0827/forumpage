import React, { useState, useContext, useEffect } from "react";
import Moment from "react-moment";
import AnswerList from "../answers/AnswerList";
import AuthContext from "../../context/AuthContext";
import EditQuestion from "./EditQuestion";



function Question({ question, onUpdateQuestion, onDeleteAnswer, onUpdateAnswer, onDeleteQuestion }) {
    const { isAuthenticated, userId } = useContext(AuthContext);
    const [likes, setLikes] = useState(question.likes);
    const [dislikes, setDislikes] = useState(question.dislikes);
    const [reacted, setReacted] = useState(false);
    const [authorUsername, setAuthorUsername] = useState(null);
    const [isEditing, setIsEditing] = useState(false);


    const { title, description, createdAt, authorId } = question;

    useEffect(() => {
        fetch('http://localhost:4000/users')
            .then(res => res.json())
            .then(data => {
                const author = data.find(user => user.id === authorId);
                if (author) {
                    setAuthorUsername(author.username);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [authorId]);




    const handleLike = () => {
        if (isAuthenticated && !reacted) {
            fetch(`http://localhost:4000/questions/${question.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ likes: likes + 1 })
            })
                .then(res => res.json())
                .then(data => {
                    setLikes(data.likes);
                    setReacted(true);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleDislike = () => {
        if (isAuthenticated && !reacted) {
            fetch(`http://localhost:4000/questions/${question.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dislikes: dislikes + 1 })
            })
                .then(res => res.json())
                .then(data => {
                    setDislikes(data.dislikes);
                    setReacted(true);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleAddAnswer = (answer) => {
        const updatedQuestion = { ...question, answers: [...question.answers, answer] };
        onUpdateQuestion(updatedQuestion);
    };


    const handleUpdate = (updatedQuestion) => {
        fetch(`http://localhost:4000/questions/${question.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedQuestion),
        })
            .then(res => res.json())
            .then(data => {
                onUpdateQuestion(data);
                setIsEditing(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="question">
            <h3>{title}</h3>
            <p>{description}</p>
            <p>
                Created by {authorUsername} on{" "}
                <Moment format="YYYY-MM-DD">{createdAt}</Moment>
            </p>
            {isAuthenticated && authorId === userId && (
                <div>
                    {userId === question.authorId && (
                        <button onClick={() => onDeleteQuestion(question.id)}>Delete</button>
                    )}
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    {isEditing && (
                        <EditQuestion question={question} onUpdateQuestion={onUpdateQuestion} />
                    )}
                </div>
            )}
            <p>
                <button onClick={handleLike}>Like</button> {likes} |{" "}
                <button onClick={handleDislike}>Dislike</button> {dislikes}
            </p>
            <AnswerList
                answers={question.answers}
                handleAddAnswer={handleAddAnswer}
                question={question}
                onUpdateQuestion={onUpdateQuestion}
                onDeleteAnswer={onDeleteAnswer}
                onAddAnswer={handleAddAnswer}
                onUpdateAnswer={onUpdateAnswer}
            />

        </div>
    );
}

export default Question;