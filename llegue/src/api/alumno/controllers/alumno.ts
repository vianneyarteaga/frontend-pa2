/**
 * alumno controller - solución definitiva
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::alumno.alumno', ({ strapi }) => ({
  async find(ctx) {
    const user = ctx.state.user;

    if (!user) return ctx.unauthorized("Debes estar autenticado para acceder.");

    const role = user.role?.name;

    // Si es PersonaAutorizada, obtenemos su registro y alumnos
    if (role === 'PersonaAutorizada') {
      const pa = await strapi.db.query('api::persona-autorizada.persona-autorizada')
        .findOne({
          where: { user: user.id },
          populate: ['alumnos', 'alumnos.foto'], // incluir fotos si quieres
        });

      if (!pa) return ctx.forbidden("No tienes permisos para acceder a estos datos");

      // Retornamos directamente los alumnos
      return { data: pa.alumnos };
    }

    // Administrador ve todos
    if (role === 'Administrador') {
      ctx.query = {
        ...ctx.query,
        populate: ['foto', 'persona_autorizadas.user'],
      };
      return await super.find(ctx);
    }

    return ctx.forbidden("No tienes permisos para acceder a estos datos.");
  },
}));


// import { factories } from '@strapi/strapi';

// export default factories.createCoreController('api::alumno.alumno', ({ strapi }) => ({
//   async find(ctx) {
//     const user = ctx.state.user;

//     // Verifica que exista un usuario autenticado
//     if (!user) {
//       return ctx.unauthorized("Debes estar autenticado para acceder.");
//     }

//     const role = user.role?.type;

//     if (role === 'personas_autorizado') {
//       ctx.query = {
//         ...ctx.query,
//         filters: {
//           persona_autorizadas: {
//             user: {
//               id: {
//                 $eq: user.id,
//               },
//             },
//           },
//         },
//       };
//       return await super.find(ctx);
//     }

//     if (role === 'Administrador' || ctx.state.user.role.type === 'PersonaAutorizada') {
//       return await super.find(ctx);
//     }

//     // Opcional: manejar otros roles si los tienes
//     return ctx.forbidden("No tienes permisos para acceder a estos datos.");
//   },
// }));



// import { factories } from '@strapi/strapi'


// export default factories.createCoreController('api::alumno.alumno', {
//     async find(ctx) {
//         console.log(ctx.state.user)
//         if(ctx.state.user.role.type === 'personas_autorizado'){
            
//         ctx.query = {
//             ...ctx.query,
//             filters: {
//                 persona_autorizadas: {
//                     user: {
//                         id: {
//                             $eq: ctx.state.user.id
//                         }
//                     }
//                 }

//             }
//         };
//         const results = await super.find(ctx);
//         return results
//         }
//         if(ctx.state.user.role.type === 'Administrador'){
//             const results = await super.find(ctx);
//             return results
//         }
//     }    
// });
