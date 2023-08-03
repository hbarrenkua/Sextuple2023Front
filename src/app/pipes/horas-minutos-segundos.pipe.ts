import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horasMinutosSegundos'
})
export class HorasMinutosSegundosPipe implements PipeTransform {

  transform(value: number | Date): string {
    if (typeof value == 'number')
    {
    const horas = Math.floor(value / 3600);
    const minutos = Math.floor((value % 3600) / 60);
    const segundos = value % 60;

    const horasStr = String(horas).padStart(2, '0');
    const minutosStr = String(minutos).padStart(2, '0');
    const segundosStr = String(segundos).padStart(2, '0');

    return `${horasStr}:${minutosStr}:${segundosStr}`;
  }
  else
  {
    if (!(value instanceof Date)) {
      return '';
    }

    const hours = this.pad(value.getHours());
    const minutes = this.pad(value.getMinutes());
    const seconds = this.pad(value.getSeconds());

    return `${hours}:${minutes}:${seconds}`;

  }
  }
  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

}

