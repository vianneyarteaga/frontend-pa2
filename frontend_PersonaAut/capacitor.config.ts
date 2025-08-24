import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  // appId: 'com.llegue.personasautorizadas', // Identificador único del proyecto para notificaciones push
  appName: 'frontend_PersonaAut',
  webDir: 'www'
};

export default config;

//ionic build
 //ionic cap add ios
 //ionic cap add android  / comandos que crean carpetas con el proyecto nativo/nombre

 //instalar plugin
 //npm install @capacitor/push-notifications
 //npx cap sync /sincroniza las dependencias de Capacitor a ionic

 //ir a la pagina de login y agregar el código para recibir notificaciones /dashboard de Firebase o home //
 //  es para ver las notificaciones
 //import { es un import, va al inicio del archivo
//   ActionPerformed,
//   PushNotificationSchema,
//   PushNotifications,
//   Token,
// } from '@capacitor/push-notifications';

//luego tendra como token, la idea es que genere un token unico para guardar de que x ya entro y el token se lo mande a su celular
//poner esto en la pagina de login o donde quiero que vaya
// export class HomePage implements OnInit { //el export ya esta en el archivo original, solo es agregar el ngOnInit
//   ngOnInit() {
//     console.log('Initializing HomePage');

//     // Request permission to use push notifications
//     // iOS will prompt user and return if they granted permission or not
//     // Android will just grant without prompting
//     PushNotifications.requestPermissions().then(result => {
//       if (result.receive === 'granted') {
//         // Register with Apple / Google to receive push via APNS/FCM
//         PushNotifications.register();
//       } else {
//         // Show some error
//       }
//     });

//     // On success, we should be able to receive notifications
//     PushNotifications.addListener('registration',
//       (token: Token) => {
//         alert('Push registration success, token: ' + token.value);
//       }
//     );

//     // Some issue with our setup and push will not work
//     PushNotifications.addListener('registrationError',
//       (error: any) => {
//         alert('Error on registration: ' + JSON.stringify(error));
//       }
//     );

//     // Show us the notification payload if the app is open on our device
//     PushNotifications.addListener('pushNotificationReceived',
//       (notification: PushNotificationSchema) => {
//         alert('Push received: ' + JSON.stringify(notification));
//       }
//     );

//     // Method called when tapping on a notification
//     PushNotifications.addListener('pushNotificationActionPerformed',
//       (notification: ActionPerformed) => {
//         alert('Push action performed: ' + JSON.stringify(notification));
//       }
//     );
//   }
// }

//si jalo hay que hacer un build de nuevo y copiar
//ionic build
//npx cap copy

//ahora consola de firebase
//ir a la consola de Firebase, crear un proyecto, con el nombre del proyecto, y dar continuar
//ir a descripcion general del proyecto, y luego a android y registrar la app, como llame el id de la app, el sobrenombre
//luego registrar la app, y descargar el archivo google-services.json
//luego se guarda en proyecto, en la carpeta android/app, todo esto esta en la documentacion de firebase
// en teoria ya esta todo listo, ahora hay que probarlo
//hay que compilar el proyecto, usaremos cloud messaging en consola de Firebase
//se hara una puebra de notificacion
//android studio descargar
//npx cap open android se abrira el proyecto en android studio
//saber el id de cual fue el celular del que inicio sesion por primera vez, por si quiero enviar una notificacion a ese celular

//ir a send