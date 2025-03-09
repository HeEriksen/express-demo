CREATE TABLE "public"."Exercise" (
    "id" integer GENERATED ALWAYS AS IDENTITY,
    "workout_id" integer,
    "name" text NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT "fk_workout"
        FOREIGN KEY ("workout_id")
        REFERENCES "public"."Workout"("id")
        ON DELETE CASCADE
);

