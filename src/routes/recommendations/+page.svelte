<script>
	import {
		Coins,
		GraduationCap,
		HousePlus,
		Briefcase,
		ShieldCheck,
		ChevronRight,
		X,
		BriefcaseBusiness
	} from 'lucide-svelte';
	import * as Card from "$lib/components/ui/card";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from '$lib/components/ui/button/index.js';
	import { onMount } from 'svelte';
	import {PUBLIC_RECOMMENDED_URL} from '$env/static/public';

	// State management
	let categories = $state([]);
	let selectedCategory_cities = $state([]);
	let selectedCity = $state(null);
	let isDialogOpen = $state(false);

	// Category icon mapping
	const categoryIcons = {
		"Best for students": GraduationCap,
		"Cheapest housing": HousePlus,
		"High employment rate": BriefcaseBusiness,
		"High safety": ShieldCheck,
		"Low cost of living": Coins
	};


	onMount(async () => {
		try {
			const res = await fetch(PUBLIC_RECOMMENDED_URL, {
				method: "POST"
			});

			const data = await res.json();
			categories = Object.entries(data).map(([title, cities]) => ({
				title,
				cities,
				icon: categoryIcons[title] || null,
			}));
		} catch(error) {
			console.error("Failed to fetch city data:", error);
		}
	});






	let open = $state(false);
	function setCategoryCities(cities) {
		selectedCategory_cities = cities;
		open = true;
	}

</script>

<div class="mx-auto max-w-4xl">
	<header>
		<h1 class="text-3xl font-quicksand font-bold tracking-tight">Find your perfect Finnish City</h1>
		<p class="mt-2 text-muted-foreground">
			Discover cities that match your lifestyle preferences and priorities
		</p>
	</header>



	<section class="mt-6">
		<h2 class="mb-6 text-xl font-medium">Explore categories</h2>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each categories as category}
				<Card.Root
					class="border rounded-lg p-5 cursor-pointer hover:shadow-md transition-all duration-200 dark:hover:border-primary"
					on:click={() => setCategoryCities(category.cities)}
				>
					<div class="flex flex-col h-full">
						<div class="mb-7.5 flex h-10 w-10 items-center justify-center rounded-lg border text-card-foreground">
							{#if category.icon}
								<category.icon class="text-muted-foreground" />
							{/if}
						</div>

						<Card.Title class="">{category.title}</Card.Title>
					</div>
				</Card.Root>
			{/each}
		</div>
	</section>
</div>

	{#if open}
		<Dialog.Root open={open} onOpenChange={() => {open = false}}>

			<Dialog.Content class="max-w-md w-full max-h-[80vh]">
				<Dialog.Header>
					<Dialog.Title>Recommended cities</Dialog.Title>
					<Dialog.Description>
						Select a city to view more details
					</Dialog.Description>
				</Dialog.Header>
				<div class="py-4 max-h-[50vh] overflow-y-auto">
					<ul class="space-y-2">
						{#each selectedCategory_cities as city}
							<li>
								<div class="flex justify-center items-center">
									<Button
										class="w-[75%]"
										variant="outline"
										href={`/details/${encodeURIComponent(city)}`}
									>
										{city}

									</Button>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			</Dialog.Content>
	</Dialog.Root>
{/if}