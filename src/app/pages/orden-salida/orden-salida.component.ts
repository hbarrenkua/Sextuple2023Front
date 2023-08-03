import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { combineLatest, interval, merge, startWith, switchMap } from 'rxjs';
import { IOAltura, IOOrdenSalida, IOPerro, IOTurno, Ordenes, Pruebas } from 'src/app/interfaces/ordenes.interfaces';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { PruebasService } from 'src/app/services/pruebas.service';

@Component({
  selector: 'app-orden-salida',
  templateUrl: './orden-salida.component.html',
  styleUrls: ['./orden-salida.component.scss']
})
export class OrdenSalidaComponent implements OnInit,AfterViewInit {


  ordenes!:Ordenes[];
  horarios:IOTurno[]=[];

  pruebas!:Pruebas[];

  currentTime!: Date;


  get turnos(){
    return Array.from(Array(2).keys()).map(x=>x+1)
  }
  @ViewChild('turno') turno!: MatSelect;
  @ViewChild('jornada') jornada!: MatSelect;
  hora! : string;

  constructor(private ordenesService:OrdenesService,
              private pruebasService:PruebasService) { }
  
  
  updateTime(): void {
    const now = new Date();
    if (!this.hora) return;
    const horaMinutos = this.hora.split(':')

    now.setHours(Number(horaMinutos[0])); // Establece la hora seleccionada
    now.setMinutes(Number(horaMinutos[1])); // Establece los minutos seleccionados
    now.setSeconds(0)
    this.currentTime =now;
  }
            

ngAfterViewInit(): void {
    const turno$ = this.turno.valueChange
    const jornada$ = this.jornada.valueChange
    
    jornada$.subscribe(jornada =>{

      if (!jornada)
        return

        this.ordenes = [];
        this.horarios=[];
        this.turno.value=null;
      this.ordenesService.getOrdenSalida(jornada).subscribe(ordenes=>{
        this.ordenes=ordenes
        console.log(ordenes)
        
      });


    })


    turno$.subscribe((turno)=>{

      if (!turno)
        return
      
        const ordenes=this.ordenes.filter(h=>h.horario==turno)
        


          ordenes.sort((a,b)=>{
            
            // Comparamos primero por NumeroPista
            // if (a.NumeroPista !== b.NumeroPista) {
            //   return a.NumeroPista - b.NumeroPista;
            // }
            // Si NumeroPista es igual, entonces comparamos por Orden
            return a.duracion - b.duracion;
          });
        
              for (let i = 0; i < ordenes.length; i++) {
                const perro = ordenes[i];
                let prev = null;
                let next = null;
              
                // Buscar el elemento anterior con el mismo "guiaId" y "orden" menor
                for (let j = i - 1; j >= 0; j--) {
                  if (ordenes[j].guiaId === perro.guiaId && ordenes[j].duracion <= perro.duracion) {
                    prev = ordenes[j].perroId;
                    break;
                  }
                }
              
                // Buscar el elemento siguiente con el mismo "guiaId" y "orden" mayor o igual
                for (let j = i + 1; j < ordenes.length; j++) {
                  if (ordenes[j].guiaId === perro.guiaId && ordenes[j].duracion >= perro.duracion) {
                    next = ordenes[j].perroId;
                    break;
                  }
                }
              
                // Añadir las propiedades "prev" y "next" al elemento actual
                perro.prevP = prev!;
                perro.nextP = next!;
              }
          const prev = ordenes.reduce((prev:IOTurno[],curr:Ordenes)=>{
    
            const {horario,
              NumeroPista,
              sesion, 
              Descripcion,
              IdMangaFusionada,
              IdManga,
              Grado, 
              ordenAltura,
              altura,
              perroId,
              nombrePerro,
              guiaId, 
              nombreGuia,
              orden,
              duracion,
              duracionfm,
              tiempo,
              ayuda,
              pendiente,
              prevP,
              nextP}= {...curr} ;
    
              const _turno:IOTurno = {
                NumeroPista,
                nombre:Descripcion,
                grado:Grado,
                turno:IdMangaFusionada*10 + parseInt(horario),
                IdManga,
                alturas:[],
                horario: parseInt(horario)
            }
            const _altura:IOAltura = {
              orden:ordenAltura,
              altura,
              perros:[],
              duracionfm,
              primerOrden:orden
            }
    
            const _perro:IOPerro = {
              id:perroId,
              nombre:nombrePerro,
              guiaId,
              nombreGuia,
              orden,
              mangaId:IdManga,
              duracion:duracion+duracionfm,
              tiempo,
              next:null,
              prev:null,
              ayuda,
              pendiente
          }
    
        //   const salgoAntes= [...ordenes].reverse().find((x)=>{
        //     return (x.guiaId===_perro.guiaId && x.orden<_perro.orden)
        // })
    
        
        // if (salgoAntes)
        // {
        //   prev.forEach((h)=>{
        //     h.alturas.forEach((a)=>{
        //       const p= a.perros.find((p)=>(p.id==salgoAntes.perroId))
        //       if(p)
        //       {
    
        //         _perro.prev=p
        //         p.next=_perro
        //       }
        //     })
        //   })
    
    
        // }
    
        const x = prev.find((p)=>(p.NumeroPista==NumeroPista && p.turno==IdMangaFusionada*10 + parseInt(horario) ))
    
        if(x){
            const y = x.alturas.find((a)=>(a.altura===altura))
            if(y)
            y.perros.push(_perro)
            else
            {
                _altura.perros.push(_perro)
                x.alturas.push(_altura)
                if (_altura.altura=='PRET')
                _perro.tiempo=_altura.duracionfm+_perro.tiempo;

                _perro.tiempo+=300
            }
        }
        else
            {
                _altura.perros.push(_perro)
                _turno.alturas.push(_altura)
                prev.push(_turno)
            }
        
        return prev
    
    
          },[])
    
          ordenes.forEach((curr)=>{
        
                
            const {NumeroPista, 
                   Descripcion,
                   Grado, 
                   ordenAltura,
                   altura,
                   IdManga,
                   IdMangaFusionada,
                   perroId,
                   nombrePerro,
                   guiaId, 
                   nombreGuia,
                   horario,
                   orden,
                   duracion,
                   duracionfm,
                   tiempo,
                   prevP,
                   nextP,
                  ayuda,
                pendiente}= {...curr} ;
      
            const _turno:IOTurno = {
                NumeroPista,
                nombre:Descripcion,
                grado:Grado,
                turno:IdMangaFusionada*10 + parseInt(horario),
                IdManga,
                alturas:[],
                horario: parseInt(horario)
            }
      
            const _altura:IOAltura = {
                orden:ordenAltura,
                altura,
                perros:[],
                duracionfm,
                primerOrden:orden
      
            }
            const _perro:IOPerro = {
                id:perroId,
                nombre:nombrePerro,
                guiaId,
                mangaId:IdManga,
                nombreGuia,
                orden,
                duracion,
                tiempo,
                next:null,
                prev:null,
                ayuda,
                pendiente
            }
      
      
     
    
            let perrobuscado!:IOPerro;
    
            prev.forEach((h)=>{
              h.alturas.forEach((a)=>{
                const p= a.perros.find((p)=>(p.id==_perro.id))
                if(p)
                {
                  perrobuscado=p
                }
              })
            })
    
    
      
            // const salgoAntes= [...horarios].reverse().find((x)=>{
            //   if (_perro.guiaId==610 && x.guiaId==610)
            //   {console.log('x',x)
            //   console.log(x.guiaId===_perro.guiaId && x.orden<=_perro.orden && x.perroId!=_perro.id)
            // }
      
            //   return (x.guiaId===_perro.guiaId && x.orden<=_perro.orden && x.perroId!=_perro.id)
            // })
      
      
            if (prevP)
            {
    
      
              
              prev.forEach((h)=>{
                h.alturas.forEach((a)=>{
                  const p= a.perros.find((p)=>(p.id==prevP))
                  if(p)
                  {
                    perrobuscado.prev=p
                  }
                })
              })
      
      
            }
                
            if (nextP)
            {
              prev.forEach((h)=>{
                h.alturas.forEach((a)=>{
                  const p= a.perros.find((p)=>(p.id==nextP))
                  if(p)
                  {
                    perrobuscado.next=p
                  }
                })
              })
      
      
            }
      
            
            
      
            })
    
    
          this.horarios=prev.sort((a,b)=>a.NumeroPista!-b.NumeroPista!);
          console.log (this.horarios)
    })
  }

