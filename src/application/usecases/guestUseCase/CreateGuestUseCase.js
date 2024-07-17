import IGuestRepo from "@/domain/repositories/IGuestRepo";

class CreateGuestUseCase {
  constructor(guestRepo) {
    if (!(guestRepo instanceof IGuestRepo))
      throw new Error("guestRepo must be instance of IGuestRepo");
    this.guestRepo = guestRepo;
  }

  async run(guest) {
    try {
      const createdGuest = await this.guestRepo.create(guest);
      return createdGuest;
    } catch (error) {
      console.log("Error creating invitado:", error);
      throw error;
    }
  }
}

export default CreateGuestUseCase;