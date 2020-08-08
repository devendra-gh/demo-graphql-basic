const { DataSource } = require("apollo-datasource");

// Definition for USER API to getting Data
class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getUsers() {
    const users = this.store.users;
    return users;
  }

  async getUser({ email: emailArg }) {
    let index = 0;
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;

    const theUser = this.store.users.map((user) => {
      if (email === user.email) {
        index = this.store.users.indexOf(user);
        return user;
      }
    });

    return theUser[index];
  }

  async saveRecord({ recordId }) {
    const userId = this.context.user.id;

    if (!userId) {
      console.log("No user on context");
    } else {
      console.log("User on context");
    }

    const usercheck = this.store.users.map((user) => {
      if (userId == user.id) {
        user.records.push({ id: recordId });
        return user;
      }
    });

    let users = [];
    await usercheck.forEach((elem) => {
      if (elem) {
        users.push(elem);
      }
    });

    return users[0].records.length > 4 ? users[0].records : "oh noh!";
  }
}

module.exports = UserAPI;
