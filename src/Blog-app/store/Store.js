import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import AuthReduce from "./AuthSlice";
import ThemeReducer from "./themeSlice";
import { persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({
    auth: AuthReduce,
    theme: ThemeReducer
})
const persistConfig = {
    key:"root",
    storage,
    version:1
}
const persistReducers = persistReducer(persistConfig,rootReducer)
export const Store = configureStore({
    reducer: persistReducers,
    middleware:(getDefaultMiddleware) =>{
        return getDefaultMiddleware({serializableCheck:false})
    }
});
export const persistor = persistStore(Store)