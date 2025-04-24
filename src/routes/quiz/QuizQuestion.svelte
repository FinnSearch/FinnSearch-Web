<script>
	import * as Card from "$lib/components/ui/card/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { RadioGroup, RadioGroupItem } from "$lib/components/ui/radio-group/index.js";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { language } from "$lib/i18n/store.js";
	import QuizOptionRadio from './QuizOptionRadio.svelte';
	import QuizOptionCheckbox from './QuizOptionCheckbox.svelte';

	export let currentQuestionData;
	export let answers;
	export let importanceAnswers;
	export let handleSelectionChange;
	export let handleCheckboxChange;
</script>

<Card.Header>
	<div class="flex items-center justify-center mb-2">
		<div class="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
			<currentQuestionData.icon class="h-6 w-6 text-foreground"/>
		</div>
	</div>
	<div class="text-center">
		<h3 class="font-semibold text-xl mb-1">
			{$language === 'en' ? currentQuestionData.title : currentQuestionData.title_fi}
		</h3>
		<Card.Description>
			{$language === 'en' ? currentQuestionData.question : currentQuestionData.question_fi}
		</Card.Description>
	</div>
</Card.Header>

<Card.Content class="pt-4">
	{#if currentQuestionData.singleSelect === true}
		<RadioGroup
			value={currentQuestionData.importance ?
                importanceAnswers[currentQuestionData.str_id] :
                answers[currentQuestionData.id]}
			onValueChange={(value) => handleSelectionChange(value)}
			class="space-y-2"
		>
			{#each currentQuestionData.options as option}
				<QuizOptionRadio {option} {language} />
			{/each}
		</RadioGroup>
	{:else}
		<div class="space-y-2">
			{#each currentQuestionData.options as option}
				<QuizOptionCheckbox
					{option}
					{language}
					checked={answers[currentQuestionData.id] &&
                            answers[currentQuestionData.id].includes(option.id)}
					onCheckedChange={() => handleCheckboxChange(option.id)}
				/>
			{/each}
		</div>
	{/if}
</Card.Content>