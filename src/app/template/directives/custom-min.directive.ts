import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
  selector: '[customMin] [ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CustomMinDirective,
    multi: true
  }]
})
export class CustomMinDirective implements Validator{

  @Input() minimo!: number;

  constructor() {
  }

  validate(control: FormControl) {
    const inptValue = control.value;
    return (inptValue < this.minimo) ? {'customMin': true} : null;
  }

}
