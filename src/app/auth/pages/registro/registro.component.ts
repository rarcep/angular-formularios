import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPatter)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmar: ['', [Validators.required]]
  }, {
    validators: [this.validatorService.camposIguales('password', 'confirmar')]
  });
  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.required) {
      return 'Email es obligatorio';
    } else if(errors?.pattern) {
      return 'Email deber ser válido!';
    } else if(errors?.emailTomado) {
      return 'Email en uso, elige otro por favor!';
    }
    return '';
  };

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Romeo Arce',
      email: 'test1@test.com',
      username: 'romeook',
      password: '123456',
      confirmar: '123456',
    })
  }

  campoNovalido(campo:string) {
    return this.miFormulario.get(campo)?.invalid &&
            this.miFormulario.get(campo)?.touched;
  }

  submitFormularios() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
