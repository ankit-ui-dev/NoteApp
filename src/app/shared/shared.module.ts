import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { RouterModule } from '@angular/router';
import { ToastsComponent } from './components/toasts/toasts.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './pipe/keyword/keyword/search.pipe';
import { ColorPipe } from './pipe/keyword/keyword/color.pipe';
import { SearchTagsPipe } from './pipe/keyword/keyword/search-tags.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    SideNavigationComponent,
    ToastsComponent,
    SearchPipe,
    ColorPipe,
    SearchTagsPipe,
    ClickOutsideDirective,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    HeaderComponent,
    SideNavigationComponent,
    ToastsComponent,
    SearchPipe,
    ColorPipe,
    SearchTagsPipe,
    ClickOutsideDirective,
  ],
})
export class SharedModule {}
