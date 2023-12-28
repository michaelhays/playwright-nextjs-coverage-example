// Send a command over the WebSocket and return a promise
// that resolves with the command response.
export default function send(ws, command) {
    return new Promise(resolve => {

      const callback = function(text) {
        const response = JSON.parse(text);
        if (response.id === command.id) {
          ws.removeListener('message', callback);
          resolve(response);
        }
      }

      ws.on('message', callback);
      ws.send(JSON.stringify(command));

    });
  }