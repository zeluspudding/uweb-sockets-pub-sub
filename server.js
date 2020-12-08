const uWS = require('uWebSockets.js'); // npm install uNetworking/uWebSockets.js#v16.2.0

// an "app" is much like Express.js apps with URL routes,
// here we handle WebSocket traffic on the wildcard "/*" route
const app = uWS.App().ws('/*', {  // handle messages from client

  open: (socket, req) => {
    /* For now we only have one canvas */
    socket.subscribe("drawing/canvas1");
  },
  message: (socket, message, isBinary) => {
    /* In this simplified example we only have drawing commands */
    app.publish("drawing/canvas1", message, true);
  }
});

// finally listen using the app on port 9001
app.listen('0.0.0.0', Number.parseInt(process.env.PORT) || 9001, (token => {
    if (token) {
        console.log(`listening to port ${process.env.PORT || 9001}`);
    } else {
        console.log('failed to listen')
    }
}))
