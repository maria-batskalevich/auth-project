import {ThunkDispatchType} from "../utills/hooks";
import {profileAPI} from "../dal/profile-api";
import {RootStateType} from "./store";
import {getUserId} from "./auth.selector";
import {handleServerNetworkError} from "../utills/error-utils";

export type ProfilePageTypes = {
	userId: number | null
	aboutMe: string
	lookingForAJob: boolean
	description: string
	fullName: string
	contacts: ContactsType
	photos: PhotosType
	isFetching: boolean
}

export type ContactsType = {
	github: string
	linkedIn: string
}

export type PhotosType = {
	small: string
	large: string
}

const initialState: ProfilePageTypes = {
	userId: null,
	aboutMe: '',
	lookingForAJob: true,
	description: 'smth about me',
	fullName: '',
	contacts: {
		github: 'https://github.com/maria-batskalevich',
		linkedIn: 'https://www.linkedin.com/in/maria-batskalevich-18b289230/'
	},
	photos: {
		small: '',
		large: ''
	},
	isFetching: false
}

enum profileActions {
	SET_PROFILE = 'SET_PROFILE',
	SET_IS_FETCHING = 'SET_IS_FETCHING'
}

export type ProfileActionsType = ReturnType<typeof setProfile> | ReturnType<typeof setIsFetching>


export const profileReducer = (state: ProfilePageTypes = initialState, action: ProfileActionsType): ProfilePageTypes => {
	switch (action.type) {
		case profileActions.SET_PROFILE:
			return {...state, ...action.payload.data}
		case profileActions.SET_IS_FETCHING:
			return {...state, ...action.payload}
		default:
			return state
	}
}

export const setProfile = (data: ProfilePageTypes) => ({
	type: profileActions.SET_PROFILE, payload: {data}
} as const)
export const setIsFetching = (isFetching: boolean) => ({
	type: profileActions.SET_IS_FETCHING, payload: {isFetching}
} as const)


export const getProfileTC = (userID?: number) => async (dispatch: ThunkDispatchType, getState: () => RootStateType) => {

	const myId = getUserId(getState());
	if (!myId) return;

	try {
		const profile = await profileAPI.getProfile(userID || myId)
		dispatch(setProfile(profile))
		dispatch(setIsFetching(true))

	} catch (error: any) {
		handleServerNetworkError(error, dispatch)
	}
}