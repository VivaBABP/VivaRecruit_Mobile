import {URL} from "@env"
import {
    AddInterestDto,
    AddInterestPanelDto,
    GetInterestDto,
    InterestControllerClient,
    PanelControllerClient
} from "../client/recruitBack";
import axiosApiInstance from "../configuration/axiosInstance";

export class InterestService {
    private standClient = new InterestControllerClient(URL, axiosApiInstance);
    addInterest(interest: AddInterestDto): Promise<void> {
        return this.standClient.addInterestToAccount(interest);
    }

    addInterestToPanel(interest: AddInterestPanelDto): Promise<void> {
        return this.standClient.addInterestToPanel(interest);
    }

    findAllPanel(): Promise<GetInterestDto[]> {
        return this.standClient.findAll();
    }

    findOnePanel(id: string): Promise<GetInterestDto> {
        return this.standClient.findOne(id);
    }

    deleteInterestOfAccount(interest: AddInterestDto): Promise<void> {
        return this.standClient.deleteInterestOfAccount(interest);
    }

    removeInterestOfPanel(interest: AddInterestPanelDto): Promise<void> {
        return this.standClient.removeInterestOfPanel(interest);
    }
}