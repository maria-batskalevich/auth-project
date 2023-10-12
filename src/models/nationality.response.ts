type NationalityLanguagesType = {
	f: string,
	m: string
};

type NationalityType = {
	demonyms: {
		eng: NationalityLanguagesType,
		fra: NationalityLanguagesType
	}
}

export type NationalityResponse = Array<NationalityType>;