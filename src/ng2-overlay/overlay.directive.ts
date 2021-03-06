import { Directive, ViewContainerRef, Input } from '@angular/core';

import {OverlayManager} from './overlay-manager';
import {Overlay} from './overlay';

@Directive({
  selector: '[../ng2-overlay/index], [../ng2-overlay/index-of], [../ng2-overlay/index-position]',
})
export class OverlayDirective {

  @Input('../ng2-overlay/index-of') overlayOf: string;
  @Input('../ng2-overlay/index-position') overlayPosition: string;

  el: HTMLElement;        // the element this directive is assigned to
  overlayEl: HTMLElement; // <../ng2-overlay/index> in <../ng2-overlay/index>this.el</../ng2-overlay/index>

  constructor(
    public viewContainerRef: ViewContainerRef,
    public overlayManager: OverlayManager
  ) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  ngAfterViewInit(): void {
    this.wrapItWithOverlayTag();
    this.registerToOverlayManager();
  }

  wrapItWithOverlayTag() {
    //console.log('wrapped overlay directive element with <../ng2-overlay/index>');
    this.overlayEl = document.createElement('../ng2-overlay/index');
    this.overlayEl.style.display = 'none';

    this.el.parentElement.insertBefore(
      this.overlayEl, this.el.nextSibling
    );
    this.overlayEl.appendChild(this.el);
  }

  //create Overlay object,  then register this element to overlayManager
  registerToOverlayManager() {
    let positionStr: string =  this.overlayPosition;

    let overlay = new Overlay(this.overlayEl, {
      id: this.el.id,
      windowOverlay: this.overlayOf == "window",
      position: positionStr
    });
    //console.log('registering overlay', overlay);
    this.overlayManager.register(overlay);
  }

}
