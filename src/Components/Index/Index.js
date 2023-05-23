import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialCounterState = { isAuthenticated: false, token: null };

const AuthSlice = createSlice({
  name: "Auth",
  initialState: initialCounterState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

const initialState = { expenses: [], ShowPremiumActive: false };

const CounterSlice = createSlice({
  name: "premium",
  initialState: initialState,
  reducers: {
    addExpense(state, action) {
      state.expenses.push(action.payload);
    },
    setExpense(state, action) {
      state.expenses = action.payload;
    },
    setShowPremimumActive(state, action) {
      state.ShowPremiumActive = action.payload;
    },
  },
});

const initialStateTheme = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialStateTheme,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    expenses: CounterSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export const ThemeActions = themeSlice.actions;
export const AuthActions = AuthSlice.actions;
export const ExpenseActions = CounterSlice.actions;

export default store;
