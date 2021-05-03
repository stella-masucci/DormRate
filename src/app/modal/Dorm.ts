import {Review} from '../modal/Review';
import {Observable} from 'rxjs';


export interface Dorm {
  id?: any;
  name: string;
  img: string;
  averagestars: number;
  description: string;
  geopoint: any;
  address: string;
  reviews: Observable<Review[]>;
  favoritedby: string[];
}
