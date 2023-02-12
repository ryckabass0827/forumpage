import React, { useState, useContext } from "react";
import AuthContext from '../../context/AuthContext';


function EditQuestion({ question, onUpdateQuestion }) {
    const { isAuthenticated, userId } = useContext(AuthContext);
    const [title, setTitle] = useState(question.title);
    const [description, setDescription] = useState(question.description);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isAuthenticated) {
            return alert("Please log in to edit a question.");
        }

        if (question.authorId !== userId) {
            return alert("You can only edit your own questions.");
        }

        fetch(`http://localhost:4000/questions/${question.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description }),
        })
            .then(res => res.json())
            .then(data => {
                onUpdateQuestion(data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <form className="editForm" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter question title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Enter question description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Save Changes</button>
        </form>
    );
}

export default EditQuestion;
