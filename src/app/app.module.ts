import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdenSalidaComponent } from './pages/orden-salida/orden-salida.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { BloquePersonasComponent } from './components/bloque-personas/bloque-personas.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HorasMinutosSegundosPipe } from './pipes/horas-minutos-segundos.pipe';
import { RowHeightDirective } from './directives/row-height.directive';
import { PdfComponent } from './pages/pdf/pdf.component';
import { TelegramComponent } from './pages/telegram/telegram.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    OrdenSalidaComponent,
    BloquePersonasComponent,
    HorasMinutosSegundosPipe,
    RowHeightDirective,
    PdfComponent,
    TelegramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule ,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
