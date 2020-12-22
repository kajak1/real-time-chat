module.exports = class Rooms {
  constructor() {
    this.global = {
      users: [],
    };
  }

  add(roomName) {
    this[roomName] = {
      users: [],
    };
  }

  addUser(socketID, roomName) {
    this[roomName].users.push(socketID);
  }

  delete(roomName) {
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
