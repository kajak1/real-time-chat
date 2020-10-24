module.exports = class Users {
  constructor() {
    this.all = {};
  }

  add(socketID, username) {
    this.users[socketID] = username;
  }

  remove(socketID) {
    delete this.users[socketID];
  }
};
