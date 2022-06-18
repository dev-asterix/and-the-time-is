import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import { Timezones } from "../functions/timeNow";

const initState = [] as Timezones[];

const addTzCard = createAction<Timezones>("timezone/add");
const removeTzCard = createAction("timezone/remove");

const tzReducer = createReducer(initState, (builder) => {
  builder.addCase(
    addTzCard, (state, action) => {
      const tz = action.payload;
      return [...state, tz];
    });
  builder.addCase(
    removeTzCard, (state, action) => {
      const tz = action.payload;
      return state.filter(tz => tz.name !== tz.name);
    });
});

const store = configureStore({
  preloadedState: {
    timezones: initState,
  },
  reducer: {
    timezones: tzReducer,
  },
});

export default store;
