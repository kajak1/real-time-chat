module.exports = class Messages {
  constructor() {
    this.allMsg = '';
  }

  add(msg) {
    this.allMsg += msg;
  }
};
