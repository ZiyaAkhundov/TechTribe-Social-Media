import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth"
import tokenReducer from './token'

export default configureStore({
    reducer:{
        auth: authReducer,
        token: tokenReducer
    }
})