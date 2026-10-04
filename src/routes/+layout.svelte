<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { navigating } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if navigating.to}
	<div class="loading-bar" role="progressbar" aria-label="Loading page">
		<span></span>
	</div>
{/if}

{@render children()}

<style>
	.loading-bar {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		width: 100%;
		height: 3px;
		overflow: hidden;
		background: rgb(0 0 238 / 20%);
	}

	.loading-bar span {
		display: block;
		width: 35%;
		height: 100%;
		background: #00e;
		animation: loading 1s ease-in-out infinite;
	}

	@keyframes loading {
		from {
			transform: translateX(-100%);
		}

		to {
			transform: translateX(300%);
		}
	}

	@media (prefers-color-scheme: dark) {
		.loading-bar {
			background: rgb(144 144 255 / 20%);
		}

		.loading-bar span {
			background: #9090ff;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.loading-bar span {
			width: 100%;
			animation: pulse 1s ease-in-out infinite alternate;
		}

		@keyframes pulse {
			from {
				opacity: 0.35;
			}

			to {
				opacity: 1;
			}
		}
	}
</style>
