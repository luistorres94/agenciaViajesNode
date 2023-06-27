import {Testimonial} from '../models/testimoniales.js'
const guardarTestimonial = async (req,res) =>{
    //Validar
    const {nombre,correo,mensaje} = req.body;
    const errores = [];
    if(nombre.trim() === ''){
        errores.push({mensaje:'El Nombre esta Vacio'});
    }
    if(correo.trim() === ''){
        errores.push({mensaje:'El Correo esta Vacio'});
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje:'El mensaje esta Vacio'});
    }
    if(errores.length > 0){
        //Consultar testimoniales
        const testimoniales = await Testimonial.findAll();
        //Mostrar vista con errores
        res.render('testimoniales',{
            pagina: 'testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }
    else{
        //Almacenar en bd
        try{
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        }
        catch(error){
            console.log(error);
        }

    }
    
}

export {
    guardarTestimonial
}