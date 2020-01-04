const hapi = require('hapi'),
  Inert = require('inert'),
  Config = require('./config'),
  RegisterRoutes = require('./lib/routes/register-routes'),
  Mongoose = require("mongoose");

const server = hapi.server({    
  port: Config.server.port,
  host: Config.server.host,
  routes: {
    cors: true
  }
});

const connectMongoDB = () => {
  Mongoose.connect(Config.mongoConnectionString, {useNewUrlParser: true});
}

const bootUpServer = async () => {
  try {
    await server.register(Inert);
    (new RegisterRoutes(Config)).register(server);
    await server.start();    
    console.log(`Server is running at ${server.info.uri}`);
    
    process.on('unhandledRejection', (err) => {       
            console.log(err); 
            process.exit(1);    
    })
  } catch(err) {
    console.log(JSON.stringify(err));
    throw err;
  }
}

connectMongoDB();
bootUpServer();
