export interface Pruebas {
    Numero: number;
    nombre: string;
}


export interface Ordenes {
    orden:        number;
    jornada:      number;
    NumeroPista:  number;
    sesion:       number;
    IdManga:      number;
    IdMangaFusionada: number;
    Tipo:         number;
    Grado:        Grado;
    Descripcion:  Descripcion;
    altura:       Altura;
    perroId:      number;
    guiaId:       number;
    nombreGuia:   string;
    nombrePerro:  string;
    club:         string;
    SaltaEnOtra:  number;
    RepiteEnEsta: number;
    horario:      string;
    orden_salida: number;
    ordenAltura:  number;
    prevP?:number|null,
    nextP?:number|null,
    duracion:number,
    tiempo:number,
    duracionfm:number,
    ayuda:string,
    pendiente:number

}

export enum Descripcion {
    AgilityGradoII = "Agility Grado II",
    AgilityGradoIII = "Agility Grado III",
    AgilityGradoIManga1 = "Agility Grado I Manga 1",
    AgilityGradoIManga2 = "Agility Grado I Manga 2",
    JumpingGradoII = "Jumping Grado II",
    JumpingGradoIII = "Jumping Grado III",
    PreAgilityManga1 = "Pre-Agility Manga 1",
}

export enum Grado {
    Gi = "GI",
    Gii = "GII",
    Giii = "GIII",
    PA = "P.A.",
}

export enum Altura {
    L = "L",
    M = "M",
    S = "S",
    T = "T",
    X = "X",
    PRES = "PRES",
    PRET = "PRET"
}


export interface IOTurno { //no se si llamarle turno, jornada, horario
    nombre?:  string;
    NumeroPista?: number;
    grado?:   string;
    turno:   number;
    alturas: IOAltura[];
    horario: number;
    IdManga: number;
}

export interface IOAltura {
    orden?:  number;
    altura?: string;
    perros: IOPerro[];
    duracionfm:number;
    primerOrden:number;
}


export interface IOPerro {
    id:         number;
    nombre?:     string;
    guiaId?:     number;
    nombreGuia?: string;
    mangaId:number;
    orden:      number;
    prev:       IOPerro|null;
    next:       IOPerro|null;
    resaltado?:  boolean;
    duracion?:number;
    tiempo:number;
    ayuda:string;
    hora?:Date;
    pendiente:number;
}



export interface IOOrdenSalida{
    perroId:number,
    orden:number,
    mangaId:number

    }

export    interface MangaEntry {
        mangaId: number;
        Prueba: number;
        jornadaId: number;
        Grado: string;
        Nombre: string;
        Descripcion: string;
        alturas: string;
      }
      