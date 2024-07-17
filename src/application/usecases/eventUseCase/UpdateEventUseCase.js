const { default: IEventRepo } = require("@/domain/repositories/IEventRepo");

class UpdateEventUseCase {
  constructor(eventRepo) {
    if (!(eventRepo instanceof IEventRepo))
      throw new Error("eventRepo must be instance of IEventRepo");
    this.eventRepo = eventRepo;
  }

  async run(event) {
    try {
      const updatedEvent = await this.eventRepo.update(event);
      return updatedEvent;
    } catch (error) {
      console.log("Error creating event:", error);
      throw error;
    }
  }
}

export default UpdateEventUseCase;