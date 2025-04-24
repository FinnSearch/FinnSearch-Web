<script>
	import { t } from "$lib/i18n/store.js";
</script>

<div class="flex items-center space-x-2 mb-6">
	<a href="/" class="text-sm text-muted-foreground hover:text-foreground">Home</a>
	<span class="text-muted-foreground">/</span>
	<span class="text-sm">Quiz</span>
</div>

<h1 class="text-2xl font-bold tracking-tight mb-2">
	{$t("quizHeader")}
</h1>

<p class="text-muted-foreground mb-8">
	{$t("quizHeader_description")}
</p>