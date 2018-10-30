const authLogin = s => `${(new Date().getUTCFullYear() + 1) * (new Date().getUTCMonth() + 1) * (new Date().getUTCDate() + 1) * (new Date().getUTCHours() + 1)}`.slice(0, 4) === s;

export {
  authLogin
}