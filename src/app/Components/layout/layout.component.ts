import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Menu } from 'src/app/Interfaces/menu';

import { MenuService } from 'src/app/Services/menu.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { AutorizacionService } from 'src/app/Services/autorizacion.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  listaMenus:Menu[] = [];
  nombreUsuario:string = '';
  correoUsuario:string = '';
  rolUsuario:string = '';
  estatusUsuario:string = '';

  constructor(
    private router:Router,
    private _menuServicio : MenuService,
    private _utilidadServicio : UtilidadService
  ) { }

  ngOnInit(): void {
    
    const usuario = this._utilidadServicio.obtenerSesionUsuario();

    if(usuario != null){

      this.nombreUsuario = usuario.nombre;
      this.correoUsuario = usuario.correo;
      this.rolUsuario = usuario.rolDescripcion;


      this._menuServicio.lista(usuario.id).subscribe({
        next: (data) =>{
          if(data.status) this.listaMenus = data.value;
        },
        error:(e)=>{}
      })

    }
  }
  

  cerrarSesion(){
    this._utilidadServicio.eliminarSesionUsuario();
    this.router.navigate(['login']);
  }
}
