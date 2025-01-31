import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setIsLoading } from "../currentState/currentStateSlice";
import {
    fetchQuestionsBySheet,
    fetchQuestionsBySheetAndTopic,
    fetchUserQuestions,
    postQuestions,
} from "@/app/api/routes/api/api";

interface QuestionState {
    all_questions: any[] | null;
    apnaCollegeQuestions: any[] | null;
    arshGoyalQuestions: any[] | null;
    loveBabbarQuestions: any[] | null;
    striverQuestions: any[] | null;
    error: string | null;
}

interface FetchQuestionsBySheetData {
    userId: string;
    sheet: string;
}

interface FetchQuestionsBySheetAndTopicData {
    userId: string;
    sheet: string;
    topic: string;
}

interface PostQuestionData {
    q_id: string;
    userId: string;
    questionData: any;
}

// Async Thunks
export const fetchUserQuestionsAsync = createAsyncThunk<any[], string, { rejectValue: string }>(
    "questions/fetchAllQuestions",
    async (userId, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setIsLoading(true));
            const response = await fetchUserQuestions(userId);
            return response || [];
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "An unknown error occurred"
            );
        } finally {
            dispatch(setIsLoading(false));
        }
    }
);

export const fetchQuestionsBySheetAsync = createAsyncThunk<
    { sheet: string; response: any[] },
    FetchQuestionsBySheetData,
    { rejectValue: string }
>(
    "questions/fetchQuestionsBySheet",
    async (data, { rejectWithValue, dispatch }) => {
        const { userId, sheet } = data;
        try {
            dispatch(setIsLoading(true));
            const response = await fetchQuestionsBySheet(userId, sheet);
            return { sheet, response: response || [] };
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "An unknown error occurred"
            );
        } finally {
            dispatch(setIsLoading(false));
        }
    }
);

export const fetchQuestionsBySheetAndTopicAsync = createAsyncThunk<
    any[],
    FetchQuestionsBySheetAndTopicData,
    { rejectValue: string }
>(
    "questions/fetchQuestionsBySheetAndTopic",
    async ({ userId, sheet, topic }, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setIsLoading(true));
            const response = await fetchQuestionsBySheetAndTopic(userId, sheet, topic);
            return response || [];
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "An unknown error occurred"
            );
        } finally {
            dispatch(setIsLoading(false));
        }
    }
);

export const postQuestionAsync = createAsyncThunk<
    any,
    PostQuestionData,
    { rejectValue: string }
>(
    "questions/postQuestion",
    async ({ q_id, userId, questionData }, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setIsLoading(true));
            const response = await postQuestions(q_id, userId, questionData);
            const data = {
                userId,
                sheet: questionData.sheet,
            };
            dispatch(fetchQuestionsBySheetAsync(data) as any);
            dispatch(fetchUserQuestionsAsync(userId) as any)
            return response;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "An unknown error occurred"
            );
        } finally {
            dispatch(setIsLoading(false));
        }
    }
);


const initialState: QuestionState = {
    all_questions: null,
    apnaCollegeQuestions: null,
    arshGoyalQuestions: null,
    loveBabbarQuestions: null,
    striverQuestions: null,
    error: null,
};

export const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setApnaCollegeQuestions: (state, action: PayloadAction<any[]>) => {
            state.apnaCollegeQuestions = action.payload;
        },
        setArshGoyalQuestions: (state, action: PayloadAction<any[]>) => {
            state.arshGoyalQuestions = action.payload;
        },
        setLoveBabbarQuestions: (state, action: PayloadAction<any[]>) => {
            state.loveBabbarQuestions = action.payload;
        },
        setStriverQuestions: (state, action: PayloadAction<any[]>) => {
            state.striverQuestions = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserQuestionsAsync.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.all_questions = action.payload;
                state.error = null;
            })
            .addCase(fetchUserQuestionsAsync.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || "Failed to fetch questions";
            })
            .addCase(fetchQuestionsBySheetAsync.fulfilled, (state, action: PayloadAction<{ sheet: string; response: any[] }>) => {
                console.log(action.payload.sheet);
                console.log(action.payload.response);
                switch (action.payload.sheet) {
                    case "apnaCollegeQuestions":
                        state.apnaCollegeQuestions = action.payload.response;
                        break;
                    case "arshGoyalQuestions":
                        state.arshGoyalQuestions = action.payload.response;
                        break;
                    case "loveBabbarQuestions":
                        state.loveBabbarQuestions = action.payload.response;
                        break;
                    case "striverQuestions":
                        state.striverQuestions = action.payload.response;
                        break;
                    default:
                        console.warn(`Unknown sheet: ${action.payload.sheet}`);
                }
                state.error = null;
            })
            .addCase(fetchQuestionsBySheetAsync.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || "Failed to fetch questions by sheet";
            })
            .addCase(fetchQuestionsBySheetAndTopicAsync.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || "Failed to fetch questions by sheet and topic";
            })
            .addCase(postQuestionAsync.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || "Failed to post question";
            });
    },
});

// Actions
export const {
    setApnaCollegeQuestions,
    setArshGoyalQuestions,
    setLoveBabbarQuestions,
    setStriverQuestions,
} = questionsSlice.actions;

export default questionsSlice.reducer;
