export interface Acto{
    id : number;
    codigo_acto: string;
    nombre_acto: string;
    p_sellos: number;
    p_honorarios: number;
    min_honorarios: number;
    p_aportes: number;
    min_aportes: number;
    p_ganancias: number;
    p_iti: number;
}


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

export interface Escala{
    id : number;
    min: number;
    max: number;
    aporte_fijo: number;
    porcentaje_excedente: number;
}


export interface Escribania{
    id : number;
    nombre: string;
    matricula: number;
    gestor: number;
    p_rcd: number;
    min_rcd: number;
    imp_municipal: number;
    folio: number;
    certificado: number;
    min_diligenciamiento: number;
    min_valor_diligenciamiento: number;
    min_valor_honorario_escala: number;
    min_valor_escritura_he: number;
    p_honorario_escala_exedente: number;
    
}

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
    valorGanancia: number;
    valorIti: number;
    total: number;
}

