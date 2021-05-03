import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ReviewService } from '../services/review.service';
import { Observable } from 'rxjs';
import { take, tap} from 'rxjs/operators';
import { Dorm } from '../modal/Dorm';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  private dorms: Observable<Dorm[]> = this.rs.getDorms();

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private router: Router,
    private rs: ReviewService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    let latLng = new google.maps.LatLng(34.0374295, -81.077653);
    let mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var bounds = new google.maps.LatLngBounds();

    var self = this;
    this.dorms.pipe(
      tap(dormArray => {
        dormArray.forEach(d => {
          self.addMarker(d.geopoint.latitude, d.geopoint.longitude, d.name);
          bounds.extend(new google.maps.LatLng(d.geopoint.latitude, d.geopoint.longitude));
          self.map.fitBounds(bounds);
        });
      }),
      // execute only once and complete the observable
      take(1)
    ).subscribe();
  }

  addMarker(lat : number, lon : number, name : string) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(lat, lon)
    });
    this.addInfoWindow(marker, name);
  }

  addInfoWindow(marker, content) {
    const infoWindow = new google.maps.InfoWindow({
      content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  returnDormList() {
    this.router.navigate(["/tabs/dorms"])
  }

}
