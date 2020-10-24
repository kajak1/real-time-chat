module.exports = class Messages {
  constructor() {
    this.allMsg = '';
  }

  add(html) {
    this.allMsg += html;
  }
};
