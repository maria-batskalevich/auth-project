import React, {DetailedHTMLProps, SelectHTMLAttributes} from 'react';
import {v1} from "uuid";

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
type FormikSelectFieldProps = DefaultSelectPropsType & {
	label?: string,
	options: string[],
	iPlaceholder? : string
};

export const CustomSelectField = (props: FormikSelectFieldProps) => {
	let {id, label, options, iPlaceholder, ...selectProps} = props;

	id = id || v1();

	const optionsToRender = options.map(n => <option key={n} value={n}>{n}</option>)

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<select id={id} {...selectProps}>
				<option value="" hidden>{iPlaceholder}</option>
				{optionsToRender}
			</select>
		</div>
	);
};

