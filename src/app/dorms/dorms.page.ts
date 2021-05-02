import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { Observable } from 'rxjs';
import { Dorm } from '../modal/Dorm';

@Component({
  selector: 'app-dorms',
  templateUrl: 'dorms.page.html',
  styleUrls: ['dorms.page.scss']
})
export class DormsPage {

  private dorms: Observable<Dorm[]> = this.rs.getDorms();

  constructor(private rs: ReviewService, private router: Router) {
  }

  viewLocation() {
    this.router.navigate(["/map"])
  }

  back() {
    this.router.navigate(["/home"]);
  }

  viewDorm(dorm) {
    this.router.navigate(["/view-dorm-detail",dorm]);
  }

}
