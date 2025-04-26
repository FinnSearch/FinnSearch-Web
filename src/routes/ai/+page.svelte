<script>
	// Svelte lifecycle and store utilities
	import { onMount, tick, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	// UI
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";


	import { ArrowBigUp, Eraser, House } from 'lucide-svelte';

	// Routing and i18n
	import { goto, replaceState } from '$app/navigation';
	import { t } from "$lib/i18n/store.js";


	import { PUBLIC_AI_URL } from '$env/static/public';

	// Chat state
	let messages = $state([
		{
			id: 0,
			role: 'assistant',
			content: $t('AI_assistant_welcome'),
		}
	]);

	let currentMessage = $state('');
	let websocket;
	let clientId = crypto.randomUUID();
	let isConnected = false;
	let userInput = $state('');
	let scrollContainer;

	let messageInProgress = true;
	let messageID = 0;

	let isThinking = $state(false);
	let tosDialog = $state(false);
	let firstMessageSend = false;

	// On mount
	onMount(() => {
		const uuid = localStorage.getItem('uuid') || clientId;
		const acceptedTOS = localStorage.getItem('acceptedTOS') || false;

		localStorage.setItem('uuid', uuid);
		tosDialog = !acceptedTOS;

		websocket = new WebSocket(`${PUBLIC_AI_URL}${clientId}`);

		// WebSocket listeners
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
			isThinking = false;

			// Append content to current message
			if (data.content) {
				currentMessage = currentMessage + data.content;
			}

			// Handle complete message with status
			if (data.status) {
				if (data.status === 'recommendations') {
					let cities = data.cities;
					currentMessage = "Recommended cities: " + cities.map(j => `${j.city} - ${j.similarity}%`).join(' | ');
				}

				messageInProgress = true;
				messageID++;

				messages = [
					...messages,
					{
						id: messageID,
						role: 'assistant',
						content: currentMessage,
					}
				];

				currentMessage = '';
			}
		};
	});


	function sendMessage() {
		if (userInput.trim()) {
			messageID++;

			if (!firstMessageSend) {
				messages = messages.filter(message => message.id !== 0);
				firstMessageSend = true;
			}

			messages = [
				...messages,
				{
					id: messageID,
					role: 'user',
					content: userInput,
				}
			];

			isThinking = true;
			websocket.send(JSON.stringify({ content: userInput }));
			userInput = '';
		}
	}

	function clearMessages() {
		websocket.send(JSON.stringify({ content: "clear_history"}));
		messages.length = 0;
	}

	// Auto-scroll to bottom on message update
	$effect.pre(() => {
		messages;
		if (messages.length > 0) {
			tick().then(() => {
				scrollContainer.scrollTo({
					top: scrollContainer.scrollHeight,
					behavior: 'smooth',
				});
			});
		}
	});
</script>

<!-- Main container -->
<div class="mx-auto max-w-4xl pb-20">
	<div class="mb-6">
		<h1 class="mb-2 mt-4 text-3xl font-bold tracking-tight">{$t('AIHeader')}</h1>
		<p class="text-muted-foreground">{$t('AI_description')}</p>
	</div>

	<!-- TOS Dialog -->
	{#if tosDialog}
		<AlertDialog.Root open={tosDialog}>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>{$t('AI_tos_header')}</AlertDialog.Title>
					<AlertDialog.Description>
						{$t('AI_tos_description')}
						<a href="https://mistral.ai/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel on:click={() => goto('/', { replaceState: true })}>
						{$t('AI_tos_close')}
					</AlertDialog.Cancel>
					<AlertDialog.Action on:click={() => {
						tosDialog = true;
						localStorage.setItem("acceptedTOS", "true");
					}}>
						{$t('AI_tos_continue')}
					</AlertDialog.Action>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	{/if}

	<!-- Chat window -->
	<div class="relative flex flex-col rounded-lg border bg-card text-card-foreground shadow" style="height: calc(98vh - 350px); min-height: 400px;">
		<div bind:this={scrollContainer} class="flex-1 overflow-y-auto p-4 pb-0">
			{#each messages as message (message.id)}
				<div class="mb-4 flex {message.role === 'assistant' ? 'justify-start' : 'justify-end'}">
					<div class="flex max-w-[80%] {message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}">
						<div class="flex-1">
							<div class="mb-2 font-medium text-left pl-3 {message.role === 'assistant' ? 'pl-3' : 'text-right pr-3'}">
								{#if message.role === 'assistant'}
									{$t('AI_role_assistant')}
								{:else}
									{$t('AI_role_user')}
								{/if}
							</div>
							<div class="text-muted-foreground rounded-lg p-3 bg-{message.role === 'assistant' ? 'transparent' : 'muted'}">
								{message.content}
							</div>
						</div>
					</div>
				</div>
			{/each}

			{#if isThinking}
				<div class="pl-3 animate-pulse">...</div>
			{/if}

			<div class="h-4"></div>
		</div>

		<Separator />

		<!-- Message input -->
		<form class="flex items-end gap-2 p-4" onsubmit={sendMessage}>
			<div class="relative flex-1">
				<Input
					bind:value={userInput}
					class="min-h-10 pr-10"
					placeholder={$t('AI_search')}
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

	<!-- Footer with action buttons -->
	<div class="mt-6 flex justify-between">
		<Button class="flex items-center gap-2 text-muted-foreground" href="/" variant="secondary">
			{$t('AI_home')}
		</Button>

		<p class="flex items-center text-center text-xs text-muted-foreground">
			Powered by the<br> Mistral-small model
		</p>

		<Button
			on:click={() => {clearMessages()}}
			class="text-muted-foreground"
			disabled={messages.length <= 2}
			variant="secondary">
			{$t('AI_clear')}
		</Button>
	</div>
</div>
