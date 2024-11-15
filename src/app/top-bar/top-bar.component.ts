import { Component, inject, signal } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  jobsService = inject(JobsService)
  searchTerm = this.jobsService.searchTerm
  maxApplicants = this.jobsService.maxApplicants
  filterApplied = this.jobsService.filterApplied
  filterNotApplied = this.jobsService.filterNotApplied
  filterFavorite = this.jobsService.filterFavorite
}
