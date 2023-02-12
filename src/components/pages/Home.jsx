import React, { useState, useEffect, useContext } from "react";
import QuestionList from "../questions/QuestionList";
import Header from "../Header";
import PostQuestion from "../questions/PostQuestion";
import AuthContext from "../../context/AuthContext";


function Home(question) {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const url = `http://localhost:4000/questions${searchTerm ? `?title_like=${searchTerm}` : ""
            }`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setQuestions(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, [searchTerm]);

    const handlePostQuestion = (question) => {
        setQuestions([...questions, question]);
        setSuccess("Question posted successfully");
    };

    const handleUpdateQuestion = (question) => {
        setQuestions(questions.map((q) => (q.id === question.id ? question : q)));
        setSuccess("Question updated successfully");
    };

    const handleDeleteQuestion = (questionId) => {
        setQuestions(questions.filter((q) => q.id !== questionId));
    };


    const handleAnswerUpdate = (updatedAnswers) => {
        const updatedQuestions = questions.map((q) => {
            if (q.id === question.id) {
                return { ...q, answers: updatedAnswers };
            }
            return q;
        });
        setQuestions(updatedQuestions);
    };

    const handleAddAnswer = (newAnswer) => {
        const updatedQuestions = questions.map((q) => {
            if (q.id === newAnswer.questionId) {
                return { ...q, answers: q.answers.concat(newAnswer) };
            }
            return q;
        });
        setQuestions(updatedQuestions);
    };


    return (
        <div className="Home">
            <Header onSearch={setSearchTerm} />
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
                        onAddAnswer={handleAddAnswer}
                        onUpdateAnswer={handleAnswerUpdate}
                    />

                    <PostQuestion onPostQuestion={handlePostQuestion} />
                </div>
            )}
        </div>
    );
}

export default Home;
