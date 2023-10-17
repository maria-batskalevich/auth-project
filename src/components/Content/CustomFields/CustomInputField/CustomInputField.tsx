import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from './CustomInputField.module.scss'
// import s from '../../SignUp/SignUp.module.scss'
import {v1} from "uuid";


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type FormikInputFieldProps = DefaultInputPropsType & {
	label?: string
	touched?: boolean
	error?: string
};
export const CustomInputField = (props: FormikInputFieldProps) => {
	let {id, label, touched, error, className, style, ...inputProps} = props;
	const rootClassName = className ? `${s.fieldWrapper} ${className}` : s.fieldWrapper
	// debugger

	id = id || v1();
	// debugger

	return (
		// <div className={s.fieldWrapper}>
		<div className={rootClassName} style={style}>
			{label && <label htmlFor={id}>{label}</label>}
			<input id={id} {...inputProps}/>
			<div className={touched && error ? s.error : ''}>
				{touched && error}
			</div>

		</div>
	);
};

