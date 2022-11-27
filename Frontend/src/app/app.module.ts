import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//INICIO Servicios

import { CargarScriptsService} from './servicios/cargar-scripts.service';

//FIN Servicios




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { HerramientasComponent } from './componentes/herramientas/herramientas.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    HerramientasComponent,
    ProyectosComponent,
    PiePaginaComponent,
    NavBarComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CargarScriptsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
