import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent{

  @Input() public toggleMenu: boolean = true;

  constructor() { }

}
