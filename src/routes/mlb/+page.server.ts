import { getCurrentSeason } from '$lib/server/mlb';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	let season: string;

	try {
		season = await getCurrentSeason(fetch);
	} catch (cause) {
		console.error(cause);
		error(502, 'MLB statistics are temporarily unavailable');
	}

	redirect(307, `/mlb/${season}`);
};
