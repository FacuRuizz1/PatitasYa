import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  // Éxito
  success(message: string, title: string = '¡Éxito!') {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonColor: '#2196F3',
      confirmButtonText: 'Aceptar',
      timer: 3000,
      showConfirmButton: true
    });
  }

  // Error
  error(message: string, title: string = '¡Error!') {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Entendido'
    });
  }

  // Advertencia
  warning(message: string, title: string = '¡Atención!') {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      confirmButtonColor: '#FF9800',
      confirmButtonText: 'Aceptar'
    });
  }

  // Información
  info(message: string, title: string = 'Información') {
    return Swal.fire({
      icon: 'info',
      title: title,
      text: message,
      confirmButtonColor: '#2196F3',
      confirmButtonText: 'Entendido'
    });
  }

  // Confirmación (para eliminar, etc.)
  confirm(message: string, title: string = '¿Estás seguro?') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
  }

  // Carga (para procesos asíncronos)
  loading(message: string = 'Procesando...') {
    return Swal.fire({
      title: message,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  // Cerrar alerta de carga
  closeLoading() {
    Swal.close();
  }

  // Toast notificación (pequeña en esquina)
  toast(message: string, icon: 'success' | 'error' | 'warning' | 'info' = 'success') {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: icon,
      title: message
    });
  }
}
