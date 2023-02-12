import React, { useState, useEffect, useContext } from "react";
import QuestionList from "../questions/QuestionList";
import Header from "../Header";
import PostQuestion from "../questions/PostQuestion";
import AuthContext from "../../context/AuthContext";
import EditQuestion from "../questions/EditQuestion";

function Home() {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        fetch("http://localhost:4000/questions")
            .then((res) => res.json())
            .then((data) => {
                setQuestions(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    const handlePostQuestion = (question) => {
        setQuestions([...questions, question]);
        setSuccess("Question posted successfully");
    };

    const handleUpdateQuestion = (question) => {
        setQuestions(
            questions.map((q) => (q.id === question.id ? question : q))
        );
        setSuccess("Question updated successfully");
    };

    const handleDeleteQuestion = (questionId) => {
        setQuestions(questions.filter((q) => q.id !== questionId));
    };

    return (
        <div className="Home">
            <Header />
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {success && <p>{success}</p>}
                    <QuestionList
                        questions={questions}
                        onUpdateQuestion={handleUpdateQuestion}
                        onDeleteQuestion={handleDeleteQuestion}

                    />
                    <EditQuestion />
                    <PostQuestion onPostQuestion={handlePostQuestion} />
                </div>
            )}
        </div>
    );
}

export default Home;