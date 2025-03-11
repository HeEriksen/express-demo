UPDATE public.workouts
        SET "pwa_id" = $1, "id" = $2, "when" = $3, "workout" = $4
        WHERE id = $5
        RETURNING "pwa_id", "id", "when", "workout";