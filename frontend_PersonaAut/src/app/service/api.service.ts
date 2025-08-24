import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage-angular';
import axios from 'axios';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url= environment.urlapi;

  constructor(
    private storage: Storage,
    private toastController: ToastController) {
    this.storage.create();
  }


  // ------------------------------
  // INICIAR SESION
  // ------------------------------
  async login(data: any) {
    const res = await axios.post(this.url + '/auth/local', data);
    return res.data; // devuelve jwt y user
  }

  // ------------------------------
  // USUARIO AUTENTICADO
  // ------------------------------
   async getMe(token: string) {
     const res = await axios.get(this.url + '/users/me?populate=*', {
       headers: { Authorization: 'Bearer ' + token }
     });
     return res.data;
  }

  // ------------------------------
  // ALUMNOS ASIGNADOS PARA PA
  // ------------------------------
  async getAlumnosAsignados(token: string, pagina: number = 1, porPagina: number = 25) {
    const start = (pagina - 1) * porPagina;
    const url = `${this.url}/alumnos?populate[foto]=true&pagination[limit]=${porPagina}&pagination[start]=${start}&populate[persona_autorizada]=*`;
    const res: any = await axios.get(url, {
      headers: { Authorization: 'Bearer ' + token }
    });

    return res.data.data;
  }

  // ------------------------------
  // REGISTRAR LLEGADA
  // ------------------------------
  async registrarLlegada(token: string, data: any) {
    const res = await axios.post(this.url + '/llegadas', {
      data: data
    }, {
      headers: { Authorization: 'Bearer ' + token }
    });
    return res.data;
  }

  // ------------------------------
  // CANCELAR LLEGADA
  // ------------------------------

   async cancelarLlegada(token: string, llegadaId: string) {
     const res = await axios.put(this.url + `/llegadas/${llegadaId}`, {
       data: { estado: 'Cancelada' }
     }, {
       headers: { Authorization: 'Bearer ' + token }
     });
     return res.data;
  }

  // ------------------------------
  // TOKEN STORAGE
  // ------------------------------
  async saveToken(token: string) {
    await this.storage.set('token', token);
  }

  async getToken() {
    return await this.storage.get('token');
  }


  // ------------------------------
  // TOASTS
  // ------------------------------
  async presentToast(message: string, color: string = 'dark') {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom',
      color,
    });
    toast.present();
  }

  // ------------------------------
  // CAMBIAR CONTRASEÑA
  // ------------------------------
async changePassword(token: string, currentPassword: string, newPassword: string) {
  const res = await axios.post(this.url + '/auth/change-password', {
    currentPassword,
    // newPassword
    password: newPassword,
    passwordConfirmation: newPassword
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

  //Cerrar sesion
  async logout() {
    await this.storage.remove('token');
    this.presentToast('Sesión cerrada', 'success');
  }

}
