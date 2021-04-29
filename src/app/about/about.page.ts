import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private router: Router, private ar: ActivatedRoute) { }

  ngOnInit() {
  }

  back() {
      this.router.navigate(["/home"])
  }

}
