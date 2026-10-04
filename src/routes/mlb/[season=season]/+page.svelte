<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.season} MLB Statistics | PlainTextStats</title>
	<meta
		name="description"
		content={`Major League Baseball batting and pitching leaders for ${data.season}.`}
	/>
</svelte:head>

<main>
	<header class="site-header">
		<a href="/mlb">plaintextstats</a>
		<span>MLB</span>
	</header>

	<nav class="season-nav" aria-label="Season navigation">
		<span>
			{#if data.previousSeason}
				<a href={`/mlb/${data.previousSeason}`}>&lt; {data.previousSeason}</a>
			{/if}
		</span>
		<strong>{data.season} MLB</strong>
		<span class="next">
			{#if data.nextSeason}
				<a href={`/mlb/${data.nextSeason}`}>{data.nextSeason} &gt;</a>
			{/if}
		</span>
	</nav>

	<h1>{data.season} Major League Baseball</h1>

	<section aria-labelledby="batting-heading">
		<h2 id="batting-heading"><a href={`/mlb/${data.season}/batting`}>Batting</a></h2>

		<div class="leaderboards">
			{#each data.batting as leaderboard (leaderboard.abbreviation)}
				<div class="leaderboard">
					<h3>{leaderboard.name}</h3>
					<table>
						<thead>
							<tr>
								<th scope="col" class="rank">#</th>
								<th scope="col">Player</th>
								<th scope="col" class="value">{leaderboard.abbreviation}</th>
							</tr>
						</thead>
						<tbody>
							{#each leaderboard.leaders as leader (leader.playerId)}
								<tr>
									<td class="rank">{leader.tied ? 'T' : ''}{leader.rank}</td>
									<td>{leader.playerName} <span>{leader.teamName}</span></td>
									<td class="value">{leader.value}</td>
								</tr>
							{:else}
								<tr><td colspan="3">No statistics available.</td></tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/each}
		</div>
	</section>

	<section aria-labelledby="pitching-heading">
		<h2 id="pitching-heading"><a href={`/mlb/${data.season}/pitching`}>Pitching</a></h2>

		<div class="leaderboards">
			{#each data.pitching as leaderboard (leaderboard.abbreviation)}
				<div class="leaderboard">
					<h3>{leaderboard.name}</h3>
					<table>
						<thead>
							<tr>
								<th scope="col" class="rank">#</th>
								<th scope="col">Player</th>
								<th scope="col" class="value">{leaderboard.abbreviation}</th>
							</tr>
						</thead>
						<tbody>
							{#each leaderboard.leaders as leader (leader.playerId)}
								<tr>
									<td class="rank">{leader.tied ? 'T' : ''}{leader.rank}</td>
									<td>{leader.playerName} <span>{leader.teamName}</span></td>
									<td class="value">{leader.value}</td>
								</tr>
							{:else}
								<tr><td colspan="3">No statistics available.</td></tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/each}
		</div>
	</section>

	<footer>
		Data: <a href="https://statsapi.mlb.com/">MLB Stats API</a>
	</footer>
</main>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(html) {
		color-scheme: light dark;
	}

	:global(body) {
		margin: 0;
		background: #fff;
		color: #111;
		font-family: Courier, monospace;
		font-size: 13px;
		line-height: 1.35;
	}

	main {
		width: 100%;
		padding: clamp(0.5rem, 2vw, 2rem);
	}

	a {
		color: #00e;
		text-decoration: none;
	}

	a:hover,
	a:focus-visible {
		text-decoration: underline;
	}

	.site-header,
	.season-nav {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: end;
		gap: 1rem;
	}

	.site-header {
		grid-template-columns: 1fr auto;
		margin-bottom: 1.5rem;
	}

	.season-nav strong {
		text-align: center;
	}

	.next {
		text-align: right;
	}

	h1,
	h2 {
		text-align: center;
	}

	h1 {
		margin: 1.5rem 0;
		font-size: 1rem;
	}

	h2 {
		margin: 1.75rem 0 0.75rem;
		font-size: 1rem;
	}

	h3 {
		margin: 0 0 0.25rem;
		font-size: inherit;
	}

	section {
		container-type: inline-size;
	}

	.leaderboards {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: clamp(1rem, 2vw, 2rem);
	}

	@container (min-width: 44rem) {
		.leaderboards {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@container (min-width: 88rem) {
		.leaderboards {
			grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		}
	}

	.leaderboard {
		min-width: 0;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-variant-numeric: tabular-nums;
	}

	th,
	td {
		padding: 0.25rem 0.35rem;
		text-align: left;
	}

	th {
		border-bottom: 1px dashed currentColor;
	}

	tbody tr:nth-child(odd) {
		background: #f1f1f1;
	}

	.rank {
		width: 2.5rem;
		text-align: right;
	}

	.value {
		width: 5rem;
		text-align: right;
		font-weight: bold;
	}

	td span {
		display: inline-block;
		color: #777;
		white-space: nowrap;
	}

	footer {
		margin-top: 2rem;
		padding-top: 0.5rem;
		border-top: 1px dashed currentColor;
		text-align: center;
	}

	@media (prefers-color-scheme: dark) {
		:global(body) {
			background: #101010;
			color: #f5f5f5;
		}

		a {
			color: #9090ff;
		}

		tbody tr:nth-child(odd) {
			background: #202020;
		}

		td span {
			color: #888;
		}
	}
</style>
