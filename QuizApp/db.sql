CREATE TABLE quizzes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    topic VARCHAR(255)
);

CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quiz_id INT,
    question TEXT,
    correct_option INT,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

CREATE TABLE options (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_id INT,
    option_text TEXT,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);
