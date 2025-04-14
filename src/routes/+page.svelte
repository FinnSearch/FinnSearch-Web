<svelte:head>
	<title>Home - FinnSearch</title>
</svelte:head>

<script>
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from '$lib/components/ui/button/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { FileText, Search, Sparkles } from 'lucide-svelte';
</script>

<div class="mx-auto max-w-4xl">
	<h1 class="mb-2 text-3xl font-bold tracking-tight">Find Your Perfect Finnish City</h1>
	<p class="mb-6 text-muted-foreground">
		Discover cities that match your lifestyle preferences and priorities
	</p>

	<div class="mb-8">
		<label class="mb-2 block text-sm font-medium" for="city-search">Search cities</label>
		<div class="relative">
			<Input
				class="w-full max-w-md pl-10"
				id="city-search"
				placeholder="Enter city name"
				type="search"
			/>
			<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
				<Search class="h-4 w-4 text-muted-foreground" />
			</div>
		</div>
	</div>

	<div>
		<h2 class="mb-4 text-xl font-semibold">Discovery Options</h2>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
			<Card.Root class="duration-150 dark:hover:border-[#D3D3CE] light hover:shadow-md">
				<Card.Header class="flex flex-row items-start gap-4 space-y-0">
					<div class="space-y-1">
						<div class="mb-7.5 flex h-10 w-10
                        items-center justify-center rounded-lg
                        border bg-card text-card-foreground"
						>
							<FileText class="h-5 w-5 text-muted-foreground" />
						</div>
						<Card.Title>Find by Quiz</Card.Title>
						<Card.Description>
							Answer questions to find your ideal city
						</Card.Description>
					</div>
				</Card.Header>
				<Card.Footer class="mt-7.5">
					<Button href="/quiz">Start Quiz</Button>
				</Card.Footer>
			</Card.Root>

			<Card.Root class="duration-150 dark:hover:border-[#D3D3CE] light hover:shadow-md">
				<Card.Header class="flex flex-row items-start gap-4 space-y-0">
					<div class="space-y-1">
						<div
							class="mb-7.5 flex h-10 w-10 items-center justify-center rounded-lg border bg-card text-card-foreground">
							<Sparkles class="h-5 w-5 text-muted-foreground" />
						</div>
						<Card.Title>Find with AI</Card.Title>
						<Card.Description>
							Let our AI suggest cities based on your preferences
						</Card.Description>
					</div>
				</Card.Header>
				<Card.Footer class="mt-7.5">
					<Button href="/ai">Try AI</Button>
				</Card.Footer>
			</Card.Root>
		</div>
	</div>
</div>