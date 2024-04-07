// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import {commonApi} from "./apiServices/commonApi.js";

const store = configureStore({
    reducer: {
        auth: authReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(commonApi.middleware),
    preloadedState: {},
    devTools: true,
});

export default store;
