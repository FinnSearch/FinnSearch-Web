<svelte:head>
	<title>AI Chat - FinnSearch</title>
	<meta content="Chat with our AI to find your perfect Finnish city" name="description" />
</svelte:head>

<script>
	import { onMount, tick, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { ArrowBigUp } from 'lucide-svelte';


	let messages = writable([]);
	let currentMessage = writable('');

	let websocket;
	let clientId = crypto.randomUUID();
	let isConnected = false;
	let userInput = $state('');
	let scrollContainer;

	let messageInProgress = true;
	let messageID = 0;

	let isThinking = $state(false);


	onMount(() => {
		const uuid = localStorage.getItem('uuid') || clientId;
		localStorage.setItem('uuid', uuid);
		websocket = new WebSocket(`ws://localhost:8000/ws/${clientId}`);

		websocket.onopen = () => {
			isConnected = true;
		};

		websocket.onclose = () => {
			isConnected = false;
		};

		websocket.onerror = () => {
			isConnected = false;
		};


		websocket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			isThinking = false;
			if (data.content)
				currentMessage.update(i => i + data.content);

			if (data.status && data.status === 'complete') {
				messageInProgress = true;
				messageID++;

				messages.update(msg => [
					...msg,
					{
						id: messageID,
						role: 'assistant',
						content: $currentMessage

					}
				]);
				currentMessage.set('');

			}
		};


	});


	function sendMessage() {
		if (userInput.trim()) {
			messageID++;
			messages.update(msg => [
				...msg,
				{
					id: messageID,
					role: 'user',
					content: userInput
				}
			]);

			isThinking = true;
			websocket.send(JSON.stringify({ content: userInput }));
			userInput = '';
		}
	}


	$effect.pre(() => {
		messages;
		const autoscroll = scrollContainer && scrollContainer.offsetHeight + scrollContainer.scrollTop > scrollContainer.scrollHeight - 200;

		if ($messages.length > 0) {
			tick().then(() => {
				scrollContainer.scrollTo({
					top: scrollContainer.scrollHeight,
					behavior: 'smooth',
				});
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
		style="height: calc(100vh - 275px); min-height: 400px;"
	>

		<div
			bind:this={scrollContainer}
			class="flex-1 overflow-y-auto p-4 pb-0"
		>

			{#each $messages as message (message.id)}
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

			{#if isThinking}
				<div class="pl-3 animate-pulse">...</div>
			{/if}


			<div class="h-4"></div> <!-- Extra space at bottom for better scrolling -->
		</div>


		<Separator />

		<!-- Message input area -->
		<form
			class="flex items-end gap-2 p-4"
			onsubmit={sendMessage}
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
					<ArrowBigUp class="h-5 w-5" />
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
		>
			Clear
		</Button>
	</div>
</div>

