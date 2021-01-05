import { Datos } from './formulario-edit/Datos';

export interface Actor{
    id : number;
    nombre_actor: string;
    id_acto: number;
    sellos: boolean;
    aporte: boolean;
    honorarios : boolean;
    iva: boolean;
    inscripcion: boolean;
    matricula: boolean;
    folios: boolean;
    certificados: boolean;
    municipal: boolean;
    diligenciamiento: boolean;
    rcd: boolean;
    ganancias: boolean;
    iti: boolean;
    total: number;
    
}