import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { emailPattern, nombreApellidoPattern } from 'src/app/shared/validator/validaciones';
import { noPuedeSerStrider } from '../../../shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';
import { UserNameValidatorService } from 'src/app/shared/validator/username-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  //TODO: Mover este método



  get emailErroMsg () :string {
    
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.required){
      return 'Email es obligatorio';
    }
    if(errors?.pattern){
      return 'El correo no cumple con el patron de un correo';
    }
    if(errors?.emailTomado){
      return 'Correo tomado, ingrese otro';
    }

    return '';
  }


  get NombreErrorMsg () :string {
    
    const errors = this.miFormulario.get('nombre')?.errors;
    if(errors?.required){
      return 'El nombre es obligatorio';
    }
    if(errors?.pattern){
      return 'El nombre no cumple con el formato (Nombre Apellido)';
    }

    return '';
  }


  get userNameErrorMsg () :string {
    
    const errors = this.miFormulario.get('username')?.errors;
    if(errors?.required){
      return 'El username es obligatorio';
    }
    if(errors?.userNameTomado){
      return 'El usuario ingresado ya está registrado';
    }
    if(errors?.noStrider){
      return 'El usuario no pueder ser "Strider"';
    }

    return '';
  }

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider], [this.userValidator] ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, ]],

  },{
    validators:[this.validatorService.camposIguales('password', 'password2')]
  })

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator:EmailValidatorService,
    private userValidator:UserNameValidatorService
  ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: "Piero Aldaves",
      email: "test1@test.com",
      username: "Piero656",
      password: "123456",
      password2: "123456",
    })
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
  }


  // emailRequired() {
  //   return this.miFormulario.get('email')?.errors?.required &&
  //     this.miFormulario.get('email')?.touched
  // }

  // emailPattern() {
  //   return this.miFormulario.get('email')?.errors?.pattern &&
  //     this.miFormulario.get('email')?.touched
  // }

  // emailTomado() {
  //   return this.miFormulario.get('email')?.errors?.emailTomado &&
  //     this.miFormulario.get('email')?.touched
  // }





  submitFormulario() {
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

}
