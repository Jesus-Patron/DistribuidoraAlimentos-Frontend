import { Injectable } from '@angular/core';
import { Menu } from '../Interfaces/menu';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {
// Define roles (podrían venir de una fuente externa o base de datos)
private roles: string[] = ['Administrador', 'Empleado','Supervisor'];

// Define menús permitidos por rol (podrían venir de una fuente externa o base de datos)
private menusPorRol: { [key: string]: string[] } = {
  Administrador: ['dashboard', 'usuarios', 'productos','venta','historial_venta','reporte_venta'],
  Empleado: ['productos', 'venta','historial_venta'],
  Supervisor: ['dashboard','historial_venta','reporte_venta']
};

// Verifica si el usuario tiene un rol específico
hasRole(role: string): boolean {
  return this.roles.includes(role);
}

// Obtiene la lista de menús permitidos para un rol específico
getMenusForRole(role: string): string[] {
  console.log('Menús por rol:', this.menusPorRol);
  return this.menusPorRol[role] || [];
}

// Convierte una lista de rutas en objetos Menu
convertirARutasConMenu(rutas: string[]): Menu[] {
  return rutas.map(ruta => ({ url: ruta, nombre: 'Nombre dinámico', icono: 'icono-dinamico' }));
}
}
