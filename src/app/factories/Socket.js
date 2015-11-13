angular.module('app')
.factory('socketServer', function (socketFactory) {

  var myIoSocket = io.connect('http://127.0.0.1:3000');

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  mySocket.forward('serverLoad');
  mySocket.forward('messageIncoming');

  return mySocket;

  // return socketFactory();
});