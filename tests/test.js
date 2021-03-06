import pillbug from '../lib/';
import request from 'request';

describe("Pillbug tests", () => {

  it("should set the port", (done) => {
    let server = pillbug(8009);
    if(server.get_port() != 8009)
      throw new Error("Error setting express port");
    done();
  });

  it("should set the default port as 8000", (done) => {
    let server = pillbug();
    if(server.get_port() != 8000)
      throw new Error("Error setting express default port");
    done();
  });

  it("should return host", (done) => {
    let server = pillbug();
    if(server.get_host() != 'localhost')
      throw new Error("Error getting default host");
    done(); 
  });

  it("should return uri", (done) => {
    let server = pillbug(8009);
    if(server.get_uri() != 'http://localhost:8009')
      throw new Error("Error getting uri");
    done(); 
  });

  it("should create a server and stop it", (done) => {
    let pb = pillbug(8009);
    let uri = pb.get_uri();
    let server = pb.run();
    request.get(uri, (err, response, body) => {
      if(err) throw err;
      if(response.statusCode != 200)
        throw new Error("Error creating static server");
      
      pb.stop();
      setTimeout( () => {
        request(uri, (err, response, body) => {
          if(err || response.statusCode == 404) done();
          throw new Error("Server not closed correctly");
        });
      }, 200);
    });
  });
  
  it("should create a server with proxy and stop it", (done) => {
    let pb = pillbug(8009);
    let uri = pb.get_uri()+"/proxy";
    let server = pb.run().create_proxy();
    request.get(uri, (err, response, body) => {
      if(err) throw err;
      if(response.statusCode != 200)
        throw new Error("Error creating static server");
      
      pb.stop();
      setTimeout( () => {
        request(uri, (err, response, body) => {
          if(err || response.statusCode == 404) done();
          throw new Error("Server not closed correctly");
        });
      }, 200);
    });
  });

});

