CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "public"."workouts" (
    "pwa_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "id" SERIAL NOT NULL,
    "when" TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "workout" JSONB NOT NULL,
    CONSTRAINT "workout_sessions_pkey" PRIMARY KEY ("id")
) TABLESPACE pg_default;

ALTER TABLE IF EXISTS "public"."workouts"
    OWNER TO "workout_db_0aq0_user";