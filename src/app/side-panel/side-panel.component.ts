import { Component, inject } from '@angular/core';
import { JobsService } from '../jobs.service';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePanelComponent {
    jobsService = inject(JobsService)
    jobPosts = this.jobsService.jobPosts;
    selectedJob = this.jobsService.selectedJob;
    highlightsForShow = this.jobsService.highlightsForShow;
    isLoading = this.jobsService.isLoading;
    pastedDescription = '';

    getJob() {
      return this.jobPosts().find(job => job.jobId === this.selectedJob()?.jobId);
    }

    generateHighlights() {
      this.jobsService.generateHighlights(this.pastedDescription.trim());
    }
}
