import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appStatus]',
  standalone: true,
})
export class StatusDirective implements OnChanges {
  @Input() appStatus: string = '';

  constructor(private elementRef: ElementRef) {
    this.changeBackground();
  }

  ngOnChanges() {
    this.changeBackground();
  }

  changeBackground() {
    switch (this.appStatus) {
      case 'ACTIVE':
      case 'ACCEPTED':
        this.elementRef.nativeElement.style.background = 'green';
        break;
      case 'INACTIVE':
      case 'REJECTED':
        this.elementRef.nativeElement.style.background = 'red';
        break;
      case 'SCHEDULED':
      case 'PENDING':
        this.elementRef.nativeElement.style.background = 'orange';
        break;
      case 'STARTED':
        this.elementRef.nativeElement.style.background = 'blue';
        break;
      case 'FINISHED':
        this.elementRef.nativeElement.style.background = 'purple';
        break;
      default:
        this.elementRef.nativeElement.style.background = 'black';
        break;
    }
  }
}
