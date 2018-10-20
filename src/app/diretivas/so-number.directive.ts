import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[soNumero]'
})
export class SoNumberDirective {

  constructor(private element: ElementRef) { 
    this.element.nativeElement.value = this.element.nativeElement.value.replace(/\D/g,"");
  }
  
  @HostListener('keyup')
  keyUp() {
    this.element.nativeElement.value = this.element.nativeElement.value.replace(/\D/g,"");
  }

  @HostListener('blur')
  blur() {    
    this.element.nativeElement.value = this.element.nativeElement.value.replace(/\D/g,"");
  }

  @HostListener('keyress')
  keyPress() {    
    this.element.nativeElement.value = this.element.nativeElement.value.replace(/\D/g,"");
  }

}
