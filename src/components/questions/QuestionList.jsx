import React from "react";
import Question from "./Question";
import EditQuestion from "./EditQuestion";

function QuestionList({ questions, onUpdateQuestion, onDeleteQuestion, authorId }) {
    return (
        <div className="klausimai">
            {questions && questions.map((question) => (
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
                            question={question}
                            onUpdateQuestion={onUpdateQuestion}
                            onDeleteQuestion={onDeleteQuestion}
                            authorId={authorId}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default QuestionList;
