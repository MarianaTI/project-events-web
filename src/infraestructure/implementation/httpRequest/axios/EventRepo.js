import axios from "axios";
import IEventRepo from "@/domain/repositories/IEventRepo";

class EventRepo extends IEventRepo {
  constructor(id_user) {
    super();
    this.id_user = id_user;
    this.url = "http://localhost:3000/api/events/";
    this.urlPost = "http://localhost:3000/api/event/post";
  }

  async getAll() {
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (error) {
      console.error("Error fetching los events:", error.message);
      throw error;
    }
  }

  async create(event) {
    try {
      const formData = new FormData();
      formData.append("id_user", event.id_user);
      formData.append("title", event.title);
      formData.append("description", event.description);
      formData.append("image", event.image);
      formData.append("date", event.date);
      formData.append("cost", event.cost);
      formData.append("location", event.location);
      const response = await axios.post(this.urlPost, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          id_user: this.id_user,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear el event:", error);
      throw error;
    }
  }
}

export default EventRepo;