import React, { useState } from "react";
import Moment from "react-moment";
import Answer from "./Answer";
import EditAnswer from "./EditAnswer";

function AnswerList({ answers, onAddAnswer, onUpdateAnswer, question, onUpdateQuestion, onDeleteAnswer }) {
    const [answerText, setAnswerText] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const handleAddAnswer = () => {
        if (!answerText) {
            alert("Please enter an answer.");
            return;
        }

        const newAnswer = {
            id: Math.floor(Math.random() * 1000) + 1,
            text: answerText,
            authorId: localStorage.getItem("userId"),
            createdAt: new Date(),
            likes: 0,
            dislikes: 0,

        };

        const updatedQuestion = {
            ...question,
            answers: [...question.answers, newAnswer]
        };

        fetch(`http://localhost:4000/questions/${question.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedQuestion)
        })
            .then((res) => res.json())
            .then((data) => {
                onAddAnswer(data.answers);

                setAnswerText("");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDeleteAnswer = (deletedAnswerId) => {
        const updatedAnswers = answers.filter((answer) => answer.id !== deletedAnswerId);
        const updatedQuestion = {
            ...question,
            answers: updatedAnswers
        };
        fetch(`http://localhost:4000/questions/${question.id}`, {
            method: "DELETE",
        })
            .then(() => {
                onUpdateQuestion(updatedQuestion);
                onDeleteAnswer(deletedAnswerId);
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (
        <div className="answer-list">
            <h4>Answers:</h4>
            {answers?.map((answer, index) => (
                <div key={index}>
                    {isEditing ? (
                        <EditAnswer answer={answer} onUpdateAnswer={onUpdateAnswer} question={question} />
                    ) : (
                        <Answer
                            answer={answer}
                            onUpdateAnswer={() => setIsEditing(true)}
                            onDeleteAnswer={() => handleDeleteAnswer(answer.id)}
                            question={question}
                        />
                    )}
                </div>
            ))}
            {isEditing ? null : (
                <div className="new-answer">
                    <textarea
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        placeholder="Enter your answer"
                    ></textarea>
                    <br />
                    <button onClick={handleAddAnswer}>Submit</button>
                </div>
            )}
        </div>
    );
}

export default AnswerList;
