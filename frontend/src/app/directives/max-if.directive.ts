import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appMaxIf]',
})
export class MaxIfDirective {
    @Input('appMaxIfValue') set updateMaxValue(maxValue: number | null) {
        this.maxValue = maxValue;
        this.checkAndToggleMaxValue();
    }
    @Input('appMaxIf') set updateIsMaxValueOn(isMaxValueOn: boolean) {
        this.isMaxValueOn = isMaxValueOn;
        this.checkAndToggleMaxValue();
    }

    isMaxValueOn: boolean = false;
    maxValue: number | null = null;

    checkAndToggleMaxValue(): void {
        if (this.isMaxValueOn && this.maxValue) {
            this.renderer.setAttribute(this.elementRef.nativeElement, 'max', this.maxValue.toString());
        } else {
            this.renderer.removeAttribute(this.elementRef.nativeElement, 'max');
        }
    }

    constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}
}
