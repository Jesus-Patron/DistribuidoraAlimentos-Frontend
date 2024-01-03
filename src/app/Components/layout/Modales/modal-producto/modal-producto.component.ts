import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Categoria } from 'src/app/Interfaces/categoria';
import { Producto } from 'src/app/Interfaces/productos';
import { Marca } from 'src/app/Interfaces/marca';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { ProductosService } from 'src/app/Services/productos.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { MarcasService } from 'src/app/Services/marcas.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent implements OnInit{
  formularioProducto:FormGroup;
  tituloAccion:string = "Agregar";
  botonAccion:string = "Guardar";
  listaCategorias: Categoria[] = [];
  listaMarcas: Marca[] = [];

  constructor(
    private modalActual: MatDialogRef<ModalProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProducto: Producto,
    private fb: FormBuilder,
    private _categoriaServicio: CategoriaService,
    private _marcaServicio: MarcasService,
    private _productoServicio: ProductosService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formularioProducto = this.fb.group({
      id: ['',Validators.required],
      nombre: ['',Validators.required],
      idCategoria: ['',Validators.required],
      idMarca: ['',Validators.required],
      descripcion: ['',Validators.required],
      stock: ['',Validators.required],
      costo: ['',Validators.required],
    });

    if(this.datosProducto != null){

      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

    this._categoriaServicio.lista().subscribe({
      next: (data) => {
        if(data.status) this.listaCategorias = data.value
      },
      error:(e) =>{}
    })

    this._marcaServicio.lista().subscribe({
      next: (data) => {
        if(data.status) this.listaMarcas = data.value
      },
      error:(e) =>{console.error(e);}
    })
  }

  ngOnInit(): void {
    if(this.datosProducto != null){
      this.formularioProducto.patchValue({
        id: this.datosProducto.id,
        nombre: this.datosProducto.nombre,
        idCategoria: this.datosProducto.idCategoria,
        idMarca: this.datosProducto.idMarca,
        descripcion: this.datosProducto.descripcion,
        stock: this.datosProducto.stock,
        costo: this.datosProducto.costo
      });

    }
  }

  realizarAccionProducto() {
    if (this.datosProducto == null) {
      this.guardarProducto();
    } else {
      this.editarProducto();
    }
  }

  guardarProducto() {
    const nuevoProducto: Producto = {
      id : this.formularioProducto.value.id,
      idCategoria: this.formularioProducto.value.idCategoria,
      descripcionCategoria: '',
      idMarca: this.formularioProducto.value.idMarca,
      nombreMarca: '',
      nombre : this.formularioProducto.value.nombre,
      descripcion: this.formularioProducto.value.descripcion,
      stock: this.formularioProducto.value.stock,
      costo  : this.formularioProducto.value.costo
    };
  
    this._productoServicio.guardar(nuevoProducto).subscribe({
      next: (data) => {
        if (data.status) {
          this._utilidadServicio.mostrarAlerta("No se pudo registrar el producto", "Error");
        } else {
          this._utilidadServicio.mostrarAlerta("El producto fue registrado", "Exito");
          this.modalActual.close("true");
        }
      },
      error: (e) => {
        console.error("No se pudo registrar el producto:", e);
      }
    });
  }
  
  editarProducto() {
    const productoEditado: Producto = {
      id : this.formularioProducto.value.id,
      idCategoria: this.formularioProducto.value.idCategoria,
      descripcionCategoria: '',
      idMarca: this.formularioProducto.value.idMarca,
      nombreMarca: '',
      nombre : this.formularioProducto.value.nombre,
      descripcion: this.formularioProducto.value.descripcion,
      stock: this.formularioProducto.value.stock,
      costo  : this.formularioProducto.value.costo
    };
  
    this._productoServicio.editar(productoEditado).subscribe({
      next: (data) => {
        if (data.status) {
          this._utilidadServicio.mostrarAlerta("El producto fue editado", "Exito");
          this.modalActual.close("true");
        } else {
          this._utilidadServicio.mostrarAlerta("No se pudo editar el producto", "Error");
        }
      },
      error: (e) => {
        console.error("No se pudo editar el producto", e);
      }
    });
  }
}
