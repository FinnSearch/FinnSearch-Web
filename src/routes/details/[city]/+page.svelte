<script>
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import {
		Hexagon,
		ChartNoAxesGantt,
		BriefcaseBusiness,
		Users,
		Cctv,
		Shield,
		GraduationCap,
		Building,
		Train,
		Dumbbell,
		School,
		Diamond, X,
		House,
		Hospital,
		ScanHeart,
		PlaneTakeoff, TentTree,
		Landmark,
		Clapperboard,
		Shapes,
		ReceiptEuro
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import 'leaflet/dist/leaflet.css';
	import Map from './Map.svelte';
	import { browser } from '$app/environment';
	import {PUBLIC_CITY_DATA_URL} from '$env/static/public';

	// Data states
	let demographicsData = $state([]);
	let safetyRating = $state(0)
	let unemploymentData = $state({ region: [], country: [] });
	let crimeData = $state([]);
	let generalData = $state([]);
	let trafficData = $state({ injuries: [], fatalities: [] });
	let isLoading = $state(true);
	let area = decodeURIComponent(page.url.pathname.split("/").pop());
	let lat = $state();
	let long = $state();

	const colorMap = {
		low: "fill-rose-500",
		average: "fill-orange-500",
		high: "fill-blue-500",
	};



	const iconMapping = {
		livingCost: ReceiptEuro,
		housingCost: House,
		safety: Shield,
		kindergartens: Shapes,
		schools: School,
		universities: GraduationCap,
		airports: PlaneTakeoff,
		trainStations: Train,
		clinics: ScanHeart,
		hospitals: Hospital,
		culturalLife: Landmark,
		entertainment: Clapperboard,
		outdoorActivities: TentTree,
		gyms: Dumbbell
	};

	// Helper for converting camelCase to Title Case
	function formatKey(key) {
		return key
			.replace(/([A-Z])/g, ' $1')
			.replace(/^./, (str) => str.toUpperCase());
	}



	// GraphQL builders
	function queryBuilder(area) {
		return `{ unemploymentRate(area: "${area}") { description value area timeframe } }`;
	}

	function queryBuilder_general(area) {
		return `{ detailedStats(area: "${area}")
		{
			livingCost
			housingCost
			safety
			latitude
			longitude
			kindergartens
			schools
			universities
			airports
			trainStations
			clinics
			hospitals
			culturalLife
			entertainment
			outdoorActivities
			gyms
		} }`;
	}

	function queryBuilder_population(area) {
		return `{ demographics(area: "${area}") { area description value } }`;
	}

	function queryBuilder_crime(area) {
		return `query crimes { crimes(area: "${area}") { description value area } }`;
	}

	function queryBuilder_safety_rating(area) {
		return `query safetyRating { safetyRating(area: "${area}") { value } }`;
	}

	function queryBuilder_traffic(area) {
		return `{ trafficAccidents(area: "${area}") { description value area timeframe } }`;
	}

	async function fetchData(query, endpoint=PUBLIC_CITY_DATA_URL) {
		try {
			const res = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ query })
			});
			const response = await res.json();
			return response.data;
		}
		catch (error) {
			console.log(error);
			return null;
		}
	}

	onMount(async () => {
		const query_unemployment = queryBuilder(area);
		const query_unemployment_total = queryBuilder('whole country');
		const query_crime = queryBuilder_crime(area);
		const query_population = queryBuilder_population(area);
		const query_traffic = queryBuilder_traffic(area);
		const query_safety_rating = queryBuilder_safety_rating(area);
		const query_general_stats = queryBuilder_general(area);

		function updataRecentCities(area) {
			let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
			if (recentCities.length > 0) {
				const hasCity = recentCities.some(city => city.toLowerCase() === area.toLowerCase());
				if (!hasCity) {
					recentCities.shift();
					recentCities.push(area.toLowerCase());
				}
			} else {
				recentCities.push(area);
			}
			localStorage.setItem("recentCities", JSON.stringify(recentCities));
		}

		updataRecentCities(area);


		// Fetch population data
		fetchData(query_population).then(data => {
			if (data?.demographics) {
				data.demographics.forEach(item => {
					if (item.description === "Population") {
						item.value = Math.round(item.value / 1000) + "k";
					}
				});
				demographicsData = data.demographics;
			}
		});

		fetchData(query_safety_rating).then(data => {
			if (data?.safetyRating) {
				safetyRating = data.safetyRating.value;
			}
		});

		fetchData(query_general_stats).then(data => {
			if (data?.detailedStats) {
				lat = data.detailedStats.latitude;
				long = data.detailedStats.longitude;

				// Format general data for display
				const { latitude, longitude, ...stats } = data.detailedStats;
				generalData = Object.entries(stats).map(([key, value]) => ({
					key,
					value,
					icon: iconMapping[key] || Building
				}));
			}
		});

		// Fetch crime data
		fetchData(query_crime).then(data => {
			if (data?.crimes) {
				const crimeCategories = [
					'Thefts', 'Robberies', 'Property', 'Life offence',
					'Sexual crimes', 'Public peace', 'Traffic hit-n-run', 'Traffic safety danger',
					'Drunken driving', 'Narcotics'
				];

				crimeData = data.crimes.map((item, index) => ({
					description: crimeCategories[index] || item.description,
					value: item.value
				}));
			}
		});

		fetchData(query_traffic).then(data => {
			if (data?.trafficAccidents) {
				trafficData.injuries = data.trafficAccidents
					.filter((_, index) => index % 2 === 1)
					.map(item => ({ timeframe: item.timeframe, value: item.value }));

				trafficData.fatalities = data.trafficAccidents
					.filter((_, index) => index % 2 === 0)
					.map(item => ({ timeframe: item.timeframe, value: item.value }));
			}
		});

		Promise.all([
			fetchData(query_unemployment),
			fetchData(query_unemployment_total)
		]).then(([regionData, totalData]) => {
			if (regionData && totalData) {
				unemploymentData.region = regionData.unemploymentRate.map((item, index, arr) => ({
					timeframe: item.timeframe,
					value: item.value,
					trend: index > 0 ? item.value - arr[index-1].value : 0
				}));

				unemploymentData.country = totalData.unemploymentRate.map((item) => ({
					timeframe: item.timeframe,
					value: item.value
				}));
			}
		}).finally(() => {
			isLoading = false;
		});
	});
