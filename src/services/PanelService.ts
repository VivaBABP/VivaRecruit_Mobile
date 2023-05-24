import {
    CreatePanelDto,
    GetPanelDto,
    PanelControllerClient,
    UpdatePanelDto
} from "../client/recruitBack";
import {URL} from "@env"
import axiosApiInstance from "../configuration/axiosInstance";

export class PanelService {
    private panelClient = new PanelControllerClient(URL,axiosApiInstance);


    add(panel: CreatePanelDto): Promise<void> {
        return this.panelClient.create(panel);
    }

    updatePanel(id: string,panel: UpdatePanelDto): Promise<void> {
        return this.panelClient.update(id,panel);
    }

    delete(id: string): Promise<void> {
        return this.panelClient.remove(id);
    }

    findAll(): Promise<GetPanelDto[]> {
        return this.panelClient.findAll();
    }

    findOne(id:string): Promise<GetPanelDto> {
        return this.panelClient.findOne(id);
    }

    suggest(): Promise<GetPanelDto[]> {
        return this.panelClient.getSuggestionParcours();
    }

}