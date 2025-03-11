CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "public"."workouts" (
    "pwa_id" UUID NOT NULL,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "when" TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "workout" JSONB NOT NULL,
    CONSTRAINT "workout_sessions_pkey" PRIMARY KEY ("id")
) TABLESPACE pg_default;

ALTER TABLE IF EXISTS "public"."workout"
    OWNER TO "workout_db_0aq0_user";