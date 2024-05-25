import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[appFocusWhenDisplayed]',
})
export class FocusWhenDisplayedDirective implements OnInit {
    constructor(private elementRef: ElementRef<HTMLElement>) {}

    ngOnInit(): void {
        this.elementRef.nativeElement.focus();
    }
}
