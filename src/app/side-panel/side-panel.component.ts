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
    selectedID = this.jobsService.selectedID;
    highlightsForShow = this.jobsService.highlightsForShow;
    isLoading = this.jobsService.isLoading;
    pastedDescription = '';

    getJob() {
      return this.jobPosts().find(job => job.jobId === this.selectedID());
    }

    generateHighlights() {
      this.jobsService.generateHighlights(this.pastedDescription.trim());
    }
}
