import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre:string;
  favoritos: Favorito[];
}

interface Favorito {
  id:number;
  nombre:string;
}


@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {



  @ViewChild("miFormulario") miFormulario! : NgForm;


  persona: Persona = {
    nombre: "Piero",
    favoritos: [
      {
        id:1,
        nombre:"uno"
      },
      {
        id:2,
        nombre:"dos"
      },
  ]
  };

  nuevoJuego : string = '';

  constructor() { }

  ngOnInit(): void {
  }

  guardar() {
    console.log("formulario posteado");
    console.log(this.miFormulario)
  }

  eliminar(index:number) {

    this.persona.favoritos.splice(index,1);

  }

  agregarJuego() {
    const nuevoFavorito : Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }

    this.persona.favoritos.push(nuevoFavorito);
  }



}
