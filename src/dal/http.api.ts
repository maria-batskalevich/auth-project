import nationalityInstance from "./nationality.instance";
import {NationalityResponse} from "../models/nationality.response";

export class HttpApi {
	static async getAllNationality(): Promise<NationalityResponse> {
		return nationalityInstance.get<NationalityResponse>('all?fields=demonyms')
			.then(response => response.data)
	}
}