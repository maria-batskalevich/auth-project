import {RootStateType} from "./store";
import {ContactsType, ProfilePageTypes} from "./profile.reducer";


export const getIsAuth = (state: RootStateType): boolean => state.auth.isAuth
export const getIsInitialized = (state: RootStateType): boolean => state.app.isAppInitialized
export const getIsNationalityInit = (state: RootStateType): boolean => state.auth.isNationalityInit
export const getNationalities = (state: RootStateType): Array<string> => state.auth.nationalities
export const getCaptchaUrl = (state: RootStateType): string | undefined => state.auth.captchaUrl
export const getLogin = (state: RootStateType): string | undefined => state.auth.login
export const getEmail = (state: RootStateType): string | undefined => state.auth.email
export const getUserId = (state: RootStateType): number => state.auth.id
export const getIsLookingForAJob = (state: RootStateType): boolean => state.profilePage.lookingForAJob
export const getContacts = (state: RootStateType): ContactsType => state.profilePage.contacts
export const getUsersDescription = (state: RootStateType): string => state.profilePage.description
export const getFullName = (state: RootStateType): string | undefined => state.profilePage.fullName
export const getSmallAvatar = (state: RootStateType): string | undefined => state.profilePage.photos.small
export const getLargeAvatar = (state: RootStateType): string | undefined => state.profilePage.photos.large
export const getProfile = (state: RootStateType): ProfilePageTypes => state.profilePage
