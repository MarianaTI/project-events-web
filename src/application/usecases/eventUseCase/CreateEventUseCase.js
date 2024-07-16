const { default: IEventRepo } = require("@/domain/repositories/IEventRepo");

class CreateEventUseCase {
  constructor(eventRepo) {
    if (!(eventRepo instanceof IEventRepo))
      throw new Error("eventRepo must be instance of IEventRepo");
    this.eventRepo = eventRepo;
  }

  async run(event) {
    try {
      const createdEvent = await this.eventRepo.create(event);
      return createdEvent;
    } catch (error) {
      console.log("Error creating event:", error);
      throw error;
    }
  }
}

export default CreateEventUseCase;