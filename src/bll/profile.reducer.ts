import {ThunkDispatchType} from "../utills/hooks";
import {profileAPI} from "../dal/profile-api";

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
	SET_PROFILE = 'SET_PROFILE'
}

export type ProfileActionsType = ReturnType<typeof setProfile>


export const profileReducer = (state: ProfilePageTypes = initialState, action: ProfileActionsType): ProfilePageTypes => {
	switch (action.type) {
		case profileActions.SET_PROFILE:
			return {...state, ...action.payload.data}
		default:
			return state
	}
}

export const setProfile = (data: ProfilePageTypes) => ({
	type: profileActions.SET_PROFILE, payload: {data}
} as const)

export const getProfileTC = (userID: number) => async (dispatch: ThunkDispatchType) => {
	try {
		const profile = await profileAPI.getProfile(userID)
		console.log(profile)
		dispatch(setProfile(profile))
	} catch (e) {
		console.log(e)
	}
}