// From BaseModel.js
import pkg from 'uuid';
const { v4: uuid } = pkg;

class BaseModel {
  constructor() {
    this.id = uuid();
  }
}
// --------------------------
console.log(new BaseModel());

// Запишем на localStorage информацию о пользователе

addToStorage()

// From utils.js
const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

console.log(getFromStorage);

const addToStorage = function (obj, key) {
  const storageData = getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};

const generateTestUser = function (User) {
  localStorage.clear();
  const testUser = new User("1", "1");
  User.save(testUser);
};
// --------------------------

// From Users.js
class User extends BaseModel {
  constructor(login, password) {
    super();
    this.login = login;
    this.password = password;
    this.storageKey = "users";
  }
  get hasAccess() {
    let users = getFromStorage(this.storageKey);
    if (users.length == 0) return false;
    for (let user of users) {
      if (user.login == this.login && user.password == this.password)
        return true;
    }
    return false;
  }
  static save(user) {
    try {
      addToStorage(user, user.storageKey);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}