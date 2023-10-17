import React from 'react';
import s from "../SignUp/SignUp.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {logoutTC} from "../../../bll/auth.reducer";
import {getIsAuth} from "../../../bll/auth.selector";
import {Navigate} from "react-router-dom";
import {PATH} from "../Content";

export const Logout = () => {
	const dispatch = useDispatch()
	const isAuth = useSelector(getIsAuth)
	const onClickHandler = () => {
		// @ts-ignore
		dispatch(logoutTC())
	}

	if (!isAuth) {
		return <Navigate to={PATH.LOGIN}/>
	}


	return (
		<div>
			{isAuth && <button
				className={s.completeSignupButton}
				onClick={onClickHandler}
			>Logout</button>}
		</div>
	);
};

