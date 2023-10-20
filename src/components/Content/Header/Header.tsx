import React from 'react';
import s from './Header.module.scss'
import {AuthContainer} from "./AuthContainer/AuthContainer";

export const Header = () => {

	return (
		<header className={s.header}>
			<p>Some logo</p>
			<AuthContainer/>
		</header>
	);
};
