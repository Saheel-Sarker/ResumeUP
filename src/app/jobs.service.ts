import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'

// const apiUrl = 'https://pf0kmkgv27.execute-api.us-east-2.amazonaws.com/Cors';
const apiUrl = 'https://07n5quah72.execute-api.us-east-2.amazonaws.com';

export interface JobPost {
  title: string;
  company: string;
  location: string;
  link: string;
  jobId: string;
  highlights: string;
  applicantsCount: number;
  jobPosterName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  jobPosts = signal<JobPost[]>([]);
  highlightsForShow = signal<String>('');
  http = inject(HttpClient);
  selectedID = signal<string>('');
  searchTerm = signal<string>('');
  maxApplicants = signal<number>(200);
  isLoading = signal<boolean>(false);
  
  constructor() { 
    this.getAll();
  }

// In your service, you can avoid returning the Observable
  getAll() {
    console.log("Fetching data from API...");
    this.http.get<JobPost[]>(`${apiUrl}/job-listings`).pipe(
      tap((data) => {
        this.jobPosts.set(data); // Update the signal with fetched data
      }),
      catchError((error) => {
        console.error("Error occurred while fetching data:", error); // Log the error
        return of([]); // Return an empty array in case of error to prevent breaking the app
      })
    ).subscribe(); // Subscribe to trigger the request

    console.log("past it");
  }                                                                          

  generateHighlights(description: string) {
    console.log("Generating highlights...");
    description = description.replace(/(\r\n|\n|\r)/g, " ");
    this.isLoading.set(true)
    return this.http.post<any>(`${apiUrl}/generate-highlights`, { description }).pipe(
      tap((data) => {
        this.highlightsForShow.set(data.highlights); // Return highlights as a string
        this.isLoading.set(false)
      }),
      catchError((error) => {
        console.error("Error occurred while generating highlights:", error);
        return of(''); // Return an empty string in case of error
      })
    ).subscribe() ;
  }

  deleteJob(jobId: string): void {
    console.log(`Deleting job with ID: ${jobId}`);
    this.http.delete(`${apiUrl}/job-listings/${jobId}`).pipe(
      tap(() => {
        console.log("Job deleted successfully");
        const updatedPosts = this.jobPosts().filter(job => job.jobId !== jobId);
        this.jobPosts.set(updatedPosts); // Update the signal with the locally filtered list
      }),
      catchError((error) => {
        console.error("Error occurred while deleting the job post:", error);
        return of(null); // Handle error appropriately
      })
    ).subscribe();
  }



}