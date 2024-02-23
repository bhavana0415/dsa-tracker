import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

export const fetchQuestionsAsync = createAsyncThunk('fetchQuestions', async (_, { dispatch }) => {
    try {
        const res = await fetch("routes/question", {
            cache: "no-store",
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(fetchSlice.actions.setQuestions(data.questions));
        }
    } catch (error) {
        console.log(error);
    }
})


export const addQuestionsAsync = createAsyncThunk('addQuestion', async (requestBody, { dispatch }) => {
    try {
        const res = await fetch("routes/question", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
        if(res.ok){
            dispatch(fetchQuestionsAsync());
        }
    } catch (error) {
        console.log(error);
    }
})

export const addScoreAsync = createAsyncThunk('addScore', async (requestBody, { dispatch }) => {
    try {
        const res = await fetch("routes/score", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
        if(res.ok){
            dispatch(fetchScoreAsync());
        }
    } catch (error) {
        console.log(error);
    }
})

export const fetchScoreAsync = createAsyncThunk('fetchScore', async (_, { dispatch }) => {
    try {
        const res = await fetch("routes/score", {
            cache: "no-store",
        });
        if (res.ok) {
            const data = await res.json();
            if(data.score.length>0){
                dispatch(fetchSlice.actions.setScore(data.score[0]));
            }
            return data.questions;
        }
    } catch (error) {
        console.log(error);
    }
})

export const updateScoreAsync = createAsyncThunk('updateScore', async (requestBody, { dispatch }) => {
    try {
        const res = await fetch("routes/score", {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        if (res.ok) {
            dispatch(fetchScoreAsync());
        }
    } catch (error) {
        console.log(error);
    }
});


export const fetchSlice = createSlice({
    name: 'fetchData',
    initialState: {currentQuestions: null, currentScore: 0, error: null},
    reducers: {
        setQuestions: (state, action) => {
            state.currentQuestions = action.payload;
        },
        setScore: (state, action) => {
            state.currentScore = action.payload;
        }
    },
    extraReducers: (builder: any) => {
        builder
        .addCase(addQuestionsAsync.fulfilled, (state: any, action: any) => {
            state.error = null;
        })
        .addCase(fetchQuestionsAsync.fulfilled, (state: any, action: any) => {
            state.questions = action.payload.questions;
        })
        .addCase(addQuestionsAsync.rejected, (state: any, action: any) => {
            state.error = action.payload;
        })
        .addCase(fetchQuestionsAsync.rejected, (state: any, action: any) => {
            state.error = action.payload;
        })
        .addCase(addScoreAsync.fulfilled, (state: any, action: any) => {
            state.error = null;
        })
        .addCase(updateScoreAsync.fulfilled, (state: any, action: any) => {
            state.error = null;
        })
        .addCase(fetchScoreAsync.fulfilled, (state: any, action: any) => {
            if(action.payload.score.length>0) state.score = action.payload.score[0];
        })
        .addCase(addScoreAsync.rejected, (state: any, action: any) => {
            state.error = action.payload;
        })
        .addCase(updateScoreAsync.rejected, (state: any, action: any) => {
            state.error = action.payload;
        })
        .addCase(fetchScoreAsync.rejected, (state: any, action: any) => {
            state.error = action.payload;
        })
    }
})

export default fetchSlice.reducer;