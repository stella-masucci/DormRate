import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { Observable } from 'rxjs';
import { Dorm} from '../modal/Dorm';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-dorms',
  templateUrl: 'dorms.page.html',
  styleUrls: ['dorms.page.scss']
})
export class DormsPage {

  private dorms: Observable<Dorm[]> = this.rs.getDorms();

  constructor(private rs: ReviewService, private router: Router) {
    this.rs.load();
  }

  viewLocation() {
    this.router.navigate(["/map"])
  }

  back() {
    this.router.navigate(["/home"]);
  }

  viewDorm() {
    this.router.navigate(["/view-dorm-detail"]);
  }

}
