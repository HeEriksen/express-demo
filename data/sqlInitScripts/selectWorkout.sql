SELECT pwa_id, id, "when", workout
	FROM public.workouts;
        WHERE id = $1;