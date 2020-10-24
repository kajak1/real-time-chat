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
    console.log(users, user);
    this.users.push(user);
    for (const key in users) {
      this.html += `<li id="${users[key].username}">${users[key].username}</li>`;
    }
    this.render();
  }

  removeUser(username) {
    console.log(username);
    console.log(this.list);
    const toRemove = this.list.querySelector(`#${username}`);
    console.log(toRemove);
    toRemove.parentNode.removeChild(toRemove);
  }
}
