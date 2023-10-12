import axios from "axios";
import {ProfilePageTypes} from "../bll/profile.reducer";

const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	withCredentials: true,
	headers: {
		'API-KEY': '875e5d3c-d106-4de6-a4d1-29564b65ae2b'
	}
})

type ProfileApiResponseType = ProfilePageTypes

export const profileAPI = {
	getProfile(userID: number) {
		return instance.get<ProfileApiResponseType>(`profile/${userID}`)
			.then(res => {
				return res.data
			})
	}
}