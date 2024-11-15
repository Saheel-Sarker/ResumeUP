import { Component, inject } from '@angular/core';
import { JobsService } from '../jobs.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { debounceTime, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {
  jobsService = inject(JobsService)
  sanitizer = inject(DomSanitizer);
  selectedJob = this.jobsService.selectedJob;

  jobStatus: string = 'not-applied';  // Default state of the job
  private toggleSubject = new Subject<void>();
  private debounceDelay: number = 500;

  get sanitizedDescription(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.selectedJob()?.descriptionHtml || '');
  }

  ngOnInit(): void {
    // Subscribe to the debounce subject
    this.toggleSubject.pipe(debounceTime(this.debounceDelay)).subscribe(() => {
      console.log('Debounced update triggered'); // Debugging log
      this.updateJobStateInBackend();
    });
  }

  onToggleJobState(): void {
    const currentJob = this.selectedJob();
    if (currentJob) {
      let nextStatus: string;
      switch (currentJob.jobStatus) {
        case 'not-applied':
          nextStatus = 'favorite';
          break;
        case 'favorite':
          nextStatus = 'applied';
          break;
        case 'applied':
          nextStatus = 'not-applied';
          break;
        default:
          nextStatus = 'not-applied'; // Fallback to 'not-applied' if unknown
      }
      
      // Update the job status to the next one
      currentJob.jobStatus = nextStatus;
      this.toggleSubject.next(); // Trigger the debounce update
    }
  }

  private updateJobStateInBackend(): void {
    console.log('Selected job:', this.selectedJob()?.title);
    console.log('Job Status:', this.jobStatus);
    const jobId = this.selectedJob()?.id;
    if (jobId) {
      this.jobsService.updateJob(jobId, this.jobStatus);
    } else {
      console.warn('Job ID is undefined, skipping backend update'); // Debugging log
    }
  }
    
}
