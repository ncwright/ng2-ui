import { Component, enableProdMode, ViewChild } from '@angular/core';
import {
  NG2_DIRECTIVES,
  Ng2MapComponent,
  OverlayManager,
  Ng2PopupComponent,
  Ng2MessagePopupComponent,
  Ng2ScrollableDirective
} from "ng2-ui";
import { HTTP_PROVIDERS } from '@angular/http';

console.log('ng2_directives', NG2_DIRECTIVES);
console.log('OverlayManager', OverlayManager);

@Component({
  selector: 'my-app',
  templateUrl: './app/app.tpl.html',
  directives: [ NG2_DIRECTIVES ],
  providers: [ HTTP_PROVIDERS, OverlayManager ]
})
export class AppComponent {
  id: string = 's1';

  constructor(public overlayManager: OverlayManager) {
    Ng2MapComponent.apiUrl = "https://maps.google.com/maps/api/js?key=AIzaSyCbMGRUwcqKjlYX4h4-P6t-xcDryRYLmCM";
  }

  scrollTo(selector, parentSelector, horizontal) {
    console.log('selector', selector, parentSelector, horizontal)
    Ng2ScrollableDirective.scrollTo(
      selector,       // scroll to this
      parentSelector, // scroll within (null if window scrolling)
      horizontal       // is it horizontal scrolling
      //10              // distance from top or left
    );
  }

  arrayOfKeyValues: any[] =
    [{key:1, name:'Key One'}, {key:2, name:'Key Two'}, {key:3, name:'Key Three'}, {key:4, name:'Key Four'}];

  @ViewChild(Ng2PopupComponent) popup: Ng2PopupComponent;

  openPopup(size, title) {
    this.popup.open(Ng2MessagePopupComponent, {
      classNames: size,
      title: title,
      message: "This is message given using popup.open()"
    });
  }
  
}
