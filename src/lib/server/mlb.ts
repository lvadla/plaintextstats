import {
	BATTING_LEADERBOARDS,
	PITCHING_LEADERBOARDS,
	type LeaderboardOptions,
} from './mlb-leaderboards';

const API_BASE_URL = 'https://statsapi.mlb.com/api/v1';
const MLB_SPORT_ID = 1;

interface SeasonsResponse {
	seasons?: Array<{
		seasonId: string;
	}>;
}

interface StatsResponse {
	stats?: Array<{
		splits?: StatSplit[];
	}>;
}

interface StatSplit {
	rank?: number;
	player?: {
		id: number;
		fullName: string;
	};
	team?: {
		id: number;
		name: string;
	};
	stat?: Record<string, number | string>;
}

export interface Leader {
	rank: number;
	tied: boolean;
	playerId: number;
	playerName: string;
	teamId: number | null;
	teamName: string;
	value: string;
}

export interface Leaderboard {
	name: string;
	abbreviation: string;
	leaders: Leader[];
}

type Fetch = typeof fetch;

function markTies(leaders: Leader[]): Leader[] {
	const rankCounts = new Map<number, number>();

	for (const leader of leaders) {
		rankCounts.set(leader.rank, (rankCounts.get(leader.rank) ?? 0) + 1);
	}

	for (const leader of leaders) {
		leader.tied = (rankCounts.get(leader.rank) ?? 0) > 1;
	}

	return leaders;
}

async function request<T>(fetcher: Fetch, path: string): Promise<T> {
	const response = await fetcher(`${API_BASE_URL}${path}`, {
		headers: { accept: 'application/json' },
	});

	if (!response.ok) {
		throw new Error(`MLB Stats API returned ${response.status}`);
	}

	return response.json() as Promise<T>;
}

export async function getCurrentSeason(fetcher: Fetch): Promise<string> {
	const data = await request<SeasonsResponse>(fetcher, `/seasons?sportId=${MLB_SPORT_ID}`);
	const season = data.seasons?.[0]?.seasonId;

	if (!season) {
		throw new Error('MLB Stats API did not return a current season');
	}

	return season;
}

export async function seasonExists(fetcher: Fetch, season: string): Promise<boolean> {
	const data = await request<SeasonsResponse>(
		fetcher,
		`/seasons?sportId=${MLB_SPORT_ID}&season=${encodeURIComponent(season)}`,
	);

	return data.seasons?.some((item) => item.seasonId === season) ?? false;
}

async function getLeaderboard(
	fetcher: Fetch,
	season: string,
	options: LeaderboardOptions,
): Promise<Leaderboard> {
	const params = new URLSearchParams({
		stats: 'season',
		group: options.group,
		season,
		sportIds: String(MLB_SPORT_ID),
		sortStat: options.stat,
		order: options.order,
		limit: '5',
	});

	if (options.qualified) {
		params.set('playerPool', 'QUALIFIED');
	}

	const data = await request<StatsResponse>(fetcher, `/stats?${params}`);
	const splits = data.stats?.[0]?.splits ?? [];
	const leaders = splits.flatMap((split, index) => {
		const value = split.stat?.[options.stat];
		if (!split.player || value === undefined) return [];

		return [
			{
				rank: split.rank ?? index + 1,
				tied: false,
				playerId: split.player.id,
				playerName: split.player.fullName,
				teamId: split.team?.id ?? null,
				teamName: split.team?.name ?? '—',
				value: String(value),
			},
		];
	});

	return {
		name: options.name,
		abbreviation: options.abbreviation,
		leaders: markTies(leaders),
	};
}

export async function getSeasonOverview(
	fetcher: Fetch,
	season: string,
): Promise<{ batting: Leaderboard[]; pitching: Leaderboard[] }> {
	const load = (options: LeaderboardOptions) => getLeaderboard(fetcher, season, options);
	const [batting, pitching] = await Promise.all([
		Promise.all(BATTING_LEADERBOARDS.map(load)),
		Promise.all(PITCHING_LEADERBOARDS.map(load)),
	]);

	return { batting, pitching };
}
