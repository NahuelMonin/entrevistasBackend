const mongoose = require('mongoose');

const DB_URI = "mongodb+srv://NahuelMonin:Nilsel18@post-escuelita.k3276.mongodb.net/app-entrevistas?retryWrites=true&w=majority"

module.exports = () => {
  
  const connect = () => {
  
    try {
        console.log(DB_URI);
        await mongoose.connect(
            process.env.DB_CNN, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log('DB Online');
    } catch (error) {
        console.error(error);
        throw new Error('Error a la hora de inicar la BD ver logs')
    }
}

  connect();
}