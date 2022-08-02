import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faFullHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';
import { LocationService } from 'src/app/services/location.service';
import { Location } from '../../models/location.model';

@Component({
  selector: 'app-searched-location',
  templateUrl: './searched-location.component.html',
  styleUrls: ['./searched-location.component.scss'],
})
export class SearchedLocationComponent implements OnInit {
  faLocationDot = faLocationDot;
  faFullHeart = faFullHeart;
  faEmptyHeart = faEmptyHeart;
  @Input() locationResult!: Location;
  subscription!: Subscription;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
