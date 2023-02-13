import React, { useState, useEffect } from "react";

function EditAnswer({ answer, onUpdateAnswer, question }) {
    const [answerText, setAnswerText] = useState(answer.text);

    useEffect(() => {
        fetch(`http://localhost:4000/questions/${question.id}`)
            .then((res) => res.json())
            .then((data) => {
                setAnswerText(data.text);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [answer.id]);

    const handleUpdate = () => {
        if (!answerText) {
            alert("Please enter a new answer.");
            return;
        }

        const updatedAnswer = {
            ...answer,
            text: answerText
        };

        fetch(`http://localhost:4000/questions/${question.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedAnswer)
        })
            .then((res) => res.json())
            .then((data) => {
                onUpdateAnswer(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="edit-answer">

            <textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Enter your new answer"
            ></textarea>
            <br />
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}

export default EditAnswer;
