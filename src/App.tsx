import React, {useEffect} from 'react';
import s from './App.module.scss';
import {SideBar} from "./components/SideBar/SideBar";
import {Content} from "./components/Content/Content";
import {getAuthUserData} from "./bll/auth.reducer";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getIsInitialized} from "./bll/auth.selector";
import {Header} from "./components/Content/Header/Header";
import {ToastContainer} from "react-toastify";
import {Preloader} from "./components/commons/Preloader/Preloader";

export const App = () => {
	const dispatch = useDispatch()
	const isAuth = useSelector(getIsAuth)
	const isInitialized = useSelector(getIsInitialized)


	useEffect(() => {
		// @ts-ignore
		dispatch(getAuthUserData())
	}, [dispatch])


	if (!isInitialized) {
		return <Preloader/>
	}

	return (
		<div className={isAuth ? '' : s.appWrapper}>
			{!isAuth ? <SideBar/>	: <Header/>}
			<Content/>
			<ToastContainer
				position='bottom-left'
				autoClose={3000}
				hideProgressBar={false}
				closeOnClick={true}
				pauseOnHover={false}
				draggable={true}
				theme={'colored'}
			/>
		</div>
	);
}