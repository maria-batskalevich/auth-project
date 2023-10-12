import React from 'react';
import {Navigate, Routes, Route} from 'react-router-dom'
import {SignUp} from "./SignUp/SignUp";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../bll/auth.selector";
import {Login} from "./Login/Login";
import {Profile} from "./Profile/Profile";



export enum PATH {
	ROOT = '/',
	HOME = '/home',
	PROFILE = '/profile',
	LOGIN = '/login',
	SIGN_UP = '/sign-up',
	ERROR = '/404',
}


export const Content = () => {
	const isAuth = useSelector(getIsAuth);

	return (
		<div>
			<Routes>
				<Route path={PATH.ROOT} element={isAuth ? <Profile/> : <Navigate to={PATH.LOGIN}/>}/>
				<Route path={PATH.PROFILE} element={isAuth ? <Profile/> : <Navigate to={PATH.LOGIN}/>}/>
				<Route path={PATH.LOGIN} element={!isAuth ? <Login/> : <Navigate to={PATH.PROFILE}/>}/>
				<Route path={PATH.SIGN_UP} element={!isAuth ? <SignUp/> : <Navigate to={PATH.PROFILE}/>}/>
				<Route path={PATH.ERROR} element={!isAuth ? <Navigate to={PATH.LOGIN}/> : <Navigate to={PATH.PROFILE}/>}/>
				<Route path={'*'} element={<Navigate to={PATH.ERROR}/>}/>
			</Routes>
		</div>
	);
};

