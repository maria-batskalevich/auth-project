import React from 'react';
import s from './SignUp.module.scss'
import {useSelector} from "react-redux";
import {getIsNationalityInit, getNationalities} from "../../../bll/auth.selector";
import {useFormik} from "formik";
import {useAppDispatch} from "../../../utills/hooks";
import {getAllNationalitiesTC} from "../../../bll/auth.reducer";
import {useEffect} from "react";
import {DateComponent} from "../../commons/DateComponent/DateComponent";
import {CustomInputField} from "../CustomFields/CustomInputField/CustomInputField";
import {CustomSelectField} from "../CustomFields/CustomSelectField/CustomSelectField";
import {Link} from "react-router-dom";
import {PATH} from "../Content";
import { useNavigate } from 'react-router-dom';


export type formikValuesType = {
	firstName: string,
	lastName: string,
	nationality: string,
	email: string,
	dateOfBirth: number,
	gender: string,
	password: string,
	confirmPassword: string,
	captcha: null,
}
const initialValues: formikValuesType = {
	firstName: '',
	lastName: '',
	nationality: '',
	email: '',
	dateOfBirth: 0,
	gender: 'male',
	password: '',
	confirmPassword: '',
	captcha: null,
}

export const SignUp = () => {
	const dispatch = useAppDispatch()
	const isNationalityInit = useSelector(getIsNationalityInit)
	const nationalities = useSelector(getNationalities)
	const navigate = useNavigate()

	const formik = useFormik({
		initialValues,
		validate: (values: formikValuesType) => {
			const errors: Partial<formikValuesType> = {}
				if (!values.firstName) {
					errors.firstName = 'Required'
				}
				if (!values.lastName) {
					errors.lastName = 'Required'
				}
				if (!values.nationality) {
					errors.nationality = 'Required'
				}
				if (!values.email) {
					errors.email = 'Required'
				} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
					errors.email = 'Invalid email address';
				}
				if (!values.password) {
					errors.password = 'Required'
				} else if (values.password.length < 3) {
					errors.password = 'Password length should be more than 3 symbols'
				}
				if (!values.confirmPassword) {
					errors.confirmPassword = 'Required'
				} else if (values.password !== values.confirmPassword) {
					errors.password = 'Passwords don\'t match,  please try again.'
				}
				return errors
		},
		onSubmit: (values: formikValuesType) => {
			console.log(123)
			alert(JSON.stringify(values))
			console.log(12345)
			// navigate('/login')
		}
	})

	const setBirthHandler = (time: number) => {
		formik.setValues({...formik.values, dateOfBirth: time})
	}

	useEffect(() => {
		if (!isNationalityInit) {
			const pr = dispatch(getAllNationalitiesTC())
		}
	}, [])

	const selectPlaceholder = isNationalityInit ? 'Set your nationality' : 'Loading...'

	return (
		<div className={s.signUpWrapper}>
			<div className={s.textWrapper}>
				<h3>New user?</h3>
				<p>Use the form below to create your account.</p>
			</div>
			<form className={s.formWrapper} onSubmit={formik.handleSubmit}>
				<div className={s.row}>
					<CustomInputField
						label='First Name'
						error={formik.errors.firstName}
						touched={formik.touched.firstName}
						{...formik.getFieldProps('firstName')}
					/>
					<CustomInputField
						label='Last Name'
						error={formik.errors.lastName}
						touched={formik.touched.lastName}
						{...formik.getFieldProps('lastName')}
					/>
				</div>
				<div className={s.row}>
					<div className={s.nationalityWrapper}>
						<CustomSelectField
							className={s.selectNationality}
							label='Nationality'
							disabled={!isNationalityInit}
							options={nationalities}
							iPlaceholder={selectPlaceholder}
							{...formik.getFieldProps('nationality')}
						/>
					</div>

					<CustomInputField
						label='Email'
						error={formik.errors.email}
						touched={formik.touched.email}
						{...formik.getFieldProps('email')}
					/>
				</div>

				<div className={s.row}>
					<DateComponent onChange={setBirthHandler}/>
					<div className={s.genderWrapper}>
						<label>Gender</label>
						<div className={s.genderFlexWrapper}>
							<input
								type='radio'
								id='male'
								name='gender'
								onChange={formik.handleChange}
								value='male'
								checked={formik.values.gender === 'male'}
							/>
							<label htmlFor="female">Male</label>
							<input
								type='radio'
								id='female'
								name='gender'
								onChange={formik.handleChange}
								value='female'
								checked={formik.values.gender === 'female'}
							/>
							<label htmlFor="female">Female</label>
						</div>
					</div>
				</div>
				<div className={s.row}>
					<CustomInputField
						label='Password'
						error={formik.errors.password}
						touched={formik.touched.password}
						{...formik.getFieldProps('password')}
					/>
					<CustomInputField
						label='Confirm password'
						error={formik.errors.confirmPassword}
						touched={formik.touched.confirmPassword}

						{...formik.getFieldProps('confirmPassword')}
					/>
				</div>

				<div className={s.footerSignup}>
					<p>Have an account? <Link to={PATH.LOGIN}>Login</Link></p>
					<button
						type={'submit'}
						className={s.completeSignupButton}>Complete Signup
					</button>
				</div>
			</form>
		</div>
	);
};

