import React from 'react';
import s from "./Profile.module.scss";

export const contacts = {
	github: 'https://github.com/maria-batskalevich',
	linkedIn: 'https://www.linkedin.com/in/maria-batskalevich-18b289230/'
}

export const ProfileContacts = () => {

	return (
		<div className={s.userWrapper}>
			<h4 className={s.boxHeading}>Contacts & Socials</h4>
			{Object.entries(contacts).map((el) => {
				return <p className={s.descWrapper} key={Math.random()}>
					<span className={s.desc}>{`${el[0]}:`}</span>
					<span className={s.descRes}><a href={el[1]} target='_blank'>{el[0]}</a></span>
				</p>
			})
			}
		</div>
	);
};

