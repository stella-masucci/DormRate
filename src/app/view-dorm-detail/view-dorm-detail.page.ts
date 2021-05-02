import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { Observable } from 'rxjs';
import { Dorm} from '../modal/Dorm';
import { Review } from '../modal/Review';
import {map, take,tap} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';

@Component({
  selector: 'app-view-dorm-detail',
  templateUrl: './view-dorm-detail.page.html',
  styleUrls: ['./view-dorm-detail.page.scss'],
})
export class ViewDormDetailPage implements OnInit {

 dorm=null;
  params={};

  constructor(private rs: ReviewService, private router: Router, private ar:ActivatedRoute,
  private af: AngularFirestore) { }

  ngOnInit() {
    this.ar.params.subscribe(
  		param=>{
  			this.dorm = param;
  		})
  }

  back() {
    this.router.navigate(["/tabs/dorms"]);
  }

}
