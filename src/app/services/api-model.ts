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
    honorarios: number;
    total: number;
}


export interface ActorEditable {
    actor: Actor;
    sello: number;
    hasSello : boolean;
    aporte: number;
    hasAporte: boolean;
    honorarios : number;
    hasHonorarios: boolean;
    iva: number;
    hasIva: boolean;
    inscripcion: number;
    hasInscripcion: boolean;
    matricula: number;
    hasMatricula: boolean;
    folios: number;
    hasFolios: boolean;
    certificados: number;
    hasCertificados: boolean;
    municipal: number;
    hasMunicipal: boolean;
    diligenciamiento: number;
    hasDiligenciamiento: boolean;
    rcd: number;
    hasRcd: boolean;
    ganancias: number;
    hasGanancias: boolean;
    iti: number;
    hasIti: boolean;
    total: number;
}