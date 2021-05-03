import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { Observable } from 'rxjs';
import { filter,map } from 'rxjs/operators';
import { Dorm } from '../modal/Dorm';

@Component({
  selector: 'app-dorms',
  templateUrl: 'dorms.page.html',
  styleUrls: ['dorms.page.scss']
})
export class DormsPage {

  private dorms: Observable<Dorm[]> = this.rs.getDorms();
  private dormsBackup: Observable<Dorm[]>;

  constructor(private rs: ReviewService, private router: Router) {
    this.dormsBackup = this.dorms;

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

  async filterList(evt) {
  this.dorms = this.dormsBackup;
  const searchTerm = evt.srcElement.value;
  if (!searchTerm || searchTerm=='') {
    return;
  }
  else {
    this.dorms = this.dormsBackup.pipe(map((dorms: any[]) => dorms.filter(d => {
          var name = d.name.toLowerCase();
          if(name.includes(searchTerm.toLowerCase()))
          {return d;}
        }))
    );
  }
}

// getDormByName(name: string) {
//   return this.dorms.pipe(map(dorms => dorms.filter(d => d.name.includes(name))));
// }


  // filterMe(name:string) {
  //   // console.log('searchterm', this.searchTerm);
  //   // this.searchText = '';
  //   // if (this.searchTerm != null) {
  //   //   this.searchText = this.searchTerm.toLowerCase();
  //   // } else {
  //   //   this.searchText = '';
  //   // }
  //
  //
  //   this.dorms.pipe(map((dorms: any[]) => dorms.filter(d => {
  //         if ((d.name.toString().toLowerCase().indexOf(name)) > -1)
  //         { return d;
  //         }
  //       }))
  //   );
  //
  //   // console.log('results - after', this.dorms;
  //
  // }









}
