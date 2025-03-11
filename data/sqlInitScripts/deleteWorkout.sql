DELETE FROM public.workouts
       WHERE id = $1
       RETURNING *;