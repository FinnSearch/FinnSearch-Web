<svelte:head>
	<title>AI Chat - FinnSearch</title>
	<meta content="Chat with our AI to find your perfect Finnish city" name="description" />
</svelte:head>

<script>
	import { onMount, tick } from 'svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Send, ChevronDown } from 'lucide-svelte';

	// Chat state
	let messages = $state([
		{
			id: 1,
			role: 'assistant',
			content: 'Based on your preferences, I can help you find cities that match your lifestyle priorities. What specific aspects of city living are most important to you?'
		}
	]);
	let userInput = $state('');
	let scrollContainer;


	let nextId = 2;

	// Example responses for demo purposes
	const demoResponses = [
		'Great! Based on your preferences for affordability, public transportation, and tech jobs, here are some Finnish cities to consider:\n\n1. Tampere - Growing tech hub with moderate cost of living\n2. Oulu - Emerging tech scene with excellent affordability\n3. Turku - University city with strong job market\n\nWould you like more details about any of these cities?',
		'Tampere is Finland\'s second-largest urban area and a major tech hub. The city offers:\n\n• Affordable housing compared to Helsinki\n• Excellent public transit including trams and buses\n• Tech companies like Nokia, Telia, and numerous startups\n• Vibrant cultural scene with museums and music events\n• Beautiful location between two lakes\n\nThe average rent for a one-bedroom apartment is about €600-800 per month, significantly lower than Helsinki.',
		'Looking at climate considerations, Finnish cities experience four distinct seasons with cold winters. Tampere averages -8°C in January and 17°C in July. Snow typically covers the ground from December through March. Southern cities like Turku have slightly milder winters, while northern cities like Oulu experience longer, colder winters with less daylight during winter months.'
	];


	function handleSubmit() {
		if (!userInput.trim()) return;


		messages = [...messages, {
			id: nextId++,
			role: 'user',
			content: userInput
		}];


		userInput = '';


		// Simulation
		setTimeout(() => {

			const responseIndex = Math.floor(Math.random() * demoResponses.length);
			messages = [...messages, {
				id: nextId++,
				role: 'assistant',
				content: demoResponses[responseIndex]
			}];
		}, 1000);
	}


	function startOver() {
		messages = [
			{
				id: 1,
				role: 'assistant',
				content: 'Based on your preferences, I can help you find cities that match your lifestyle priorities. What specific aspects of city living are most important to you?'
			}
		];
		nextId = 2;


	}

	$effect.pre(() => {
		messages;
		const autoscroll = scrollContainer && scrollContainer.offsetHeight + scrollContainer.scrollTop > scrollContainer.scrollHeight - 200;

		if (autoscroll) {
			tick().then(() => {
				scrollContainer.scrollTo(0, scrollContainer.scrollHeight);
			});
		}
	});


</script>

<div class="mx-auto max-w-4xl pb-20">
	<div class="mb-6">
		<h1 class="mb-2 mt-4 text-3xl font-bold tracking-tight">Find with AI </h1>
		<p class="text-muted-foreground">
			Ask some questions to find the matching city
		</p>
	</div>

	<!-- Chat container with messages -->
	<div
		class="relative flex flex-col rounded-lg border bg-card text-card-foreground shadow"
		style="height: calc(100vh - 340px); min-height: 400px;"
	>
		<!-- Scrollable message area -->
		<div
			bind:this={scrollContainer}
			class="flex-1 overflow-y-auto p-4 pb-0"
		>

			{#each messages as message (message.id)}
				<div
					class="mb-4 flex {message.role === 'assistant' ? 'justify-start' : 'justify-end'}"
				>
					<div class="flex max-w-[80%] {message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}">


						<div class="flex-1">
							<div class="mb-2 font-medium text-left pl-3 {message.role === 'assistant' ? 'pl-3' : 'text-right pr-3'}">
								{message.role === 'assistant' ? 'Assistant' : 'You'}
							</div>
							<div
								class="text-muted-foreground rounded-lg p-3 bg-{message.role === 'assistant' ? 'transparent' : 'muted'}">
								{message.content}
							</div>
						</div>
					</div>

				</div>
			{/each}
			<div class="h-4"></div> <!-- Extra space at bottom for better scrolling -->
		</div>


		<Separator />

		<!-- Message input area -->
		<form
			class="flex items-end gap-2 p-4"
			on:submit|preventDefault={handleSubmit}
		>
			<div class="relative flex-1">
				<Input
					bind:value={userInput}
					class="min-h-10 pr-10"
					placeholder="Type your message here..."
				/>
				<Button
					class="absolute bottom-0 right-0 top-0 h-full rounded-l-none"
					disabled={!userInput.trim()}
					size="icon"
					type="submit"
					variant="ghost"
				>
					<Send class="h-4 w-4" />
				</Button>
			</div>
		</form>
	</div>


	<!-- Action buttons -->
	<div class="mt-6 flex justify-between">
		<Button
			class="flex items-center gap-2"
			href="/"
			variant="outline"
		>

			Home
		</Button>

		<Button
			disabled={messages.length <= 2}
			on:click={startOver}
		>
			Clear
		</Button>
	</div>
</div>

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>