export type StatGroup = 'hitting' | 'pitching';

export type LeaderboardOptions = {
	name: string;
	abbreviation: string;
	group: StatGroup;
	stat: string;
	order: 'asc' | 'desc';
	qualified?: boolean;
};

export const BATTING_LEADERBOARDS: LeaderboardOptions[] = [
	{
		name: 'Batting Average',
		abbreviation: 'AVG',
		group: 'hitting',
		stat: 'avg',
		order: 'desc',
		qualified: true,
	},
	{
		name: 'Home Runs',
		abbreviation: 'HR',
		group: 'hitting',
		stat: 'homeRuns',
		order: 'desc',
	},
	{
		name: 'Runs Batted In',
		abbreviation: 'RBI',
		group: 'hitting',
		stat: 'rbi',
		order: 'desc',
	},
	{
		name: 'Stolen Bases',
		abbreviation: 'SB',
		group: 'hitting',
		stat: 'stolenBases',
		order: 'desc',
	},
	{
		name: 'On-Base Percentage',
		abbreviation: 'OBP',
		group: 'hitting',
		stat: 'obp',
		order: 'desc',
		qualified: true,
	},
	{
		name: 'Slugging Percentage',
		abbreviation: 'SLG',
		group: 'hitting',
		stat: 'slg',
		order: 'desc',
		qualified: true,
	},
	{
		name: 'On-Base Plus Slugging',
		abbreviation: 'OPS',
		group: 'hitting',
		stat: 'ops',
		order: 'desc',
		qualified: true,
	},
	{
		name: 'Hits',
		abbreviation: 'H',
		group: 'hitting',
		stat: 'hits',
		order: 'desc',
	},
];

export const PITCHING_LEADERBOARDS: LeaderboardOptions[] = [
	{
		name: 'Earned Run Average',
		abbreviation: 'ERA',
		group: 'pitching',
		stat: 'era',
		order: 'asc',
		qualified: true,
	},
	{
		name: 'Wins',
		abbreviation: 'W',
		group: 'pitching',
		stat: 'wins',
		order: 'desc',
	},
	{
		name: 'Strikeouts',
		abbreviation: 'SO',
		group: 'pitching',
		stat: 'strikeOuts',
		order: 'desc',
	},
	{
		name: 'Saves',
		abbreviation: 'SV',
		group: 'pitching',
		stat: 'saves',
		order: 'desc',
	},
	{
		name: 'WHIP',
		abbreviation: 'WHIP',
		group: 'pitching',
		stat: 'whip',
		order: 'asc',
		qualified: true,
	},
	{
		name: 'Innings Pitched',
		abbreviation: 'IP',
		group: 'pitching',
		stat: 'inningsPitched',
		order: 'desc',
	},
	{
		name: 'Strikeouts per Nine',
		abbreviation: 'K/9',
		group: 'pitching',
		stat: 'strikeoutsPer9Inn',
		order: 'desc',
		qualified: true,
	},
	{
		name: 'Hits per Nine',
		abbreviation: 'H/9',
		group: 'pitching',
		stat: 'hitsPer9Inn',
		order: 'asc',
		qualified: true,
	},
];
