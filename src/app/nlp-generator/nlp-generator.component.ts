import { Component, inject } from '@angular/core';
import { JobsService } from '../jobs.service';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-nlp-generator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nlp-generator.component.html',
  styleUrl: './nlp-generator.component.css'
})
export class NlpGeneratorComponent {
  jobsService = inject(JobsService)
  selectedJob = this.jobsService.selectedJob;
  highlightsForShow = this.jobsService.highlightsForShow;
  isLoading = this.jobsService.isLoading;
  pastedDescription = '';

  generateHighlights() {
    if (this.selectedJob()){
      this.pastedDescription = this.selectedJob()?.descriptionHtml || " ";
    }
    this.jobsService.generateHighlights(this.pastedDescription.trim());

  }
}
