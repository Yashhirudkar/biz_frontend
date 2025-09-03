import { configureStore } from "@reduxjs/toolkit";
//import someReducer from "./src/slices/someSlice";
//import authReducer from "./src/slices/authSlice"; // Import the auth slice

const store = configureStore({
  reducer: {
    // some: someReducer,
    // auth: authReducer, // Add the auth slice to the store
  },
});

export default store;
