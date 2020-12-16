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

  changeRoom(socketID, room) {
    this.allUsers[socketID].activeRoom = room;
  }

  remove(socketID) {
    console.log(this.allUsers[socketID]);
    // const username = this.allUsers[socketID].username;
    delete this.allUsers[socketID];
    /*
        if (this.global.indexOf(username) > -1) {
      this.global.splice(this.global.indexOf(username), 1);
    }
    */
  }
};
