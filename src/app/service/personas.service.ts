import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Persona } from '../Model/persona';


@Injectable({
  providedIn: 'root'
})
export class PersonasService {
 
  
  constructor(private servicio:HttpClient) { }

  url='http://localhost:8080/personas';

  //lista todas las personas
  getPersonas(){
    return this.servicio.get<Persona[]>(this.url+'/listar');
  } 
  //busca personas por ID
  getPersonaId(id:any){
    return this.servicio.get<Persona>(this.url+'/buscar/'+id);
  }
  addPersona(persona:Persona){
    return this.servicio.post<Persona>(this.url+"/crear",persona);
  }
  //actualiza la persona
  actualizarPersona(persona:Persona){ 
    return this.servicio.put<Persona>(this.url+"/editar/"+persona.id,persona);
  }
  //elimina la persona.
  eliminarPersona(persona:Persona){
    return this.servicio.delete(this.url+"/eliminar/"+persona.id);
  }
}
