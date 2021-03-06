module.exports = class Users {
  constructor() {}

  add(socketID, username) {
    this[socketID] = {
      username: username,
      activeRoom: 'global',
    };
  }

  changeRoom(socketID, roomName) {
    this[socketID].activeRoom = roomName;
  }

  remove(socketID) {
    delete this[socketID];
  }

  getAllUsers() {
    // console.log(Object.getOwnPropertyNames(this));
    return Object.getOwnPropertyNames(this);
  }
};
