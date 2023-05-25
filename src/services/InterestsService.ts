import { URL } from "@env";
import axiosApiInstance from '../configuration/axiosInstance';
import { InterestControllerClient } from './../client/recruitBack';
import { AddInterestDto, GetInterestDto } from './../client/recruitBack';

export class InteretsService {
    private interests = new InterestControllerClient(URL, axiosApiInstance);

    addInterestToAccount(addInterestDTO: AddInterestDto): Promise<void> {
        return this.interests.addInterestToAccount(addInterestDTO);
    }

    findall(): Promise<GetInterestDto[]> {
        return this.interests.findAll();

    }

    getInterestFromAccount(): Promise<GetInterestDto[]> {
        return this.interests.getInterestFromAccount();
    }
    
    deleteInterestToAccount(AddInterestDTO: AddInterestDto): Promise<void> {
        return this.interests.deleteInterestOfAccount(AddInterestDTO);
    }
}