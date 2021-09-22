class AuthStorage {
  namespace: string;
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  getAccessToken() {
    const token = localStorage.getItem(`${this.namespace}:token`);
    return token ? token : null;
  }

  setAccessToken(token: string) {
    localStorage.setItem(`${this.namespace}:token`, token);
  }

  removeAccessToken() {
    localStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;