</script>

<div class="p-0 sm:p-5 text-3xl font-quicksand font-black tracking-tight mb-4">City details: {area}</div>

<Tabs.Root class="w-full p-0 sm:p-5">
	<Tabs.List class="grid w-full grid-cols-2 sm:grid-cols-4">
		<Tabs.Trigger value="general">
			<ChartNoAxesGantt class="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2"/>
			<span class="text-xs sm:text-sm">General</span>
		</Tabs.Trigger>
		<Tabs.Trigger value="population">
			<Users class="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2"/>
			<span class="text-xs sm:text-sm">Population</span>
		</Tabs.Trigger>
		<Tabs.Trigger value="employment">
			<BriefcaseBusiness class="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2"/>
			<span class="text-xs sm:text-sm">Employment</span>
		</Tabs.Trigger>
		<Tabs.Trigger value="crime">
			<Cctv class="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2"/>
			<span class="text-xs sm:text-sm">Crime</span>
		</Tabs.Trigger>
	</Tabs.List>

	<!-- General Tab -->
	<Tabs.Content value="general">
		<Card.Root class="mt-4">
			<Card.Header>
				<Card.Title>City Overview</Card.Title>
				<Card.Description>Key metrics at a glance</Card.Description>
			</Card.Header>
			<Card.Content>
				{#if lat && long}
					<Map latitude={lat} longitude={long} />
				{:else}
					<div class="h-64 w-full bg-secondary rounded-lg flex items-center justify-center mb-6">
						<p class="text-muted-foreground">Loading map...</p>
					</div>
				{/if}




				<!-- City Amenities & Statistics -->
				<h3 class="text-xl font-semibold mb-4">City Amenities & Statistics</h3>
				{#if generalData.length > 0}
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{#each generalData as item}
							<div class="bg-secondary p-4 rounded-lg">
								<div class="flex items-center gap-2 mb-7.5">
									<item.icon class="h-5 w-5 text-muted-foreground"/>
									<div class="text-muted-foreground mb-1">{formatKey(item.key)}</div>
								</div>
								<div class="text-xl font-medium">
									{#if item.value === "none"}
										<X/>
									{:else}
										<Diamond class={item.value ? colorMap[item.value] : ""}/>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="py-8 text-center text-muted-foreground">Loading city data...</div>
				{/if}
			</Card.Content>
		</Card.Root>
	</Tabs.Content>

	<!-- Population Tab -->
	<Tabs.Content value="population">
		<Card.Root class="mt-4">
			<Card.Header>
				<Card.Title>Population Demographics</Card.Title>
				<Card.Description>Key demographic data for the area</Card.Description>
			</Card.Header>
			<Card.Content>
				{#if demographicsData.length > 0}
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{#each demographicsData as point}
							<div class="bg-secondary p-4 rounded-lg">
								<div class="text-sm text-muted-foreground mb-1">{point.description}</div>
								<div class="text-2xl font-bold">{point.value}</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="py-8 text-center text-muted-foreground">Loading demographic data...</div>
				{/if}
			</Card.Content>
		</Card.Root>
	</Tabs.Content>

	<!-- Employment Tab -->
	<Tabs.Content value="employment">
		<Card.Root class="mt-4">
			<Card.Header>
				<Card.Title>Unemployment Rate</Card.Title>
				<Card.Description>Comparing regional and national data</Card.Description>
			</Card.Header>
			<Card.Content>
				{#if !isLoading && unemploymentData.region.length > 0 && unemploymentData.country.length > 0}
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<!-- Current comparison -->
						<div class="bg-secondary p-6 rounded-lg">
							<h3 class="text-lg font-medium text-muted-foreground mb-8">Current Unemployment</h3>
							<div class="flex justify-around items-center">
								<div>
									<div class="text-sm text-muted-foreground mb-1">Region</div>
									<div class="text-3xl font-bold">{unemploymentData.region[unemploymentData.region.length - 1].value}%</div>
								</div>
								<div class="text-2xl font-bold mt-4">vs</div>
								<div>
									<div class="text-sm text-muted-foreground mb-1">Country</div>
									<div class="text-3xl font-bold">{unemploymentData.country[unemploymentData.country.length - 1].value}%</div>
								</div>
							</div>
						</div>

						<!-- Yearly trend -->
						<div class="bg-secondary p-6 rounded-lg">
							<h3 class="text-lg font-medium text-muted-foreground mb-4">Yearly Trend</h3>
							<div class="space-y-3">
								{#each unemploymentData.region as point, i}
									<div class="flex justify-between items-center border-b pb-2">
										<div class="font-medium">{point.timeframe}</div>
										<div class="flex items-center">
											{point.value}%
											{#if i > 0}
												{#if point.trend < 0}
													<span class="text-blue-400 ml-2">↓</span>
												{:else if point.trend > 0}
													<span class="text-red-400 ml-2">↑</span>
												{/if}
											{/if}
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{:else}
					<div class="py-8 text-center text-muted-foreground">Loading employment data...</div>
				{/if}
			</Card.Content>
		</Card.Root>
	</Tabs.Content>

	<!-- Crime Tab -->
	<Tabs.Content value="crime">
		<Card.Root class="mt-4">
			<Card.Header>
				<Card.Title>Crime Statistics</Card.Title>
				<Card.Description>Key safety metrics for the area</Card.Description>
			</Card.Header>
			<Card.Content>
				{#if crimeData.length > 0}
					<!-- Crime categories -->
					<div class="mb-8">
						<h3 class="text-lg font-medium mb-4">Crime by Category</h3>
						<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
							{#each crimeData as crime}
								<div class="bg-secondary p-4 rounded-lg">
									<div class="text-sm text-muted-foreground mb-1">{crime.description}</div>
									<div class="text-2xl font-bold">{crime.value}</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- Traffic accidents -->
					<div class="mt-8">
						<Card.Title class="mb-4">Traffic Accidents</Card.Title>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<!-- Injuries -->
							<div class="bg-secondary p-6 rounded-lg">
								<h3 class="text-lg font-medium mb-4">Injuries</h3>
								{#each trafficData.injuries as point}
									<div class="flex justify-between items-center border-b pb-2 mb-2">
										<div class="font-medium">{point.timeframe}</div>
										<div>{point.value}</div>
									</div>
								{/each}
							</div>

							<!-- Fatalities -->
							<div class="bg-secondary p-6 rounded-lg">
								<h3 class="text-lg font-medium mb-4">Fatalities</h3>
								{#each trafficData.fatalities as point}
									<div class="flex justify-between items-center border-b pb-2 mb-2">
										<div class="font-medium">{point.timeframe}</div>
										<div>{point.value}</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{:else}
					<div class="py-8 text-center text-muted-foreground">Loading crime data...</div>
				{/if}
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>