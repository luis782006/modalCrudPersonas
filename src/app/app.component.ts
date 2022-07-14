import { Component } from '@angular/core';
import { PersonasService } from 'src/app/service/personas.service';
import {Persona} from '../app/Model/persona'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Modal';

  personas:Persona[];
  editar:string="Editar";
  eliminar:string="Eliminar";
  form:FormGroup;
  constructor( 
    private service:PersonasService, 
    private modalService:NgbModal,
    private formBuilder: FormBuilder
    )
    { 
      this.buildForm();
    }

    private buildForm(){
      this.form = this.formBuilder.group({
        id: [''],
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
      });
    }


  ngOnInit(): void {
    this.service.getPersonas().subscribe((data) => {
      this.personas = data;
    });

  }
  open(content) {
    this.modalService.open(content);
  }
  
  agregar(event:Event){
    event.preventDefault(); //cancelacion del metodo por default
    let personaAgregar:Persona;
   
    if (this.form.valid){
      personaAgregar = this.form.value;
        //httpClient agregar.
            this.service.addPersona(personaAgregar)
              .subscribe(data=>{ 
                alert("Perosna agregada");
            });
        //httpClient fin agregar
        window. location. reload()
    }else{
      this.form.markAllAsTouched();
    }
    this.modalService.dismissAll();
  }
  
  

}
