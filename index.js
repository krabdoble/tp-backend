require('dotenv').config();
const express= require('express');
const app= express();
const cors = require('cors');
const bodyParser = require("body-parser");
const {dbConnection}= require("./config/dbConnection")


app.use(cors({
  origin: ["https://proyecto-final-4483a.web.app"],
  /*methods: 'get,POSTPUT,DELETE',*/
  credentials: true,
}));

/*{
  origin: "https://proyecto-final-4483a.web.app"
}*/

app.use(express.json());

//app.use(bodyParser.json());
/*if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }*/


const loginroutes= require('./routes/usuarioLoginRoute');
const proveedorroutes= require('./routes/proveedorRoute');
const productoroutes= require('./routes/productoRoute');
const carritoroutes= require('./routes/carritoRoute');
const pedidoroutes= require('./routes/pedidoRoute');


const PORT = process.env.PORT || 3000;

app.use('/api/login',loginroutes)
app.use('/api/proveedor',proveedorroutes)
app.use('/uploads', express.static('uploads'));
app.use('/api/producto',productoroutes)
app.use('/api/carrito',carritoroutes)
app.use('/api/pedido',pedidoroutes)

let admin = require("firebase-admin");

try {
  const firebaseCredentials = process.env.FIREBASE_CREDENTIALS;

  if (!firebaseCredentials) {
    throw new Error("La variable de entorno FIREBASE_CREDENTIALS no está definida.");
  }

  const serviceAccount = JSON.parse(firebaseCredentials);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log('Firebase Admin inicializado correctamente.');
} catch (error) {
  console.error('Error al inicializar Firebase Admin:', error.message);
  console.log('Contenido de FIREBASE_CREDENTIALS:', process.env.FIREBASE_CREDENTIALS);
}


/*let admin = require("firebase-admin")

//var serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

var serviceAccount = require("./proyecto-final-4483a-firebase-adminsdk-qlnvs-2321e3b964.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })

 /* let admin = require("firebase-admin");

try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log('Firebase Admin inicializado correctamente.');
} catch (error) {
  console.error('Error al inicializar Firebase Admin:', error);
}*/


app.listen(PORT,() =>{
    console.log(`listening on port ${PORT}`)
    console.log('MYSQL_URL:', process.env.MYSQL_URL);

});