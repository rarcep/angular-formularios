import { identifierModuleUrl } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}
interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;
  nuevoJuego: string = '';
  persona: Persona =  {
    nombre: 'Romeo',
    favoritos: [
      {id: 1, nombre: 'Metal Gear'},
      {id: 2, nombre: 'DeathStanding'}
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  eliminar(index: number) {
    this.persona.favoritos.splice(index, 1);
  }

  guardar(){
    console.log('Formulario postead');
    console.log(this.miFormulario);
  }

  agregar(){
    let index = this.persona.favoritos.length + 1;
    const nuevoFavorito: Favorito = {
      id: index,
      nombre: this.nuevoJuego
    }
    this.persona.favoritos.push({...nuevoFavorito});
    this.nuevoJuego = '';
  }

}
