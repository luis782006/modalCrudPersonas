import { Component, OnInit } from '@angular/core';

import { NgbActiveModal, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NgModule } from '@angular/core';
import { Persona } from 'src/app/Model/persona';
import { PersonasService } from 'src/app/service/personas.service';
import {
  FormGroup,
  FormControlName,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  mpersona: any;
  personas: Persona[];
  editar: string = 'Editar';
  eliminar: string = 'Eliminar';
  objeto: any;
 
  /* minombre=new FormControl('',[Validators.required, Validators.maxLength(10), Validators.minLength(4)]); */

  form: FormGroup;
  constructor(
    private service: PersonasService,
    private modalService: NgbModal,
    private addPersonaService: PersonasService,
    private formBuilder: FormBuilder
  ) {

    this.buildForm();
  }

  ngOnInit(): void {
    this.service.getPersonas().subscribe((data) => {
      this.personas = data;
    });
  }

  //Representacion del fromulario.
  private buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
    });
  }
  //abrir un modal. parametro personas para llenar los campos del formulario dentro del modal
  // parametro modal para instanciar el modalService
  mostrarPersona(persona:Persona, modal) {
    this.mpersona = persona;
    this.modalService.open(modal);
     //cargo los campos de formulario
    this.form.get('id').setValue(this.mpersona.id);
    this.form.get('nombre').setValue(this.mpersona.nombre);
    this.form.get('apellido').setValue(this.mpersona.apellido);
    
  }
  //cierre de modal
  cerrarModal(modal) {
    this.modalService.dismissAll(modal);
  }

  //evento actualizar
   save(event: Event) {
    event.preventDefault(); //cancelacion del metodo por default
    let personaActaulizada:Persona;
   
    if (this.form.valid){
      personaActaulizada = this.form.value;
        //httpClient actualizar.
            this.service.actualizarPersona(personaActaulizada)
              .subscribe(data=>{console.log("Edicion con exito");
            this.ngOnInit();
            });
        //httpClient fin actualizar
        
    }else{
      this.form.markAllAsTouched();
    }
    this.modalService.dismissAll();
  }
  //evento eliminar.
  eliminarPersona(persona:Persona){
    this.service.eliminarPersona(persona)
      .subscribe(data=>{console.log("Persona eliminada");
      this.ngOnInit();
      alert("Persona eliminada");
    });
  }
 

  //fin de bloque.
}
