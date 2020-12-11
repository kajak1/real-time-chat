module.exports = class Messages {
  constructor() {
    this.allMsg = [];
  }

  add(data) {
    this.allMsg.push(data);
    console.log(this.allMsg);
  }
};
