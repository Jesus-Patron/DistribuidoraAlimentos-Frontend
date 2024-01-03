export interface Usuario {
    id:number,
    nombre?:string,
    correo:string,
    contrasena:number,
    telefono?:number,
    idRol?:number,
    rolDescripcion?:string,
    estatus?:string
}
