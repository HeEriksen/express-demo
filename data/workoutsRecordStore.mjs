import RecordStoreAbstractInterface from "./recordStoreInterface.mjs";
import DbManager from "./db.mjs";


class WorkoutStore extends RecordStoreAbstractInterface {

    create(workout) {
        DbManager.create(`INSERT INTO "public"."workouts"(
	"pwa_id", "id", "when", "workout")
	VALUES ($1, $2, $3, $4) RETURNING "pwa_id", "id", "when", "workout";`, workout)
    }

}


export default WorkoutStore;