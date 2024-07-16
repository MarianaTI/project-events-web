import axios from "axios";
import IUserRepo from "@/domain/repositories/IUserRepo";
import { setUser } from "@/actions/userActions";

class UserRepo extends IUserRepo {
  constructor(dispatch, id_user) {
    super();
    this.dispatch = dispatch;
    this.id_user = id_user;
    this.urlSignIn = "http://localhost:3000/api/signin";
    this.urlSignUp = "http://localhost:3000/api/signup";
  }
  
  async signIn(user) {
    try {
      const response = await axios.post(this.urlSignIn, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      this.dispatch(setUser(response.data));
      return response.data;
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    }
  }

  async signUp(user) {
    try {
      const response = await axios.post(this.urlSignUp, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error signing up:", error.message);
      throw error;
    }
  }
}

export default UserRepo;