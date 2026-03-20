import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SwalService {
  success(title: string, text = '') {
    Swal.fire({ icon:'success', title, text, timer:2000, timerProgressBar:true, showConfirmButton:false });
  }
  error(title: string, text = '') {
    Swal.fire({ icon:'error', title, text });
  }
  confirm(title: string, text: string, confirmText = 'Confirmar'): Promise<SweetAlertResult> {
    return Swal.fire({ icon:'question', title, text, showCancelButton:true,
      confirmButtonText: confirmText, cancelButtonText:'Cancelar', reverseButtons:true });
  }
  loading(title = 'Registrando...') {
    Swal.fire({ title, allowOutsideClick:false, didOpen:() => Swal.showLoading() });
  }
  close() { Swal.close(); }
}