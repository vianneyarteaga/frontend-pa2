/**
 * alumno service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::alumno.alumno');

// export default {
//     routes: [
//     {
//         method:'GET',
//         path:'/alumnos',
//         handler: 'alumno.find'
//     }
//     ]
// }
