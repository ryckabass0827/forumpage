import React, { useState } from "react";
import Moment from "react-moment";

function AnswerList({ question, onUpdateQuestion, onAddAnswer }) {
    const [answerText, setAnswerText] = useState("");

    const handleSubmitAnswer = () => {
        if (!answerText) {
            return alert("Please enter an answer.");
        }

        const newAnswer = {
            text: answerText,
            authorId: localStorage.getItem("userId"),
            createdAt: new Date(),
            likes: 0,
            dislikes: 0
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
                onUpdateQuestion(data);
                setAnswerText("");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    if (!question || !question.answers) {
        return null; // or display an error message
    }

    return (
        <div className="answer-list">
            <h4>Answers:</h4>
            {question.answers.map((answer) => (
                <div key={answer.id}>
                    <p>{answer.text}</p>
                    <p>
                        Answered by User {answer.authorId} on{" "}
                        <Moment format="YYYY-MM-DD">{answer.createdAt}</Moment>
                    </p>
                </div>
            ))}
            <div className="new-answer">
                <textarea
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Enter your answer"
                ></textarea>
                <br />
                <button onClick={handleSubmitAnswer}>Submit</button>
            </div>
        </div>
    );
}

export default AnswerList;
