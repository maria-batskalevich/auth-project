import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {getFullName, getIsFetching, getLargeAvatar} from "../../../bll/auth.selector";
import {useParams} from "react-router-dom";
import s from './Profile.module.scss'
import {getProfileTC} from "../../../bll/profile.reducer";
import {ProfileInfo} from "./ProfileInfo";
import {ProfileContacts} from "./ProfileContacts";
import {useAppDispatch} from "../../../utills/hooks";
import {Preloader} from "../../commons/Preloader/Preloader";


export const Profile = () => {
	const {id} = useParams<{ id: string }>();
	const fullName = useSelector(getFullName)
	const usersAvatar = useSelector(getLargeAvatar)
	console.log(usersAvatar)
	const isFetching = useSelector(getIsFetching)

	const dispatch = useAppDispatch()

	useEffect(() => {
		const idToFetch = id ? +id : undefined;
		dispatch(getProfileTC(idToFetch)).then()
	}, [id, dispatch])


	return (
		<div>
			{isFetching
				? (<div className={s.contentCenter}>
						<div className={s.profileWrapper}>
							<ProfileInfo fullName={fullName}/>
							<div className={s.imageWrapper}>
								<img className={s.userImage} src={usersAvatar} alt="avatar"/>
							</div>
							<ProfileContacts/>
						</div>
					</div>
				)
				: <Preloader/>}
		</div>


	);
};
