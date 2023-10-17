import React from 'react';
import s from './AuthContainer.module.scss'
import userAvatar from '../../../../assets/images/usersAvatar.png'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {logoutTC} from "../../../../bll/auth.reducer";
import {getEmail, getIsAuth, getLargeAvatar} from "../../../../bll/auth.selector";

export const AuthContainer = () => {
	const email = useSelector(getEmail)
	const isAuth = useSelector(getIsAuth)
	const avatarImg = useSelector(getLargeAvatar)

	const dispatch = useDispatch()
	const onClickHandler = () => {
		// @ts-ignore
		dispatch(logoutTC())
	}

	return (
		<div>
			{isAuth
				? <div className={s.authWrapper}>
					<div className={s.avatar}>
						<img src={avatarImg ? avatarImg : userAvatar} alt="avatar"/>
					</div>
					<div className={s.buttonWrapper}>
						<p>{email}</p>
						<button className={s.logout} onClick={onClickHandler}>Log out</button>
					</div>
				</div>
				:
				<div className={s.logout}>
					<NavLink className={s.logout} to={'/login'}>log in</NavLink>
				</div>
			}
		</div>
	);
};

