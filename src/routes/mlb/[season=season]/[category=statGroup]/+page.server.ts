import { getCurrentSeason, getSeasonStats, seasonExists, type StatGroup } from '$lib/server/mlb';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const GROUPS = {
	batting: 'hitting',
	pitching: 'pitching',
} as const satisfies Record<string, StatGroup>;

export const load: PageServerLoad = async ({ fetch, params, setHeaders }) => {
	try {
		const [currentSeason, exists] = await Promise.all([
			getCurrentSeason(fetch),
			seasonExists(fetch, params.season),
		]);

		if (!exists) {
			error(404, `No MLB season found for ${params.season}`);
		}

		const category = params.category as keyof typeof GROUPS;
		const stats = await getSeasonStats(fetch, params.season, GROUPS[category]);
		const seasonNumber = Number(params.season);
		const currentSeasonNumber = Number(currentSeason);

		setHeaders({ 'cache-control': 'no-store' });

		return {
			season: params.season,
			category,
			categoryName: category === 'batting' ? 'Batting' : 'Pitching',
			previousSeason: seasonNumber > 1871 ? String(seasonNumber - 1) : null,
			nextSeason: seasonNumber < currentSeasonNumber ? String(seasonNumber + 1) : null,
			...stats,
		};
	} catch (cause) {
		if (cause && typeof cause === 'object' && 'status' in cause) throw cause;
		console.error(cause);
		error(502, 'MLB statistics are temporarily unavailable');
	}
};
