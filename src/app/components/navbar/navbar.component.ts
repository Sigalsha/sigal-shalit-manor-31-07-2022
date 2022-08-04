import { Component, OnInit } from '@angular/core';
import { faHome, faHeart } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faHome = faHome;
  faHeart = faHeart;

  constructor() {}

  ngOnInit(): void {}
}
