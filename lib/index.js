import express from 'express';
import { Server as http } from 'http';
import open from 'openurl';

export default function server(port = 8000) {
  let instance = {};
  instance.port = port;
    
  instance.error = (err) => {
      console.log(err);
      process.exit(1);
  }
    
  instance.run = () => {
    let app = express();
    let server = http(app);
    server.__express__ = app;

    app.use(express.static(process.cwd()));
    server.listen(instance.get_port(), instance.get_host(), (err) => {
      if(err) return instance.error(err);
    });
    instance.server = server;
    return server;
  }

  instance.get_port = () => {
    return instance.port;
  }

  instance.get_host = () => {
    return "localhost";
  }
    
  instance.get_uri = () => {
    let uri = ['http://', instance.get_host(), ':', instance.get_port()].join('');
    return uri;
  }

  instance.stop = () => {
    instance.server.close();
  }
  
  instance.open = () => {
    let server_url = instance.get_uri();
    open.open(server_url);
  }
  
  return instance;
}
