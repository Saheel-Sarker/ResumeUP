import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobListComponent } from "./job-list/job-list.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { SidePanelComponent } from "./side-panel/side-panel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JobListComponent, TopBarComponent, SidePanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ResumeUP';
}
