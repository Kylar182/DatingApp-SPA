import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Country } from 'src/app/_types/Country.enum';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  countryType: typeof Country = Country;

  constructor() { }

  ngOnInit() {
  }

}
