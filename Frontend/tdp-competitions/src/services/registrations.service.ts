import editorsApi from "../api/axios";
import { EditorsEndpoints } from "../api/endpoints";
import type { IAddRegistrationRequest, IResponse } from "../models/api.models";
import type { IRegistration } from "../models/competitions.models";

export default class RegistrationsService {

    public static addRegistration = async (data: IAddRegistrationRequest, competitionId: string): Promise<IResponse<IRegistration>> => {
        const result = await editorsApi.post(EditorsEndpoints.addRegistration(competitionId), data);
        return result.data as IResponse<IRegistration>;
    }

    public static deleteRegistration = async (id: string): Promise<IResponse<boolean>> => {
        const data = await editorsApi.delete(EditorsEndpoints.deleteRegistration(id));
        return data.data as IResponse<boolean>;
    }
}