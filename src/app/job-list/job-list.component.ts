import { Component, inject, OnInit } from '@angular/core';
import { title } from 'process';
import { JobPost, JobsService } from '../jobs.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit{
  private jobService = inject(JobsService)
  jobPosts = this.jobService.jobPosts
  selectedJob = this.jobService.selectedJob
  searchTerm = this.jobService.searchTerm
  maxApplicants = this.jobService.maxApplicants
  
  constructor(){}

  filteredJobs() {
    return this.jobPosts().filter(job =>
      job.title.toLowerCase().includes(this.searchTerm().toLowerCase()) &&
      job.applicantsCount <= this.maxApplicants()
    );
  }

  ngOnInit(): void {
    // this.jobService.getAll();
  }

  selectJob(job: JobPost) {
    if (job.jobId === this.selectedJob()?.jobId){
      this.selectedJob.set(null);
    } else {
      this.selectedJob.set(job);
    }
  }

  deleteJob(jobId: string) {
    this.jobService.deleteJob(jobId)
  }
}
