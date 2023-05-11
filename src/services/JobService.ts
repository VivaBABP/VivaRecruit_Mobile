import { URL } from '@env';
import { CreateJobDTO, JobsClient } from './../client/recruitBack';
import axiosApiInstance from '../configuration/axiosInstance';
export class JobService {
  private jobsClient = new JobsClient(URL, axiosApiInstance)

  createJob(createJobDTO: CreateJobDTO): Promise<void> {
    return this.jobsClient.jobs(createJobDTO);
  }

}