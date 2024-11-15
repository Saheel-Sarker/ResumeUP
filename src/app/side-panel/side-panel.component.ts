import { Component, inject } from '@angular/core';
import { JobsService } from '../jobs.service';
import { JobDetailsComponent } from "../job-details/job-details.component";
import { NlpGeneratorComponent } from "../nlp-generator/nlp-generator.component";

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [JobDetailsComponent, NlpGeneratorComponent],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePanelComponent {
    jobsService = inject(JobsService)
    selectedJob = this.jobsService.selectedJob;
}
