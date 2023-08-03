import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenSalidaComponent } from './pages/orden-salida/orden-salida.component';
import { PdfComponent } from './pages/pdf/pdf.component';
import { TelegramComponent } from './pages/telegram/telegram.component';

const routes: Routes = [

  {
    path:'orden',
    component: OrdenSalidaComponent
  
  },
  {
    path:'pdf',
    component: PdfComponent
  
  },
  {
    path:'telegram',
    component: TelegramComponent
  
  },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
