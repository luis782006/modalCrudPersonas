import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonasService } from 'src/app/service/personas.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListarComponent } from './componentes/listar/listar.component';
import { AddComponent } from './componentes/add/add.component'
import { FormGroup, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    AddComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    
  ],
  providers: [PersonasService],
  bootstrap: [AppComponent]
})
export class AppModule { 

 
}

