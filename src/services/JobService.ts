import { URL } from "@env";
import {CreateApplyDto, CreateJobDTO, GetJobsDTO, JobsControllerClient, UpdateJobDTO} from "../client/recruitBack";
import axiosApiInstance from "../configuration/axiosInstance";

export class JobService {
  private jobClient = new JobsControllerClient(URL, axiosApiInstance)

  getJobs(): Promise<GetJobsDTO[]> {
    return this.jobClient.getJobs();
  }

  getAppliedJobs(): Promise<UpdateJobDTO[]> {
    return this.jobClient.getAppliedJobs();
  }

  applyJob(idJob: number): Promise<void> {
    return this.jobClient.applyJob({idJob} as CreateApplyDto);
  }

  deleteApplyJob(idJob: number): Promise<void> {
    return this.jobClient.deleteAppliedJob(idJob.toString());
  }
}