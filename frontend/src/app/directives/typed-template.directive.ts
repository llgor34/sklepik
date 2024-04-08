import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: 'ng-template[typedTemplate]',
})
export class TypedTemplateDirective<T> {
    @Input() typedTemplate!: T;

    constructor(private templateRef: TemplateRef<T>) {}

    static ngTemplateContextGuard<T>(dir: TypedTemplateDirective<T>, ctx: unknown): ctx is T {
        return true;
    }
}
