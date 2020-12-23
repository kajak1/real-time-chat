module.exports = class Rooms {
  constructor() {
    this.global = {
      users: [],
      messages: [],
    };
  }

  add(roomName) {
    this[roomName] = {
      users: [],
      messages: [],
    };
  }

  addMessage({ username, message }, roomName) {
    this[roomName].messages.push([username, message]);
    // console.log('dostalem message', message, 'do pokoju', roomName);
  }

  addUser(socketID, roomName) {
    this[roomName].users.push(socketID);
  }

  delete(roomName) {
    // console.log(roomName);
    if (this[roomName].users.length > 0) {
      return;
    }
    delete this[roomName];
  }

  removeUserFromRoom(socketID, roomName) {
    // dodac warunek sprawdzający czy użytkownik istnieje w pokoju
    const userIndex = this[roomName].users.indexOf(socketID);
    this[roomName].users.splice(userIndex, 1);
  }

  getAllRooms() {
    return Object.getOwnPropertyNames(this);
  }
};
