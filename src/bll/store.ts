import {legacy_createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {AuthActionsType, authReducer} from "./auth.reducer";
import {ProfileActionsType, profileReducer} from "./profile.reducer";
import {AppActionsType, appReducer} from "./app.reducer";

const rootReducer = combineReducers({
	app: appReducer,
	auth: authReducer,
	profilePage: profileReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type RootStateType = ReturnType<typeof rootReducer>
export type RootActionsType = AppActionsType | AuthActionsType | ProfileActionsType