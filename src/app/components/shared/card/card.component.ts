import {
  Component,
  OnInit,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { Location } from '../../../models/location.model';
import { DailyForecast } from '../../../models/dailyForecast.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() cards!: Location[] | DailyForecast[];
  // @Output() onGetCard: EventEmitter<any> = new EventEmitter();

  @ContentChild(TemplateRef) customTemplateRef!: TemplateRef<any>;

  // onGetCard(): void {}
}
