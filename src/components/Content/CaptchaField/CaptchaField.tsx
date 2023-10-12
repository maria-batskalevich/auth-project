import React from 'react';
import s from "./CaptchaField.module.scss";
import loading from "../../../assets/images/loading.gif";
import {useDispatch, useSelector} from "react-redux";
import {getCaptchaUrl} from "../../../bll/auth.selector";
import {getCaptchaUrlTC} from "../../../bll/auth.reducer";

export const CaptchaField = () => {
	const captchaUrl = useSelector(getCaptchaUrl)
	const dispatch = useDispatch()

	const imageRefreshHandler = () => {
		dispatch(getCaptchaUrlTC())
	}

	return (
		<div className={s.captchaWrapper}>
			{captchaUrl
				? (
					<>
						<div style={{backgroundImage: `url("${captchaUrl}")`}} className={s.captcha}/>
						<button type="button" onClick={imageRefreshHandler}/>
					</>
				)
				: <img className={s.preloader} src={loading} alt='loading'/>}
		</div>
	);
};
