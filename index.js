import express  from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv/config';


const app = express();

//Conectar a db

db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

//Definir Puerto 
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

//Obtener el año actual
app.use((req,res,next) =>{
    const year = new Date();
    res.locals.ActualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    return next();
});
//Agregar body parser para agregar los datos del formulario
app.use(express.urlencoded({extended:true}));
//Definir la carpeta public
app.use(express.static('public'));

//Agregar Router
app.use('/',router);

app.listen(port,() =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});