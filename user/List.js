export default class UsersList {
  constructor() {
    this.users = [];
    this.list = document.querySelector('.users-list');
    this.html = '';
  }

  render() {
    this.list.innerHTML = this.html;
    this.html = '';
  }

  addUser({ users, user }) {
    this.users.push(user);
    for (const key in users) {
      this.html += `<li id="${users[key]}">${users[key]}</li>`;
    }
    this.render();
  }

  removeUser(user) {
    console.log(this.list);
    const toRemove = this.list.querySelector(`#${user}`);
    toRemove.parentNode.removeChild(toRemove);
  }
}
