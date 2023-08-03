import { CdkDragDrop, moveItemInArray, CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { IOAltura, IOPerro } from '../../interfaces/ordenes.interfaces';

@Component({
  selector: 'app-bloque-personas',
  templateUrl: './bloque-personas.component.html',
  styleUrls: ['./bloque-personas.component.scss']
})
export class BloquePersonasComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<any>;
  @Input() altura!:IOAltura;
  @Input() resaltados:IOPerro[]=[];
  @Output() ordenCambiado = new EventEmitter();
  @Output() resaltaMismoGuia = new EventEmitter();
  displayedColumns: string[] = ['orden','nombreGuia','nombre','duracion','hora'];

  constructor() { }

  ngOnInit(): void {
  }

  
  onListDrop(event: CdkDragDrop<string[]>) {
    // Swap the elements around
    moveItemInArray(this.altura.perros, event.previousIndex, event.currentIndex);
    
    this.altura.perros.forEach((p, idx) => {

      if (event.currentIndex==idx){
        this.reordenar(p);
        this.resaltaMismoGuia.emit({p,resalta:false});
      }
      
      });

    this.table.renderRows();
  }


  reordenar(p:IOPerro){

    this.ordenCambiado.emit(p);
  }

  getClaseCSS(altura:string){

        return `altura${altura}`


  }

  // resaltar(p:IOPerro){

  //   let bg:string='';
    
  //   let  distSig:number=999;
  //   let  distPrev:number=999;
  //   if (p.next && !p.resaltado)
  //      distSig= Math.abs(p.next.orden-p.orden)
  //   if (p.prev &&  !p.resaltado)
  //      distPrev=Math.abs(p.orden-p.prev.orden)
  //   const dist =Math.min(distSig,distPrev)

  //   if (dist <15 && dist!=999)
  //     bg= `background-color:rgba(216, 40, 40, ${(15-dist)/15});`
    
  // return bg

  // }


  resaltar(p:IOPerro){

    let bg:string='';
    
    let  distSig:number=9999;
    let  distPrev:number=9999;
    if (p.next && !p.resaltado)
       distSig= Math.abs(p.next.duracion!-p.duracion!)
    if (p.prev &&  !p.resaltado)
       distPrev=Math.abs(p.duracion!-p.prev.duracion!)
    const dist =Math.min(distSig,distPrev)

    if (dist <900 && dist!=9999)
      bg= `background-color:rgba(216, 40, 40, ${1 - (dist - 1) / (900 - 1) * 0.75});`
    
    if (bg==='')
    {
      if (p.ayuda)
        bg=`background-color:rgba(35, 133, 22, 0.5);`
    }
  return bg

  }
  resalta(p:IOPerro,resalta:boolean) 
  {

  this.resaltaMismoGuia.emit({p,resalta});

  }
}
