import preloader from "../../../assets/images/loadingBook.svg";
import React from "react";
import s from './Preloader.module.scss'

export const Preloader = () => {

	return(
		<div className={s.preloaderWrapperStyles}>
			<img src={preloader} alt={'Loading'}/>
		</div>
	)
}