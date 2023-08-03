import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appRowHeight]'
})
export class RowHeightDirective implements OnChanges {
  @Input('appRowHeight') time!: number; // La propiedad de tiempo del perro
  private baseHeight = 40; // Altura base de la fila
  private timeMultiplier = 2; // Multiplicador para ajustar la altura según el tiempo (puedes ajustarlo según tus necesidades)

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['time']) {
      this.adjustRowHeight();
    }
  }

  private adjustRowHeight() {

    this.renderer.removeClass(this.el.nativeElement, "altoseparacion");
    this.renderer.removeClass(this.el.nativeElement, "alto90CA");
    this.renderer.removeClass(this.el.nativeElement, "alto75CA");
    this.renderer.removeClass(this.el.nativeElement, "alto60CA");

    let clase:string;

    switch(this.time)
    {
      case 90:
        clase = "alto90";
        break;
      case 75:
        clase = "alto75";
        break;
      case 60:
        clase = "alto60";
        break;
      case 390:
        clase= "alto90CA";
        break;
      case 375:
        clase = "alto75CA";
        break;
      case 360:
        clase = "alto75CA";
        break;
        default:
        clase= "altoseparacion"

    }

    // const clase = "alto" + (this.time>100?"separacion":this.time)


    this.renderer.addClass(this.el.nativeElement, clase);
  }
}