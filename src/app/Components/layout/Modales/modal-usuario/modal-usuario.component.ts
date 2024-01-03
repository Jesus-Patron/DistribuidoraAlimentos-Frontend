import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Roles } from 'src/app/Interfaces/roles';
import { Usuario } from 'src/app/Interfaces/usuarios';

import { RolService } from 'src/app/Services/roles.service';
import { UsuarioService } from 'src/app/Services/usuarios.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit{
  formularioUsuario:FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion:string = "Agregar";
  botonAccion:string = "Guardar";
  listaRoles: Roles[] = [];

  constructor(
    private modalActual: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: Usuario,
    private fb: FormBuilder,
    private _rolServicio: RolService,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formularioUsuario = this.fb.group({
      id : ['',Validators.required],
      nombre : ['',Validators.required],
      correo : ['', [Validators.required, Validators.pattern(/^(.+)@(outlook\.com|hotmail\.com|gmail\.com)$/)]],
      contrasena : ['',[Validators.required, Validators.minLength(3)]],
      telefono : ['',[Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      idRol : ['',Validators.required],
      estatus : ['',Validators.required],
    });

    if(this.datosUsuario != null){

      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

    this._rolServicio.lista().subscribe({
      next: (data) => {
        if(data.status) this.listaRoles = data.value
      },
      error:(e) =>{}
    })
  }

  ngOnInit(): void {
    if(this.datosUsuario != null){

      this.formularioUsuario.patchValue({
        id : this.datosUsuario.id,
        nombre : this.datosUsuario.nombre,
        correo : this.datosUsuario.correo,
        contrasena : this.datosUsuario.contrasena,
        telefono : this.datosUsuario.telefono,
        idRol : this.datosUsuario.idRol,
        estatus: this.datosUsuario.estatus
      })

    }
  }

  realizarAccionUsuario() {
    if (this.datosUsuario == null) {
      this.guardarUsuario();
    } else {
      this.editarUsuario();
    }
  }

  /*guardarEditar_Usuario(){

    const _usuario: Usuario = {
      id: this.datosUsuario == null ? 0 : this.datosUsuario.id,
      nombre: this.formularioUsuario.value.nombre,
      correo: this.formularioUsuario.value.correo,
      contrasena : this.formularioUsuario.value.contrasena,
      telefono : this.formularioUsuario.value.telefono,
      idRol: this.formularioUsuario.value.idRol,
      rolDescripcion  : "",
      estatus: this.formularioUsuario.value.estatus
    }

    if(this.datosUsuario == null){

      this._usuarioServicio.guardar(_usuario).subscribe({
        next: (data) =>{
          if(data.status){
            this._utilidadServicio.mostrarAlerta("No se pudo registrar el usuario","Error")
          }else
            this._utilidadServicio.mostrarAlerta("El usuario fue registrado","Exito");
            this.modalActual.close("true")
        },
        error:(e) => {
          console.error("No se pudo registrar el usuario:", e);
        }
      })

    }else{

      this._usuarioServicio.editar(_usuario).subscribe({
        next: (data) =>{
          if(data.status){
            this._utilidadServicio.mostrarAlerta("El usuario fue editado","Exito");
            this.modalActual.close("true")
          }else
            this._utilidadServicio.mostrarAlerta("No se pudo editar el usuario","Error")
        },
        error:(e) => {
          console.error("No se pudo editar al usuario", e);
        }
      })
    }
  }*/
  
  guardarUsuario() {
    const nuevoUsuario: Usuario = {
      id: this.formularioUsuario.value.id,
      nombre: this.formularioUsuario.value.nombre,
      correo: this.formularioUsuario.value.correo,
      contrasena: this.formularioUsuario.value.contrasena,
      telefono: this.formularioUsuario.value.telefono,
      idRol: this.formularioUsuario.value.idRol,
      rolDescripcion: "",
      estatus: this.formularioUsuario.value.estatus
    };
  
    this._usuarioServicio.guardar(nuevoUsuario).subscribe({
      next: (data) => {
        if (data.status) {
          this._utilidadServicio.mostrarAlerta("No se pudo registrar el usuario", "Error");
        } else {
          this._utilidadServicio.mostrarAlerta("El usuario fue registrado", "Exito");
          this.modalActual.close("true");
        }
      },
      error: (e) => {
        console.error("No se pudo registrar el usuario:", e);
      }
    });
  }
  
  editarUsuario() {
    const usuarioEditado: Usuario = {
      id: this.formularioUsuario.value.id,
      nombre: this.formularioUsuario.value.nombre,
      correo: this.formularioUsuario.value.correo,
      contrasena: this.formularioUsuario.value.contrasena,
      telefono: this.formularioUsuario.value.telefono,
      idRol: this.formularioUsuario.value.idRol,
      rolDescripcion: "",
      estatus: this.formularioUsuario.value.estatus
    };
  
    this._usuarioServicio.editar(usuarioEditado).subscribe({
      next: (data) => {
        if (data.status) {
          this._utilidadServicio.mostrarAlerta("El usuario fue editado", "Exito");
          this.modalActual.close("true");
        } else {
          this._utilidadServicio.mostrarAlerta("No se pudo editar el usuario", "Error");
        }
      },
      error: (e) => {
        console.error("No se pudo editar al usuario", e);
      }
    });
  }
}
