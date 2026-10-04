<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.season} MLB {data.categoryName} Statistics | PlainTextStats</title>
	<meta
		name="description"
		content={`Complete Major League Baseball ${data.category} statistics for ${data.season}.`}
	/>
</svelte:head>

<main>
	<div class="page-header">
		<header class="site-header">
			<a href="/mlb">plaintextstats</a>
			<a href={`/mlb/${data.season}`}>{data.season} MLB</a>
		</header>

		<nav class="season-nav" aria-label="Season navigation">
			<span>
				{#if data.previousSeason}
					<a href={`/mlb/${data.previousSeason}/${data.category}`}>&lt; {data.previousSeason}</a>
				{/if}
			</span>
			<strong>{data.season} {data.categoryName}</strong>
			<span class="next">
				{#if data.nextSeason}
					<a href={`/mlb/${data.nextSeason}/${data.category}`}>{data.nextSeason} &gt;</a>
				{/if}
			</span>
		</nav>

		<h1>{data.season} MLB {data.categoryName}</h1>

		<nav class="category-nav" aria-label="Statistics category">
			{#if data.category === 'batting'}
				<strong aria-current="page">Batting</strong>
			{:else}
				<a href={`/mlb/${data.season}/batting`}>Batting</a>
			{/if}
			{#if data.category === 'pitching'}
				<strong aria-current="page">Pitching</strong>
			{:else}
				<a href={`/mlb/${data.season}/pitching`}>Pitching</a>
			{/if}
		</nav>

		<p class="summary">{data.rows.length} players · {data.columns.length} statistics</p>
	</div>

	<div class="table-scroll" role="region" aria-label={`${data.categoryName} statistics`}>
		<table>
			<thead>
				<tr>
					<th scope="col" class="player-column">Player</th>
					<th scope="col">Team</th>
					<th scope="col">Pos</th>
					{#each data.columns as column (column.key)}
						<th scope="col" class="value">{column.label}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data.rows as row (row.playerId)}
					<tr>
						<th scope="row" class="player">{row.playerName}</th>
						<td class="team">{row.teamName}</td>
						<td>{row.position}</td>
						{#each data.columns as column (column.key)}
							<td class="value">{row.stats[column.key] ?? '—'}</td>
						{/each}
					</tr>
				{:else}
					<tr><td colspan={data.columns.length + 3}>No statistics available.</td></tr>
				{/each}
			</tbody>
		</table>
	</div>

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
		--page-padding: clamp(0.5rem, 2vw, 2rem);
		--sticky-page-header-height: 10.2375rem;

		width: 100%;
		padding: var(--page-padding);
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
	}

	.season-nav strong {
		text-align: center;
	}

	.next {
		text-align: right;
	}

	.page-header {
		position: sticky;
		top: var(--page-padding);
		left: 0;
		z-index: 4;
		display: grid;
		gap: 1rem;
		width: 100%;
		padding-bottom: 0.5rem;
		isolation: isolate;
		background: #fff;
	}

	.page-header::before {
		position: absolute;
		top: calc(-1 * var(--page-padding));
		right: -100vw;
		bottom: 0;
		left: -100vw;
		z-index: -1;
		background: #fff;
		content: '';
	}

	h1 {
		margin: 0;
		font-size: 1rem;
		text-align: center;
	}

	.category-nav {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	.summary {
		margin: 0;
		color: #666;
	}

	.table-scroll {
		width: max-content;
		min-width: 100%;
	}

	table {
		width: max-content;
		min-width: 100%;
		border-collapse: separate;
		border-spacing: 0;
		font-variant-numeric: tabular-nums;
	}

	th,
	td {
		padding: 0.25rem 0.4rem;
		text-align: left;
		white-space: nowrap;
	}

	thead th {
		position: sticky;
		top: calc(var(--page-padding) + var(--sticky-page-header-height));
		z-index: 2;
		border-bottom: 1px dashed currentColor;
		background: #fff;
	}

	tbody tr:nth-child(odd) {
		background: #f1f1f1;
	}

	.player,
	.player-column {
		position: sticky;
		left: 0;
	}

	.player-column {
		z-index: 3;
	}

	.player {
		z-index: 1;
		background: #fff;
		font-weight: normal;
	}

	tbody tr:nth-child(odd) .player {
		background: #f1f1f1;
	}

	.team {
		color: #777;
	}

	.value {
		text-align: right;
	}

	footer {
		margin-top: 0.75rem;
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

		.summary,
		.team {
			color: #888;
		}

		.page-header,
		.page-header::before,
		h1,
		thead th,
		.player {
			background: #101010;
		}

		tbody tr:nth-child(odd),
		tbody tr:nth-child(odd) .player {
			background: #202020;
		}
	}
</style>
