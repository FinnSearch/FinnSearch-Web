<script>
	import { t } from "$lib/i18n/store.js";

	export let currentQuestion;
	export let totalQuestions;
</script>

<div class="text-center text-sm text-muted-foreground">
	{$t('quizProgress_progress')} {currentQuestion}/{totalQuestions}
</div>