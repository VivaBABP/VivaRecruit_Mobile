import { URL } from "@env";
import { CreateJobDTO, JobsControllerClient, UpdateJobDTO } from "../client/recruitBack";
import axiosApiInstance from "../configuration/axiosInstance";

export class JobService {
  private jobClient = new JobsControllerClient(URL, axiosApiInstance)

  getJobs(): Promise<UpdateJobDTO[]> {
    return this.jobClient.getJobs();
  }

  getAppliedJobs(): Promise<CreateJobDTO[]> {
    return this.jobClient.getAppliedJobs();
  }
}