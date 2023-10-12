import React, {useState} from 'react';
import s from './DateComponent.module.scss'
import {ChangeEvent, useEffect} from "react";
import {v1} from "uuid";

type DateComponentPropsType = {
	onChange: (time: number) => void
}

export const DateComponent: React.FC<DateComponentPropsType> = ({onChange}) => {

	enum Month {
		JANUARY = "January",
		FEBRUARY = "February",
		MARCH = "March",
		APRIL = "April",
		MAY = "May",
		JUNE = "June",
		JULY = "July",
		AUGUST = "August",
		SEPTEMBER = "September",
		OCTOBER = "October",
		NOVEMBER = "November",
		DECEMBER = "December",
	}

	const [day, setDay] = useState<number>(28);
	const [month, setMonth] = useState<Month>(Month.MAY);
	const [year, setYear] = useState<number>(1990);

	const isLeapYear = (!(year % 4) && !!(year % 100)) || (!(year % 4) && !(year % 100) && !(year % 400))

	let maxDay = 31;
	if (month === Month.APRIL || month === Month.JUNE || month === Month.SEPTEMBER || month === Month.NOVEMBER) {
		maxDay = 30
	}
	if (month === Month.FEBRUARY && isLeapYear) {
		maxDay = 29
	}
	if (month === Month.FEBRUARY && !isLeapYear) {
		maxDay = 28
	}


	const days = [...Array(maxDay)].map((d, i) => i + 1);
	const daysOptionsToRender = days.map(d => <option key={v1()} value={d}>{d}</option>)
	const onChangeDayHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		setDay(+e.currentTarget.value)
	}

	const months = Object.values(Month);
	const monthOptionsToRender = months.map(m => <option key={v1()} value={m}>{m}</option>);
	const onChangeMonthHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		setMonth(e.currentTarget.value as Month)
	}
	const minYear = 1900;
	const maxYear = new Date().getFullYear();
	const years = [];
	for (let i = minYear; i <= maxYear; i++) {
		years.push(i)
	}
	const yearsOptionsToRender = years.map(y => <option key={v1()} value={y}>{y}</option>)
	const onChangeYearHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		setYear(+e.currentTarget.value)
	}

	useEffect(() => {
		const monthIndex = months.indexOf(month)
		const time = new Date(year, monthIndex, day).getTime()
		onChange(time)
	}, [day, month, year])

	return (
		<div className={s.dateComponentWrapper}>
			<label htmlFor="day">Date of Birth</label>
			<div className={s.selectDataWrapper}>
				<select name="day" id="day" value={String(day)} onChange={onChangeDayHandler}>{daysOptionsToRender}</select>
				<select name="month" id="month" value={month} onChange={onChangeMonthHandler}>{monthOptionsToRender}</select>
				<select name="year" id="year" value={String(year)} onChange={onChangeYearHandler}>{yearsOptionsToRender}</select>
			</div>

		</div>
	);
};

