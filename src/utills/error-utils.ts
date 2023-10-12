import {toast} from 'react-toastify';
import {ResponseType} from '../dal/auth-api'
import {Dispatch} from 'redux'
import {setAppError} from "../bll/auth.reducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<ReturnType<typeof setAppError>>) => {
	if (data.messages.length) {
		dispatch(setAppError(data.messages[0]))
		toast.error(data.messages[0])
	} else {
		dispatch(setAppError('Some error occurred'))
	}
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<ReturnType<typeof setAppError>>) => {
	dispatch(setAppError(error.message ? error.message : 'Some error occurred'))
	toast(error.message ? error.message : 'Some error occurred')
}
