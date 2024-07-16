import axios from "axios";
import IGuestRepo from "@/domain/repositories/IGuestRepo";

class GuestRepo extends IGuestRepo {
  constructor(id_user) {
    super();
    this.url = "http://localhost:3000/api/guest/";
  }

  async getOne(_id) {
    try {
      const response = await axios.get(`${this.url}${_id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching los blogs:", error.message);
      throw error;
    }
  }
}

export default GuestRepo;