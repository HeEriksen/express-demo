INSERT INTO "public"."workouts"("pwa_id", "when", "workout")
VALUES ($1, $2, $3)
RETURNING "pwa_id", "id", "when", "workout";