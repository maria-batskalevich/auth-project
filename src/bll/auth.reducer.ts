import {RootThunkType, ThunkDispatchType} from "../utills/hooks";
import {HttpApi} from "../dal/http.api";
import axios from 'axios'
import {authAPI, LoginParamsType} from "../dal/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../utills/error-utils";
import {profileAPI} from "../dal/profile-api";
import {ProfilePageTypes} from "./profile.reducer";


type AuthStateType = {
	id: number,
	email: string | undefined,
	login: string | undefined,
	isAuth: boolean,
	isNationalityInit: boolean,
	nationalities: Array<string>,
	error?: string | null,
	captchaUrl: string | undefined,
}
const authInitState: AuthStateType = {
	id: 0,
	email: '',
	login: '',
	isAuth: false,
	isNationalityInit: false,
	nationalities: [],
	error: null as string | null,
	captchaUrl: '',
}

enum AuthActions {
	SET_IS_AUTH = 'SET_IS_AUTH',
	SET_IS_NATIONALITY_INIT = 'SET_IS_NATIONALITY_INIT',
	SET_NATIONALITIES = 'SET_NATIONALITIES',
	SET_APP_ERROR = 'SET_APP_ERROR',
	SET_CAPTCHA_URL = 'SET_CAPTCHA_URL',
	SET_LOGIN_DATA = 'SET_LOGIN_DATA',
	SET_MY_DATA = 'SET_MY_DATA'
}

export type AuthActionsType = ReturnType<typeof setIsAuth>
	| ReturnType<typeof setIsNationalityInit>
	| ReturnType<typeof setNationalities>
	| ReturnType<typeof setAppError>
	| ReturnType<typeof setCaptchaUrl>
	| ReturnType<typeof setLoginData>
	| ReturnType<typeof setMyData>

export const authReducer = (state: AuthStateType = authInitState, action: AuthActionsType): AuthStateType => {
	switch (action.type) {
		case AuthActions.SET_IS_AUTH:
		case AuthActions.SET_IS_NATIONALITY_INIT:
		case AuthActions.SET_NATIONALITIES:
		case AuthActions.SET_APP_ERROR:
		case AuthActions.SET_CAPTCHA_URL:
		case AuthActions.SET_LOGIN_DATA:
		case AuthActions.SET_MY_DATA:
			return {...state, ...action.payload}
		default:
			return state
	}
}

const setIsAuth = (isAuth: boolean) => {
	return {
		type: AuthActions.SET_IS_AUTH,
		payload: {isAuth}
	} as const
}

export const setLoginData = (id: number, email: string | undefined, login: string) => {
	return {type: AuthActions.SET_LOGIN_DATA, payload: {id, email, login}} as const
}

export const setMyData = (data: ProfilePageTypes) => {
	return {type: AuthActions.SET_MY_DATA, payload: data} as const
}

const setIsNationalityInit = (isNationalityInit: boolean) => {
	return {
		type: AuthActions.SET_IS_NATIONALITY_INIT,
		payload: {isNationalityInit}
	} as const
}
const setNationalities = (nationalities: Array<string>) => {
	return {
		type: AuthActions.SET_NATIONALITIES,
		payload: {nationalities}
	} as const
}
export const setAppError = (error: null | string) => ({
	type: AuthActions.SET_APP_ERROR,
	payload: {error}
} as const)

const setCaptchaUrl = (captchaUrl: string | undefined) => ({
	type: AuthActions.SET_CAPTCHA_URL, payload: {captchaUrl}
} as const)


// export const loginTC = (data: LoginParamsType): any => async (dispatch: ThunkDispatchType) => {
// 	try {
// 		const res = await authAPI.login(data)
// 		if (res.data.resultCode === 0) {
// 			// @ts-ignore
// 			dispatch(setLoginData(res.data.data.userId, email, ''))
// 			dispatch(setIsAuth(true))
// 			console.log(res.data.data.userId)
// 		} else if (res.data.resultCode === 10) {
// 			dispatch(GetCaptchaUrlTC())
// 		} else {
// 			handleServerAppError(res.data, dispatch)
// 		}
// 	} catch (error: any) {
// 		// handleServerNetworkError(error.data, dispatch)
// 	}
// }

//Thunks
export const getAuthUserData = (): RootThunkType => async (dispatch: any) => {
	// debugger
	try {
		const authData = await authAPI.authMe()
		// debugger
		if (authData.resultCode === 0) {
			// debugger
			const {id, email, login} = authData.data
			dispatch(setLoginData(id, email, login))
			const myProfile = await profileAPI.getProfile(authData.data.id)
			dispatch(setMyData(myProfile))
			dispatch(setIsAuth(true))
		} else {

			console.log('some error(((')
			handleServerAppError(authData, dispatch)
		}
	} catch (error: any) {
		handleServerNetworkError(error.data, dispatch)
	}


}


export const loginTC = (data: LoginParamsType): any => async (dispatch: ThunkDispatchType) => {
	try {
		await authAPI.login(data)
			.then((res) => {
				if (res.data.resultCode === 0) {
					dispatch(setLoginData(res.data.data.userId, data.email, ''))
					dispatch(setIsAuth(true))
					console.log(res.data.data.userId)
				} else if (res.data.resultCode === 10) {
					dispatch(getCaptchaUrlTC())
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
	} catch (error: any) {
		handleServerNetworkError(error.data, dispatch)
	}
}


export const LogoutTC = () => async (dispatch: ThunkDispatchType) => {
	try {
		await authAPI.logout()
			.then(res => {
				if (res.data.resultCode === 0) {
					dispatch(setIsAuth(false))
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
	} catch (error: any) {
		handleServerNetworkError(error.data, dispatch)
	}
}

export const getCaptchaUrlTC = (): any => async (dispatch: ThunkDispatchType) => {
	dispatch(setCaptchaUrl(undefined));
	const response = await authAPI.getCaptchaUrl();
	dispatch(setCaptchaUrl(response));
}

export const getAllNationalitiesTC = () => async (dispatch: ThunkDispatchType) => {
	try {
		const response = await HttpApi.getAllNationality()
		const nationalities = response
			.map(n => n.demonyms.eng.m)
			.filter(n => n)
			.sort()
		// .uniq();
		const uniqueNationalities = [...new Set(nationalities)];

		dispatch(setNationalities(uniqueNationalities))
		dispatch(setIsNationalityInit(true))
	} catch (error) {
		let errorMessage: string;
		if (axios.isAxiosError(error)) {
			errorMessage = error.response
				? error.response.data.message
				: error.message;

		} else {
			//@ts-ignore
			errorMessage = error.message;
		}
		console.log(errorMessage);
		return Promise.reject(errorMessage);
	}
}

