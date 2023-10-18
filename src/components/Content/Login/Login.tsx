import React, {useEffect, useState} from 'react';
import s from './Login.module.scss'
import {CustomInputField} from "../CustomFields/CustomInputField/CustomInputField";
import {Link} from "react-router-dom";
import {PATH} from "../Content";
import {getCaptchaUrlTC, loginTC} from "../../../bll/auth.reducer";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth} from "../../../bll/auth.selector";
import {useFormik} from "formik";
import {LoginParamsType} from "../../../dal/auth-api";
import 'react-toastify/dist/ReactToastify.css';
import {CaptchaField} from "../CaptchaField/CaptchaField";

export const Login = () => {
	const dispatch = useDispatch()
	const isAuth = useSelector(getIsAuth)
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		!isAuth && dispatch(getCaptchaUrlTC())
	}, [isAuth, dispatch])

	const formik = useFormik({
		initialValues: {
			email: process.env.REACT_APP_EMAIL,
			password: process.env.REACT_APP_PASSWORD,
			rememberMe: true,
			captcha: '',
		},

		validate: (values) => {
			const errors: Partial<LoginParamsType> = {};
			if (!values.email) {
				errors.email = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}

			if (!values.password) {
				errors.password = 'Required'
			} else if (values.password.length < 3) {
				errors.password = 'Password length should be more than 3'
			}
			if (!values.captcha) {
				errors.captcha = 'Required';
			}
			return errors;
		},
		onSubmit: values => {
			setIsLoading(true);
			dispatch(loginTC(values));
			setIsLoading(false);
		}
	})

	// if (isAuth) {
	// 	return <Navigate to={'/profile'}/>
	// }

	return (
		<div className={s.loginWrapper}>
			<form onSubmit={formik.handleSubmit}>
				<div className={s.loginHeader}>
					<h3>Sign in</h3>
					<CustomInputField
						label={'Email'}
						touched={formik.touched.email}
						error={formik.errors.email}
						{...formik.getFieldProps('email')}
					/>
					<CustomInputField
						label={'Password'}
						touched={formik.touched.password}
						error={formik.errors.password}
						{...formik.getFieldProps('password')}
					/>
					<CaptchaField/>
					<div className={s.captchaInput}>
						<CustomInputField
							label={'Type the symbols above'}
							touched={formik.touched.captcha}
							error={formik.errors.captcha}
							{...formik.getFieldProps('captcha')}
						/>
					</div>

				</div>
				<div className={s.loginFooter}>
					<button
						type={'submit'}
						className={s.completeSignupButton}
						disabled={isLoading}
					>Login
					</button>
					<div className={s.loginFooterRedirect}>
						<p>Don't have an account?
							<Link to={PATH.SIGN_UP}> Sign up</Link>
						</p>
					</div>
				</div>
			</form>
		</div>

	)
		;
};
