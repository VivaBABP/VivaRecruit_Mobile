import {CompanyTypeControllerClient, GetCompanyTypeDto, GetPanelDto} from "../client/recruitBack";
import axiosApiInstance from "../configuration/axiosInstance";
import { URL } from "@env";

export class CompanyTypeService {
    private companyTypeClient = new CompanyTypeControllerClient(URL, axiosApiInstance);

    getCompanyTypes(): Promise<GetCompanyTypeDto[]> {
        return this.companyTypeClient.findAll();
    }
}