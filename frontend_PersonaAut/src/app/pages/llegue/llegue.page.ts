import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-llegue',
  templateUrl: './llegue.page.html',
  styleUrls: ['./llegue.page.scss'],
  standalone: false,
})
export class LleguePage implements OnInit {
  user: any;
  // llegadaId: string = ''; // ID de la llegada a cancelar
  // token: string = '';
  //  alumno: any;
  // pa: any = null;
  // paNombreCompleto = '';

  constructor(private api: ApiService,
    private storage: Storage, private route: Router
  ) { }

// async ngOnInit() {
//   const token = await this.storage.get('token');
//   this.user = await this.api.getMe(token);

//   // Recibir datos de navegación
//   const state = history.state;
//   if (state.llegadaId) {
//     this.llegadaId = state.llegadaId;
//   } else {
//     console.error('No se encontró llegadaId');
//   }
// }

//   // Cancelar llegada
// async cancelarLlegada() {
//   const token = await this.storage.get('token');
//   if (!this.llegadaId) return this.api.presentToast('No se pudo cancelar la llegada', 'danger');

//   await this.api.cancelarLlegada(token, this.llegadaId);
//   this.api.presentToast('Aviso cancelado', 'warning');
//   this.route.navigate(['/alumnos']);
// }


//   goAlumnos() {
//     this.route.navigate(['/alumnos']);
//   }

//   async cerrarSesion() {
//     await this.api.logout();
//     this.route.navigateByUrl('/login', { replaceUrl: true });
//   }
// }
alumno: any = {};
token: string = '';
timerId: any;

     async ngOnInit() {
      const navigation = this.route.getCurrentNavigation();
      if (navigation?.extras.state) {
        this.alumno = navigation.extras.state;
        console.log('Alumno recibido:', this.alumno);
        }
        const token = await this.storage.get('token');
        this.token=token;
        this.user = await this.api.getMe(token);
        this.timerId = setTimeout(() => {
          this.registrarLlegada();
        }, 5000);
      }

     registrarLlegada(){
      const alumno=this.alumno.alumno;
        const data={
         horaLlegada: new Date().toISOString(),
          alumno: alumno.id,
          persona_autorizada: this.user.id,
       }
       this.api.registrarLlegada(this.token,data)
        console.log("se ha llegado alumno correctamente")
        this.route.navigate(['/alumnos']);
     }


     cancelarLlegada() {
      if(this.timerId){
        clearTimeout(this.timerId);
        this.timerId = null;
      }
       this.route.navigate(['/alumnos']);
     }

     goAlmunos() {
       this.route.navigate(['/alumnos']);
     }

    //cerrar sesion
     async cerrarSesion() {
      await this.api.logout();
       this.route.navigateByUrl('/login', { replaceUrl: true });
     }
    }

 //   async ngOnInit() {
//     // alumno desde navegación
//     const nav = this.route.getCurrentNavigation();
//     this.alumno = nav?.extras?.state?.alumno;

//     await this.storage.create();
//     const token = await this.storage.get('token');
//     if (!token) { this.route.navigateByUrl('/login'); return; }

//     // trae PA (usuario actual)
//     try {
//       this.pa = await this.api.getMe(token);
//       this.paNombreCompleto =
//         (this.pa?.nombre && this.pa?.apellido) ? `${this.pa.nombre} ${this.pa.apellido}` :
//         (this.pa?.fullName || this.pa?.nombre_completo || this.pa?.username || 'Usuario');
//     } catch {
//       this.paNombreCompleto = 'Usuario';
//     }

//     // si no hay alumno, vuelve a lista
//     if (!this.alumno) this.route.navigate(['/alumnos']);
//   }
