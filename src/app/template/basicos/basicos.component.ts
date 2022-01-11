import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario! : NgForm;

  initForm = {
    producto: 'RTX 4080ti',
    precio: 5,
    existencias: 5
  }

  constructor() { }

  ngOnInit(): void {
  }

  // guardar( miFormulario: NgForm ) {
  guardar() {
    console.log( this.miFormulario.value );

    this.miFormulario.resetForm({
      producto: 'sin nombre',
      precio: 0,
      existencias: 0
    });
  }

  nombreValido() : boolean {
    return this.miFormulario?.controls.producto?.invalid &&
    this.miFormulario?.controls.producto?.touched
  }

  precioValido() : boolean {
    return this.miFormulario?.controls.precio?.touched 
            &&   this.miFormulario?.value.precio < 0 
  }

}
