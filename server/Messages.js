module.exports = class Messages {
  constructor() {
    this.allMsg = [];
  }

  add({ username, message }) {
    this.allMsg.push([username, message]);
    // console.log(this.allMsg);
  }
};
