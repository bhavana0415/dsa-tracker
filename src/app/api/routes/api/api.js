export const postQuestions = async (q_id, userId, questionData) => {
    const url = `http://localhost:3000/api/routes/questions`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ q_id, userId, ...questionData }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch questions: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in getQuestions:", error);
        throw error;
    }
};

export const fetchUserQuestions = async (userId) => {
    const url = `http://localhost:3000/api/routes/users/${userId}`;
    try {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
            throw new Error("Failed to fetch questions");
        }
        const questions = await response.json();
        return questions;
    } catch (error) {
        console.error("Error in fetchUserQuestions:", error);
        throw error;
    }
};

export const fetchQuestionsBySheet = async (userId, sheet) => {
    const url = `http://localhost:3000/api/routes/users/${userId}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sheet }),
        });
        if (!response.ok) {
            throw new Error("Failed to fetch questions by sheet");
        }
        const questions = await response.json();
        return questions;
    } catch (error) {
        console.error("Error in fetchQuestionsBySheet:", error);
        throw error;
    }
};

export const fetchQuestionsBySheetAndTopic = async (
    userId,
    sheet,
    topic
) => {
    const url = `http://localhost:3000/api/routes/users/${userId}`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sheet, topic }),
        });
        if (!response.ok) {
            throw new Error("Failed to fetch questions by sheet and topic");
        }
        const questions = await response.json();
        return questions;
    } catch (error) {
        console.error("Error in fetchQuestionsBySheetAndTopic:", error);
        throw error;
    }
};
