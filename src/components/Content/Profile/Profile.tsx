import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {getFullName, getIsAuth, getUserId} from "../../../bll/auth.selector";
import {Navigate} from "react-router-dom";
import {PATH} from "../Content";
import s from './Profile.module.scss'
import user from '../../../assets/images/userMaryia.jpg'
import {getProfileTC} from "../../../bll/profile.reducer";
import {ProfileInfo} from "./ProfileInfo";
import {ProfileContacts} from "./ProfileContacts";
import {useAppDispatch} from "../../../utills/hooks";


export const Profile = () => {

	const isAuth = useSelector(getIsAuth)
	const userID = useSelector(getUserId)
	const fullName = useSelector(getFullName)

	const dispatch = useAppDispatch()

	useEffect(() => {
		userID && dispatch(getProfileTC(userID))
	}, [userID, dispatch])


	if (!isAuth) {
		return <Navigate to={PATH.LOGIN}/>
	}

	return (

		<div className={s.contentCenter}>
			<div className={s.profileWrapper}>
				<ProfileInfo fullName={fullName}/>
				<div className={s.imageWrapper}>
					<img className={s.userImage} src={user} alt="avatar"/>
				</div>
				<ProfileContacts/>
			</div>
		</div>


	);
};
