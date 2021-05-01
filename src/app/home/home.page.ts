import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, private ar: ActivatedRoute) { }

  ngOnInit() {
  }

  createaccount() {
    console.log("going??");
    this.router.navigate(["/create-account"])
  }

  signin() {
    this.router.navigate(["/sign-in"])
  }

  aboutus() {
    this.router.navigate(["/about"])
  }

}
