import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
  standalone: false,
})
export class AlumnosPage implements OnInit {
  alumnos: any[]=[];
  loading: boolean = true;

  constructor(private api: ApiService, private route: Router,
    private alertController: AlertController, private storage: Storage) { }


  async ngOnInit() {
    await this.storage.create();
    try {
      const token = await this.storage.get('token');
      if (!token) {
        this.route.navigateByUrl('/login');
        return;
      }

      this.alumnos = await this.api.getAlumnosAsignados(token);
      this.loading = false;

      if (this.alumnos.length === 0) {
        this.api.presentToast('No tienes alumnos asignados', 'warning');
      }

      console.log('Alumnos cargados:', this.alumnos);
    } catch (error) {
      this.loading = false;
      console.error('Error al cargar alumnos:', error);
      this.api.presentToast('Error cargando alumnos', 'danger');
    }
  }

irLlegue(alumno: any) {
  this.route.navigate(['/llegue'],{
    state: { alumno }
  });
}


  //cerrar sesion
  async cerrarSesion() {
    await this.api.logout();
      this.route.navigateByUrl('/login', { replaceUrl: true });
  }

}

  // Función para ver detalle de un alumno
// verDetalle(alumno: any) {
//   // redirige a la vista "Llegué" pasando los datos del alumno
//   this.route.navigate(['/llegue'], { state: { alumno } });
// }
  // Función para ir a la página "Llegué" con el alumno seleccionado
  // irLlegue(alumno: any) {
  //   this.route.navigate(['/llegue'], { state: { alumno } });
  // }


// async ngOnInit() {
//     await this.storage.create();
//     try {
//       const token = await this.storage.get('token');
//       if (!token) {
//         this.route.navigateByUrl('/login');
//         return;
//       }

//       this.alumnos = await this.api.getAlumnosAsignados(token);
//       this.loading = false;

//       if (this.alumnos.length === 0) {
//         this.api.presentToast('No tienes alumnos asignados', 'warning');
//       }
//     } catch (error) {
//       this.loading = false;
//       console.error('Error al cargar alumnos:', error);
//       this.api.presentToast('Error cargando alumnos', 'danger');
//     }
//   }

//   // Función para ver detalle de un alumno
//   verDetalle(alumno: any) {
//     this.route.navigate(['/detalle-alumno'], {
//       state: { alumno }
//     });
//   }





