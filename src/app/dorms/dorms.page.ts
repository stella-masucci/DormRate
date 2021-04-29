import { Component } from '@angular/core';


@Component({
  selector: 'app-dorms',
  templateUrl: 'dorms.page.html',
  styleUrls: ['dorms.page.scss']
})
export class DormsPage {

  dorms = [{name:"Bates House",averagestars:2,img:"https://sc.edu/about/offices_and_divisions/housing/images/grid_images/bateshouse255255.jpg"},
{name:"650 Lincoln",averagestars:5, img:"https://sc.edu/about/offices_and_divisions/housing/images/grid_images/650lincoln255255.jpg"}]

  constructor() {}

}
