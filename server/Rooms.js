module.exports = class Rooms {
  constructor() {
    this.global = {
      users: [],
      messages: [],
    };
  }

  add(roomName) {
    if (isNaN(roomName[0])) {
      this[roomName] = {
        users: [],
        messages: [],
      };
    }
  }

  addMessage({ username, message }, roomName) {
    this[roomName].messages.push([username, message]);
  }

  addUser(socketID, roomName) {
    const userIndex = this[roomName].users.indexOf(socketID);
    if (userIndex === -1) {
      this[roomName].users.push(socketID);
    }
  }

  delete(roomName) {
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
    console.log(Object.getOwnPropertyNames(this));
    console.log(this);
    return Object.getOwnPropertyNames(this);
  }
};
