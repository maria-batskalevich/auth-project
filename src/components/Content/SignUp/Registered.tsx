import React from "react";
import s from "./SignUp.module.scss";


export const Registered = () => {
	return (
		<div>
			<div className={s.registered}>
				<h3>Thank You!</h3>
				<p>you registered!</p>
			</div>
				{/*<FooterSignUp/>*/}
		</div>
	)
}