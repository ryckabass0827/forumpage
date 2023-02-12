import React from "react";
import EditQuestion from "./EditQuestion";
import Question from "./Question";

function QuestionList({ questions, onUpdateAnswer, onUpdateQuestion, onDeleteQuestion, handleAddAnswer, onDeleteAnswer, authorId, userId }) {
    return (
        <div className="klausimai">
            {questions.map((question) => (
                <div key={question.id}>
                    {question.isEditing ? (
                        <EditQuestion
                            question={question}
                            onSubmit={(updatedQuestion) => {
                                onUpdateQuestion(updatedQuestion);
                            }}
                        />
                    ) : (
                        <Question
                            key={question.id}
                            question={question}
                            onUpdateAnswer={onUpdateAnswer}
                            onUpdateQuestion={onUpdateQuestion}
                            onDeleteQuestion={onDeleteQuestion}
                            onDeleteAnswer={onDeleteAnswer}
                            handleAddAnswer={handleAddAnswer}
                            authorId={authorId}
                            userId={userId}
                        />
                    )}

                </div>
            ))}
        </div>
    );
}

export default QuestionList;
