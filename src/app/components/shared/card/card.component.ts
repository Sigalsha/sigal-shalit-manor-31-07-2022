import {
  Component,
  OnInit,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() cards: any[] = [];
  // @Output() onGetCard: EventEmitter<any> = new EventEmitter();

  @ContentChild(TemplateRef) customTemplateRef!: TemplateRef<any>;

  // onGetCard(): void {}
}
