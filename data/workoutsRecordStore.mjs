import RecordStoreAbstractInterface from "./recordStoreInterface.mjs";
import DbManager from "./db.mjs";

class WorkoutStore extends RecordStoreAbstractInterface {
  create(workout) {
    return DbManager.create(
      `INSERT INTO "public"."workouts"("pwa_id", "when", "workout")
   VALUES ($1, $2, $3)
   RETURNING "pwa_id", "id", "when", "workout";`,
      workout.pwa_id,
      workout.date,
      workout.workout
    );
  }

  read(workout) {
    return DbManager.read(
      `SELECT pwa_id, id, "when", workout
	FROM public.workouts;
        WHERE id = $1;`,
      workout.id
    );
  }

  update(workout) {
    return DbManager.update(
      `UPDATE public.workouts
        SET "pwa_id" = $1, "id" = $2, "when" = $3, "workout" = $4
        WHERE id = $5
        NG "pwa_id", "id", "when", "workout";`,
      workout.pwa_id,
      workout.id,
      workout.date,
      workout.workout,
      workout.id
    );
  }

  purge(workout) {
    return DbManager.purge(
      `DELETE FROM public.workouts
       WHERE id = $1
       NG *;`,
      workout.id
    );
  }
}

export default WorkoutStore;
