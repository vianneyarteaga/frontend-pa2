import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {


  username = '';
  password = '';

  constructor(private api: ApiService,
    private route: Router,
    private alertController: AlertController,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    await this.storage.create();
  }

  //loginn
  async login() {
    if (!this.username || !this.password) {
      return this.presentAlert('Campos incompletos', 'Ingresa usuario y contraseña.');
    }
    try {
      const data = { identifier: this.username, password: this.password };
      const res: any = await this.api.login(data);
      await this.storage.set('token', res.jwt);
      await this.storage.set('user', res.user);
      console.log('Usuario autenticado:', res.user);

      // para abrir alert para cambiar contraseña tras login
      this.changePasswordAlert();

      this.route.navigateByUrl('/alumnos');

    } catch (err) {
      console.error('Error en login:', err);
      this.presentAlert('Error', 'Usuario o contraseña incorrectos.');
    }
  }

  // alert clasico
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // metodo para cambiar contraseña
async changePasswordAlert() {
  const alert = await this.alertController.create({
    header: 'Cambiar contraseña',
    message: 'Por seguridad, cambia tu contraseña después de iniciar sesión.',
    inputs: [
      { name: 'currentPassword', type: 'password', placeholder: 'Contraseña actual' },
      { name: 'newPassword', type: 'password', placeholder: 'Nueva contraseña' }
    ],
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Guardar',
        handler: async (data) => {
          if (!data.currentPassword || !data.newPassword) return false;

          try {
            const token = await this.storage.get('token');
            if (!token) {
              await this.presentAlert('Error', 'No estás autenticado');
              return false;
            }

            await this.api.changePassword(token, data.currentPassword, data.newPassword);
            await this.presentAlert('Éxito', 'Contraseña cambiada correctamente');
            return true;
          } catch (err) {
            console.error(err);
            await this.presentAlert('Error', 'No se pudo cambiar la contraseña');
            return false;
          }
        }
      }
    ],
    cssClass: 'custom-alert'
  });

  await alert.present();
}
}


  //   async presentAlert(header: string, message: string) {
  //   const alert = await this.alertController.create({
  //     header,
  //     message,
  //     buttons: ['OK']
  //   });
  //   await alert.present();
  // }}




  //loginn
  //   async login() {
  //   if (!this.username || !this.password) {
  //     return this.presentAlert('Campos incompletos', 'Ingresa usuario y contraseña.');
  //   }
  //   try {
  //     const data = { identifier: this.username, password: this.password };
  //     const res: any = await this.api.login(data);
  //     await this.storage.set('token', res.jwt);
  //     await this.storage.set('user', res.user);
  //     console.log('Usuario autenticado:', res.user);

  //     this.route.navigateByUrl('/alumnos');

  //   } catch (err) {
  //     console.error('Error en login:', err);
  //     this.presentAlert('Error', 'Usuario o contraseña incorrectos.');
  //   }
  // }
//       async presentAlert(header: string, message: string) {
//     const alert = await this.alertController.create({
//       header,
//       message,
//       buttons: ['OK']
//     });
//     await alert.present();
//   }
// }
