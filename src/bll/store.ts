import {legacy_createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {AuthActionsType, authReducer} from "./auth.reducer";
import {ProfileActionsType, profileReducer} from "./profile.reducer";

const rootReducer = combineReducers({
	auth: authReducer,
	profilePage: profileReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type RootStateType = ReturnType<typeof rootReducer>
export type RootActionsType = AuthActionsType | ProfileActionsType