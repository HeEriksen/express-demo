import RecordStoreAbstractInterface from "./recordStoreInterface.mjs";
import DbManager from "./db.mjs";

class WorkoutStore extends RecordStoreAbstractInterface {
  async getAll() {
    return DbManager.read(
      `SELECT pwa_id, id, "when", workout FROM public.workouts;`
    );
  }

  create(workout) {
    console.log("create() i WorkoutStore kalles med: ", workout);
    return DbManager.create(
      `INSERT INTO "public"."workouts"("pwa_id", "when", "workout")
   VALUES ($1, $2, $3)
   RETURNING "pwa_id", "id", "when", "workout";`,
      workout.pwa_id,
      workout.date,
      JSON.stringify(workout.workout)
    );
  }

  read(workout) {
    return DbManager.read(
      `SELECT pwa_id, id, "when", workout
    FROM public.workouts
        WHERE id = $1;`,
      workout.id
    );
  }

  update(workout) {
    return DbManager.update(
      `UPDATE public.workouts
           SET "pwa_id" = $1, "when" = $2, "workout" = $3
           WHERE id = $4
           RETURNING "pwa_id", "id", "when", "workout";`,
      workout.pwa_id,
      workout.date,
      JSON.stringify(workout.workout),
      workout.id
    );
  }

  purge(workout) {
    return DbManager.purge(
      `DELETE FROM public.workouts
       WHERE id = $1
       RETURNING *;`,
      workout.id
    );
  }
}

export default WorkoutStore;
