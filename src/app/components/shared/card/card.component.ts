import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { Location } from '../../../models/location.model';
import { DailyForecast } from '../../../models/dailyForecast.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() cards!: Location[] | DailyForecast[];
  @ContentChild(TemplateRef) customTemplateRef!: TemplateRef<any>;
}
