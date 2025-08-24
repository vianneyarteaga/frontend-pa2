/**
 * docente controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::docente.docente', {
    async find(ctx) {
        console.log(ctx.state.user)
        if(ctx.state.user.role.type === 'personas_autorizado'){
            
        ctx.query = {
            ...ctx.query,
            filters: {
                persona_autorizadas: {
                    user: {
                        id: {
                            $eq: ctx.state.user.id
                        }
                    }
                }

            }
        };
        const results = await super.find(ctx);
        return results
        }
        if(ctx.state.user.role.type === 'Administrador' || ctx.state.user.role.type === 'PersonaAutorizada'){
            const results = await super.find(ctx);
            return results
        }
    }    
});
