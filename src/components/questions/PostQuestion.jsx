import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';

const PostQuestion = () => {
    const { isAuthenticated, userId } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        if (isAuthenticated) {
            fetch('http://localhost:4000/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description,
                    authorId: userId,
                    createdAt: new Date(),
                    likes: 0,
                    dislikes: 0,
                    updated: false,
                    answers: []
                }),
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <form className='klausimas' onSubmit={handleSubmit}>
            <label htmlFor="">Question Title
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} /></label>

            <label htmlFor="">Your Question
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} /></label>
            <button type="submit">Post</button>
        </form>
    );
};

export default PostQuestion;