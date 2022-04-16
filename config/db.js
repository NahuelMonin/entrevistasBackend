const mongoose = require('mongoose');

const DB_URI = "mongodb+srv://NahuelMonin:Nilsel18@post-escuelita.k3276.mongodb.net/app-entrevistas?retryWrites=true&w=majority"

module.exports = () => {
  
  const connect = () => {
  
    mongoose.connect(
      DB_URI, 
      {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      (err) => {
        if(err){
          console.log('DB ERROR: ' + err);
        } else {
          console.log('Conexion a la DB con exito!');
        }
      }
    )
  }

  connect();
}