import WorkoutStore from "./workoutsRecordStore.mjs";

const storageHandler = new WorkoutStore();

class Workout {
  constructor(pwa_id = null, id = null, date = new Date(), workout = []) {
    this.pwa_id = pwa_id;
    this.id = id;
    this.date = date;
    this.workout = workout;
  }

  async create() {
    const record = await storageHandler.create(this);
    this.pwa_id = record.pwa_id;
    this.id = record.id;
    this.date = record.date;
    this.workout = record.workout;
    return this;
  }

  async read() {
    const record = await storageHandler.read(this);
    this.pwa_id = record.pwa_id;
    this.id = record.id;
    this.date = record.date;
    this.workout = record.workout;
    return this;
  }

  async update() {
    const record = await storageHandler.update(this);
    this.pwa_id = record.pwa_id;
    this.id = record.id;
    this.date = record.date;
    this.workout = record.workout;
    return this;
  }

  async purge() {
    await storageHandler.purge(this);
    return null;
  }
}

export default Workout;
