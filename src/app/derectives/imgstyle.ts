import { Directive, ElementRef, HostListener, } from '@angular/core';

@Directive({
  selector: '[appImgstyle]'
})
export class Imgstyle {

  constructor(public eleRef:ElementRef)
   { 
    this.eleRef.nativeElement.style.border = '3px solid black';
    this.eleRef.nativeElement.style.borderRadius = '20px';
  }

    @HostListener('mouseover') mouseOver(){
        this.eleRef.nativeElement.style.boxShadow=('0 20px 30px black');
   }

   @HostListener('mouseleave') mouseLeave(){
        this.eleRef.nativeElement.style.boxShadow=`0 0 0 black`
   }

   ngOnChanges(): void {
    this.eleRef.nativeElement.style.border=`3px dotted yellow`}
}
