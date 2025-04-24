<script>
	import { Label } from "$lib/components/ui/label/index.js";
	import { Checkbox } from "$lib/components/ui/checkbox";

	export let option;
	export let language;
	export let checked;
	export let onCheckedChange;
</script>

<label
	class="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted cursor-pointer transition-colors"
	for={option.id}
>
	<Checkbox
		id={option.id}
		{checked}
		onCheckedChange={onCheckedChange}
	/>

	<div class="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50 flex-shrink-0">
		<option.icon class="h-5 w-5 text-foreground"/>
	</div>
	<div class="flex-1">
		<Label for={option.id} class="font-medium block">
			{$language === 'en' ? option.label : option.label_fi}
		</Label>
		<p class="text-sm text-muted-foreground">
			{$language === 'en' ? option.description : option.description_fi}
		</p>
	</div>
</label>