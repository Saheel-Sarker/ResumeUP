import { Component, inject } from '@angular/core';
import { JobsService } from '../jobs.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {
  jobsService = inject(JobsService)
  sanitizer = inject(DomSanitizer);
  selectedJob = this.jobsService.selectedJob;

  get sanitizedDescription(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.selectedJob()?.descriptionHtml || '');
  }
}
