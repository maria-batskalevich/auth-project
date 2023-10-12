import {useDispatch} from "react-redux";
import {RootActionsType, RootStateType} from "../bll/store";
import {ThunkDispatch, ThunkAction} from 'redux-thunk';

export type ThunkDispatchType = ThunkDispatch<RootStateType, any, RootActionsType>
export type RootThunkType = ThunkAction<void, RootStateType, unknown, RootActionsType>
export const useAppDispatch = () => useDispatch<ThunkDispatchType>();
