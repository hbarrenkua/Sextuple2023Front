import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Subscription, interval, take } from 'rxjs';
import { Pruebas } from 'src/app/interfaces/ordenes.interfaces';
import { PruebasService } from 'src/app/services/pruebas.service';
import { TelegramService } from 'src/app/services/telegram.service';

@Component({
  selector: 'app-telegram',
  templateUrl: './telegram.component.html',
  styleUrls: ['./telegram.component.scss']
})
export class TelegramComponent implements OnInit {

  pruebas!:Pruebas[];

  intervalo$!: Subscription;

  mensajeriaArrancada:boolean=false;

  ultimoMensaje!:any;

  get turnos(){
    return Array.from(Array(2).keys()).map(x=>x+1)
  }
  @ViewChild('turno') turno!: MatSelect;
  @ViewChild('jornada') jornada!: MatSelect;




  constructor(private pruebasService:PruebasService,
    private telegramService:TelegramService) { }

  ngOnInit(): void {
    this.pruebasService.getPruebas().subscribe(pruebas=>this.pruebas=pruebas);
  }


  iniciarMensajeria(){
    const turno=this.turno.value
    const jornada=this.jornada.value
    this.mensajeriaArrancada=true

    this.intervalo$ = interval(30000)
      .subscribe(() => {
        // Aquí ejecutas tu función cada 5 minutos
        this.telegramService.actualizarTelegram(jornada, turno).subscribe(x => this.ultimoMensaje=x);
      });
      


  }

  detenerMensajeria()
  {
    this.mensajeriaArrancada=false
    if (this.intervalo$) {
      this.intervalo$.unsubscribe();
    }
  }
  ngOnDestroy() {
    // Asegúrate de desuscribirte cuando el componente se destruya para evitar fugas de memoria
    if (this.intervalo$) {
      this.intervalo$.unsubscribe();
    }
  }
}
