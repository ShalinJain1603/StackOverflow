import axios from "axios";

const Auth = {
  isAuthenticated: false,
  async authenticate() {
    const isSignedIn = await axios.get("/isLoggedIn");
    this.isAuthenticated = isSignedIn.data.loggedIn;
  },
  async signout() {
    const isSignedIn = await axios.get("/isLoggedIn");
    this.isAuthenticated = isSignedIn.data.loggedIn;
  },
  getAuth() {
    return this.isAuthenticated;
  },
};
export default Auth;
