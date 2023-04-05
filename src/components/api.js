const USERS = [
  {
    userEmail: "jake@gmail.com",
    userPassword: "123456",
    userName: "jake1029910",
  },
  {
    userEmail: "jill@gmail.com",
    userPassword: "7890123",
    userName: "jilljack",
  },
  {
    userEmail: "piyush33yadav@gmail.com",
    userPassword: "1234",
    userName: "piyush33",
  },
];

export function login(email) {
  return new Promise((resolve, reject) => {
    // check if email is correct

    USERS.forEach((item, i) => {
      if (item.userEmail === email) {
        resolve(item);
      }
    });
    reject();
  });
}

export function sendOtp() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}
