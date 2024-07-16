import IEventRepo from "@/domain/repositories/IEventRepo";

class GetAllEventUseCase {
  constructor(eventRepo) {
    if (!(eventRepo instanceof IEventRepo))
      throw new Error("EventRepo must be instance of IEventRepo");
    this.eventRepo = eventRepo;
  }

  async run() {
    const getEvents = this.eventRepo.getAll();
    return getEvents;
  }
}

export default GetAllEventUseCase;