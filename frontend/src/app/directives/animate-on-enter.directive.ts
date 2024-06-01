import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { animate, inView } from 'motion';
import { AnimationName } from '../interfaces/animation-name.interface';

@Directive({
    selector: '[appAnimateOnEnter]',
})
export class AnimateOnEnterDirective implements OnInit {
    @Input() delay: number = 0;
    @Input() animationName: AnimationName = 'fadeAndScaleIn';

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        switch (this.animationName) {
            case 'fadeAndScaleIn':
                this.fadeAndScaleIn();
                break;

            case 'fadeIn':
                this.fadeIn();
                break;
        }
    }

    private fadeAndScaleIn() {
        animate(
            this.elementRef.nativeElement,
            { scale: [0, 1], opacity: [0, 1] },
            { duration: 0.5, delay: this.delay / 1000 }
        );
    }

    private fadeIn() {
        animate(this.elementRef.nativeElement, { opacity: [0, 1] }, { duration: 0.5, delay: this.delay / 1000 });
    }
}
