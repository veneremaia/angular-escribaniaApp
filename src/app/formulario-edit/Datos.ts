import { Acto } from '../Acto';

export interface Datos{
    nombreCliente : string;
    nombreActo : string;
    id_acto : number;
    valor: number;
    valorSello: number;
    honorarios: number;
    aportes: number;
    iva: number;
    certificado: number;
    municipal: number;
    diligenciamiento: number;
    rcd: number;
    inscripcion: number;
    matricula: number;
    folios: number;
}