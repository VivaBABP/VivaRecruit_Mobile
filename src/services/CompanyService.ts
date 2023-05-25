import {CompanyControllerClient, CreateCompanyDto, GetCompanyDto, UpdateCompanyDto} from "../client/recruitBack";
import axiosApiInstance from "../configuration/axiosInstance";
import { URL } from "@env";

export class CompanyService{
    private companyClient = new CompanyControllerClient(URL, axiosApiInstance);

    setCompany(id: number, company: UpdateCompanyDto): Promise<void> {
        return this.companyClient.update(id.toString(), company)
    }

    findAll(): Promise<GetCompanyDto[]> {
        return this.companyClient.findAll();
    }

    findOne(id: string): Promise<GetCompanyDto> {
        return this.companyClient.findOne(id);
    }

    createCompany(company: CreateCompanyDto): Promise<void> {
        return this.companyClient.create(company);
    }
}