
type AppStateType = {
	isAppInitialized: boolean
}
const AppInitState: AppStateType = {
	isAppInitialized: false
}

enum AppActions {
	SET_APP_INITIALIZED = 'SET_APP_INITIALIZED',
}
export type AppActionsType = ReturnType<typeof setAppInitialized>

export const appReducer = (state: AppStateType = AppInitState, action: AppActionsType): AppStateType => {
	switch (action.type) {
		case AppActions.SET_APP_INITIALIZED:
			return {...state, ...action.payload}
		default: {
			return state
		}
	}
}

export const setAppInitialized = (isAppInitialized: boolean) => ({
	type: AppActions.SET_APP_INITIALIZED,
	payload: {isAppInitialized}
} as const)
