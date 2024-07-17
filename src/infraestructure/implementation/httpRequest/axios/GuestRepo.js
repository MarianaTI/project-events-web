import axios from "axios";
import IGuestRepo from "@/domain/repositories/IGuestRepo";

class GuestRepo extends IGuestRepo {
  constructor(id_user) {
    super();
    this.id_user = id_user;
    this.url = "http://localhost:3000/api/guest/";
    this.urlPost = "http://localhost:3000/api/guest/create";
  }

  async getOne(_id) {
    try {
      const response = await axios.get(`${this.url}${_id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching los inivitados:", error.message);
      throw error;
    }
  }

  async create(guest) {
    try {
      const response = await axios.post(this.urlPost, guest, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear el invitado:", error);
      throw error;
    }
  }
}

export default GuestRepo;