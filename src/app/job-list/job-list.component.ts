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
  private jobsService = inject(JobsService);
  jobPosts = this.jobsService.jobPosts;
  selectedJob = this.jobsService.selectedJob;
  searchTerm = this.jobsService.searchTerm;
  maxApplicants = this.jobsService.maxApplicants;
  filterApplied = this.jobsService.filterApplied;
  filterNotApplied = this.jobsService.filterNotApplied;
  filterFavorite = this.jobsService.filterFavorite;

  constructor(){}

  compareDates(a : string,b : string) {

  }

  filteredJobs() {
    // Start by filtering the job posts based on the search term and max applicants
    let filteredJobs = this.jobPosts().filter(job =>
      (job.title.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        job.descriptionHtml.toLowerCase().includes(this.searchTerm().toLowerCase())) &&
      job.applicantsCount <= this.maxApplicants()
    );
  
    // Apply job status filters (applied, not-applied, favorite)
    if (this.filterApplied()) {
      filteredJobs = filteredJobs.filter(job => job.jobStatus !== 'applied');
    }  
    if (this.filterNotApplied()) {
      filteredJobs = filteredJobs.filter(job => job.jobStatus !== 'not-applied');
    } 
    if (this.filterFavorite()) {
      filteredJobs = filteredJobs.filter(job => job.jobStatus !== 'favorite');
    }
  
    // Sort the filtered jobs based on the posted date
    filteredJobs = filteredJobs.sort((a, b) => {
      const dateA = new Date(a.postedAt);
      const dateB = new Date(b.postedAt);
      if (dateA < dateB) {
        return 1; // Newer posts should appear first
      } else if (dateA > dateB) {
        return -1; // Older posts should come after
      }
      return 0; // If dates are equal, keep the original order
    });
  
    return filteredJobs;
  }

  ngOnInit(): void {
    // this.jobService.getAll();
  }

  selectJob(job: JobPost) {
    if (job.id === this.selectedJob()?.id){
      this.selectedJob.set(null);
    } else {
      this.selectedJob.set(job);
    }
  }

  deleteJob(jobId: string) {
    this.jobsService.deleteJob(jobId)
  }
}
