import React from 'react';
import s from "./Profile.module.scss";
import {useSelector} from "react-redux";
import {getIsLookingForAJob, getUsersDescription} from "../../../bll/auth.selector";

type PropsType = {
	fullName: string | undefined
}

export const ProfileInfo = ({fullName}: PropsType) => {
	const lookingForAJob = useSelector(getIsLookingForAJob)
	const usersDescription = useSelector(getUsersDescription)


	return (
		<div className={s.userWrapper}>
			<h4 className={s.boxHeading}>General Info</h4>
			<p className={s.descWrapper}>
				<span className={s.desc}>Looking for a job: </span>
				<span className={s.descRes}>{lookingForAJob ? 'Nope' : 'Yes, I am)))'}</span>
			</p>
			<p className={s.descWrapper}>
				<span className={s.desc}>Description: </span>
				<span className={s.descRes}>{usersDescription}</span>
			</p>
			<p className={s.descWrapper}>
				<span className={s.desc}>Full Name: </span>
				<span className={s.descRes}>{fullName}</span>
			</p>
		</div>
	);
};
