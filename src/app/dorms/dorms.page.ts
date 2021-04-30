import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';
import {Observable} from 'rxjs';
import { Dorm} from '../modal/Dorm';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-dorms',
  templateUrl: 'dorms.page.html',
  styleUrls: ['dorms.page.scss']
})
export class DormsPage {

  private dorms: Observable<Dorm[]>;

//   dorms = [{name:"Bates House",averagestars:2,img:"https://sc.edu/about/offices_and_divisions/housing/images/grid_images/bateshouse255255.jpg"},
// {name:"650 Lincoln",averagestars:5, img:"https://sc.edu/about/offices_and_divisions/housing/images/grid_images/650lincoln255255.jpg"}]

  constructor(private rs: ReviewService) {
    this.rs.load();
  }

}
