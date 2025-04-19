export const postQuestions = async (q_id, userId, questionData) => {
    const url = `/api/routes/questions`;
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
        console.log("Error in getQuestions:");
        throw error;
    }
};

export const fetchUserQuestions = async (userId) => {
    const url = `/api/routes/users/${userId}`;
    try {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
            throw new Error("Failed to fetch questions");
        }
        const questions = await response.json();
        return questions;
    } catch (error) {
        console.log("Error in fetchUserQuestions:");
        throw error;
    }
};

export const fetchQuestionsBySheet = async (userId, sheet) => {
    const url = `/api/routes/users/${userId}`;
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
        console.log("Error in fetchQuestionsBySheet:");
        throw error;
    }
};

export const fetchQuestionsBySheetAndTopic = async (
    userId,
    sheet,
    topic
) => {
    const url = `/api/routes/users/${userId}`;
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
        console.log("Error in fetchQuestionsBySheetAndTopic:");
        throw error;
    }
};

export const updateUserMySheet = async (u_id, my_sheet) => {
    const url = `/api/routes/users/sheet/${u_id}`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ my_sheet }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to update user sheet: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchUserMySheet = async (userId) => {
    const url = `/api/routes/users/sheet/${userId}`;
    try {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
            throw new Error("Failed to fetch my sheet");
        }
        const questions = await response.json();
        return questions;
    } catch (error) {
        throw error;
    }
};