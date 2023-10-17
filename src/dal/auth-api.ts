import axios from "axios";

const authConfig = {
	baseURL: process.env.REACT_APP_BASE_URL,
	withCredentials: true,
	headers: {
		'API-KEY': process.env.REACT_APP_API_KEY
	}
}

export const instance = axios.create(authConfig)

export const authAPI = {
	authMe() {
		return instance.get<ResponseType<AuthResponseDataType>>('auth/me')
			.then(res => res.data)
	},
	login(data: LoginParamsType) {
		// debugger
		return instance.post<ResponseType<{ userId: number }>>('auth/login', data)
	},
	logout() {
		return instance.delete<ResponseType<{ userId: number }>>('auth/login')
	},
	getCaptchaUrl(): Promise<string> {
		return instance.get<CaptchaType>('security/get-captcha-url')
			.then(response => response.data.url);
	},
}

// types
export type LoginParamsType = {
	email: string | undefined,
	password: string | undefined,
	rememberMe?: boolean
	captcha: string,
}

export type ResponseType<D = {}> = {
	resultCode: number
	messages: Array<string>
	fieldsErrors: Array<string>
	data: D
}

export type CaptchaType = {
	url: string
}
type AuthResponseDataType = {
	id: number
	email: string
	login: string
}