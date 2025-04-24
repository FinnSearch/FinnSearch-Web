<script>
	import * as Card from '$lib/components/ui/card';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import Autoplay from 'embla-carousel-autoplay';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { BookCheck, Search, Sparkles, Shuffle, House } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from '../lib/i18n/store.js';
	import { goto } from '$app/navigation';
	import {PUBLIC_RANDOM_CITY_URL} from '$env/static/public'


	const plugin = Autoplay({ delay: 5000, stopOnInteraction: true });
	let recentCities = $state([]);
	let search = $state();
	let clientId = crypto.randomUUID();
	let isHoveringOnSuggestions = $state(false);

	let websocket;
	let isConnected = false;
	let search_cities = $state([]);
	let debounceTimeout;
	let suggestionsVisible = $state(false);

	function handleMouseEnter() {
		isHoveringOnSuggestions = true;
	}

	function handleMouseLeave() {
		isHoveringOnSuggestions = false;
	}

	onMount(() => {
		const uuid = localStorage.getItem('uuid') || clientId;
		localStorage.setItem('uuid', uuid);


		websocket = new WebSocket(`ws://localhost:8000/ws/get_city/${clientId}`);

		websocket.onopen = () => {
			isConnected = true;
		};

		websocket.onclose = () => {
			isConnected = false;
		};

		websocket.onerror = () => {
			isConnected = false;
			goto('/', { replaceState: true });
		};


		websocket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			if (data) {
				search_cities = Array.isArray(data) ? data : [data];
				suggestionsVisible = search_cities.length > 0 && search?.length > 0;
				console.log(data);
			}
		};

		document.addEventListener('click', handleClickOutside);


		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	function handleClickOutside(event) {
		const searchBox = document.getElementById('search-container');
		if (searchBox && !searchBox.contains(event.target) && !isHoveringOnSuggestions) {
			suggestionsVisible = false;
		}
	}

	function searchCities(pref) {
		clearTimeout(debounceTimeout);

		debounceTimeout = setTimeout(() => {
			if (pref) {
				websocket.send(pref);
			}
		}, 450);

	}


	async function randomCity() {
		try {
			const res = await fetch(PUBLIC_RANDOM_CITY_URL , {
				method: 'POST'
			});
			const data = await res.json();

			await goto(`/details/${data['city']}`);
		} catch (error) {

		}
	}


	function viewDetails(city) {
		const url = `/details/${city.toLowerCase()}`;
		setTimeout(() => {
			window.open(url, '_blank', 'noopener, noreferrer');
		}, 10);
	}

	onMount(() => {
		if (localStorage.getItem('recentCities')) {
			recentCities = JSON.parse(localStorage.getItem('recentCities'));

		} else {
			const defaultCities = ['Espoo', 'Oulu', 'Tampere', 'Rovaniemi', 'Kuopio'];
			localStorage.setItem('recentCities', JSON.stringify(defaultCities));
			recentCities = defaultCities;
		}
		console.log(recentCities);
	});
</script>

<div class="mx-auto max-w-4xl">
	<h1 class="mb-2 text-3xl font-quicksand font-black tracking-tight">{$t('mainHeader')}</h1>
	<p class="mb-6 text-muted-foreground">
		{$t('mainHeader_description')}
	</p>

	<div class="mb-8">
		<label class="mb-2 block text-sm font-medium" for="city-search">{$t('mainSearch_header')}</label>
		<div class="relative" id="search-container">
			<div class="relative flex items-center">
				<Input
					bind:value={search}
					class="w-full max-w-md pl-10"
					id="city-search"
					on:focus={() => { if (search && search.length > 0) suggestionsVisible = true }}
					on:input={() => searchCities(search)}
					placeholder={$t('mainSearch_placeholder')}
					type="search"
				/>

				<Button
					class="ml-2"
					on:click={() => {randomCity()}}
					size="icon"
					title="Random city"
					variant="ghost"
				>
					<Shuffle
						class="h-5 w-5 text-muted-foreground"
					/>
				</Button>
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<Search class="h-4 w-4 text-muted-foreground" />
				</div>
			</div>

			<!-- Search Suggestions -->
			{#if suggestionsVisible && search_cities.length > 0}
				<div
					class="absolute z-10 mt-5 w-full max-w-md rounded-md max-h-48 overflow-y-auto"
					transition:fade={{ duration: 200 }}
					onmouseenter={handleMouseEnter}
					onmouseleave={handleMouseLeave}
					role="listbox"
					tabindex="0"
				>
					{#each search_cities as city}

						<Button
							variant="secondary"
							class="text-left hover text-sm justify-start ml-7 cursor-pointer"
							on:click={() => {
										suggestionsVisible = false;
										goto(`/details/${city}`, { replaceState: false });
									}}
						>
							<House class="h-4 w-4 text-muted-foreground" />
							<span class="text-muted-foreground ml-2">{city}</span>
						</Button>

					{/each}

				</div>
			{/if}
		</div>
	</div>


	<div class='mt-20'>
		<h2 class="mb-4 text-xl font-semibold">
			{$t('mainCards_header')}
		</h2>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
			<Card.Root class="duration-150 dark:hover:border-[#D3D3CE] light hover:shadow-md">
				<Card.Header class="flex flex-row items-start gap-4 space-y-0">
					<div class="space-y-1">
						<div class="mb-7.5 flex h-10 w-10
                        items-center justify-center rounded-lg
                        border bg-card text-card-foreground"
						>
							<BookCheck class="h-5 w-5 text-muted-foreground" />
						</div>
						<Card.Title>{$t('mainQuiz_header')}</Card.Title>
						<Card.Description>
							{$t('mainQuiz_description')}
						</Card.Description>
					</div>
				</Card.Header>
				<Card.Footer class="mt-7.5">
					<Button href="/quiz">
						{$t('mainQuiz_button')}
					</Button>
				</Card.Footer>
			</Card.Root>

			<Card.Root class="duration-150 dark:hover:border-[#D3D3CE] light hover:shadow-md">
				<Card.Header class="flex flex-row items-start gap-4 space-y-0">
					<div class="space-y-1">
						<div
							class="mb-7.5 flex h-10 w-10 items-center justify-center rounded-lg border bg-card text-card-foreground">
							<Sparkles class="h-5 w-5 text-muted-foreground" />
						</div>
						<Card.Title>{$t('mainAI_header')}</Card.Title>
						<Card.Description>
							{$t('mainAI_description')}
						</Card.Description>
					</div>
				</Card.Header>
				<Card.Footer class="mt-7.5">
					<Button href="/ai">
						{$t('mainAI_button')}
					</Button>
				</Card.Footer>
			</Card.Root>
		</div>


		<Carousel.Root
			class="w-full mt-10"
			on:mouseleave={plugin.reset}
			on:mousenter={plugin.stop}
			plugins={[plugin]}
		>
			<Carousel.Content>
				{#each recentCities as city}
					<Carousel.Item>
						<div class="p-0.5">
							<Card.Root>
								<Card.Content
									class="flex flex-col h-[20vh] items-center justify-center font-quicksand"
								>
									<span class="text-4xl font-semibold">{city}</span>
									<Button variant="link" on:click={() => {viewDetails(city)}}
													class="pt-5 text-muted-foreground">{$t('viewDetails')}</Button>
								</Card.Content>
							</Card.Root>
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
</div>