  ngOnInit(): void {

    this.pruebasService.getPruebas().subscribe(pruebas=>this.pruebas=pruebas);

    this.updateTime(); // Actualizar la hora inmediatamente al cargar el componente

    // Configurar el intervalo para actualizar la hora cada minuto (60000 ms)
    interval(6000).subscribe(() => {
      this.updateTime();
      this.onMinuteChange(); // Llamar a la función cuando cambie de minuto
    });

  }

  onMinuteChange(): void {
    // Esta función se ejecutará cada vez que cambie de minuto.
    // Aquí puedes realizar las acciones que necesitas cuando ocurra ese cambio.


    if (this.horarios)
    this.horarios.forEach((t:IOTurno)=>{

      let duracion=0
      let tiempopreaplicado=0;
      t.alturas.forEach((a:IOAltura)=>{
        a.perros.map((p)=>{

          if (p.pendiente==1)

          {  duracion +=p.tiempo

            p.hora= new Date(this.currentTime.getTime() + duracion*1000);
          }
      })
    })
  })
  }

  reordenar(p:IOPerro){

    console.log("reordenar")
    const guiaId= p.guiaId;
  
    let perrosDelGuia:IOPerro[]=[]
    let orden:number = 1;
    let duracion:number=0;
  
    this.horarios.forEach((t:IOTurno)=>{
      orden=1;
      duracion=0;
      let tiempopreaplicado=0;
      t.alturas.forEach((a:IOAltura)=>{
        orden = a.primerOrden;
        a.perros.map((p)=>{
          p.orden=orden++
          
          if (p.tiempo>500)
            {
              p.tiempo=p.tiempo-a.duracionfm

            }
          if (p.tiempo>=300)
          {
            p.tiempo=p.tiempo-300
            console.log('primer perro antes' , p.nombreGuia,p.tiempo)

          }

          if(p.orden==a.primerOrden && duracion>0)
          {
            console.log('primer perro despues' , p.nombreGuia)
            p.tiempo+=300;
          }
          duracion +=p.tiempo
          if (tiempopreaplicado==0 && a.duracionfm>0)
            {
              duracion +=a.duracionfm
              p.tiempo=p.tiempo+a.duracionfm

              tiempopreaplicado=1
            }
          
          p.duracion = duracion
      })
        const x = a.perros.filter((p)=>(p.guiaId===guiaId))
        if (x)
        perrosDelGuia=perrosDelGuia.concat(x);
  
      })
    })
    perrosDelGuia.sort( (a, b) =>{
      if (a.duracion! > b.duracion!) {
        return 1;
      }
      if (a.duracion! < b.duracion!) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    for (let i=0;i<perrosDelGuia.length;i++)
      {
        perrosDelGuia[i].next= (i==perrosDelGuia.length-1)?null:perrosDelGuia[i+1]
        perrosDelGuia[i].prev =(i==0)?null:perrosDelGuia[i-1]
      }
      
      console.log(perrosDelGuia)
  
  }
  
  
  
  resalta(event:any){
    const {p,resalta}=event;
    const guiaId= p.guiaId;
    this.horarios.forEach((t:IOTurno)=>{
      t.alturas.forEach((a:IOAltura)=>{
        a.perros.map((pe)=>{pe.resaltado=false})
        const x = a.perros.filter((p)=>(p.guiaId===guiaId))
        if (x)
          x.map((p)=>{
              p.resaltado=resalta
          })
  
      })
    })
  }
  
  guardarOrden(){
  
  
    const horarios:IOOrdenSalida[]=this.horarios.reduce((prev:IOOrdenSalida[], curr:IOTurno)=>{
        curr.alturas.forEach((a)=>{
          a.perros.forEach((p)=>{
            const os:IOOrdenSalida={perroId:p.id,
                                    mangaId:p.mangaId,
                                    orden:p.orden}
            prev.push(os);
          })
        })
      return prev
    },[])

    console.log(horarios)
    this.ordenesService.guardarOrdenSalida(this.jornada.value,horarios).subscribe(console.log)
  
  
  }
  
  
  guardarOrdenManga(){
  
  
    const horarios:IOOrdenSalida[]=this.horarios.reduce((prev:IOOrdenSalida[], curr:IOTurno)=>{
        curr.alturas.forEach((a)=>{
          a.perros.forEach((p)=>{
            const os:IOOrdenSalida={perroId:p.id,
                                    mangaId:p.mangaId,
                                    orden:p.orden}
            prev.push(os);
          })
        })
      return prev
    },[])

    console.log(horarios)
    this.ordenesService.guardarOrdenSalidaUnica(this.jornada.value,horarios).subscribe(console.log)
  
  
  }
  
}
