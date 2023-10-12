import React from 'react';
import s from './Home.module.scss'
import {Logout} from "../Logout/Logout";
import {useSelector} from "react-redux";
import {getIsAuth} from "../../../bll/auth.selector";
import {Navigate} from "react-router-dom";
import {PATH} from "../Content";

export const Home = () => {
	const isAuth = useSelector(getIsAuth)
	if (!isAuth) {
		return <Navigate to={PATH.LOGIN}/>
	}
	return (
		<div className={s.homeWrapper}>
			HOME
			<Logout/>
		</div>
	);
};


