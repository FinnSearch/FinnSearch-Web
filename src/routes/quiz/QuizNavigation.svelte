<script>
	import { Button } from "$lib/components/ui/button/index.js";
	import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-svelte';
	import * as Card from "$lib/components/ui/card/index.js";

	export let currentQuestion;
	export let goToPreviousQuestion;
	export let goToNextQuestion;
	export let isNextDisabled;
</script>

<div class="flex items-center justify-center space-x-4 mb-4">
	<Button
		variant="outline"
		size="icon"
		on:click={goToPreviousQuestion}
		disabled={currentQuestion === 1}
		aria-label="Previous Question"
	>
		<ArrowLeftIcon />
	</Button>

	<Card.Root class="flex-grow max-w-2xl">
		<slot></slot>
	</Card.Root>

	<Button
		size="icon"
		variant="outline"
		class="flex-shrink-0"
		on:click={goToNextQuestion}
		disabled={isNextDisabled}
		aria-label="Next Question"
	>
		<ArrowRightIcon />
	</Button>
</div>