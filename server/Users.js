module.exports = class Users {
  constructor() {
    this.allUsers = {};
  }

  add(socketID, username) {
    this.allUsers[socketID] = {
      username: username,
      activeRoom: 'global',
    };
  }

  changeRoom(socketID, roomName) {
    this.allUsers[socketID].activeRoom = roomName;
  }

  remove(socketID) {
    // console.log(this.allUsers[socketID]);
    // const username = this.allUsers[socketID].username;
    delete this.allUsers[socketID];
  }
};
