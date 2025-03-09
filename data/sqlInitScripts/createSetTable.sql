CREATE TABLE "public"."Set" (
    "id" integer GENERATED ALWAYS AS IDENTITY,
    "exercise_id" integer,
    "reps" integer NOT NULL,
    "weight" DECIMAL(5,2) NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT "fk_exercise"
        FOREIGN KEY ("exercise_id")
        REFERENCES "public"."Exercise"("id")
        ON DELETE CASCADE
);