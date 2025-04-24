<script>
	import { page } from '$app/state';
	import '../app.css'; // Global styles
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Home, LockKeyhole, Star, Dice5, Moon, Sparkles, Sun } from 'lucide-svelte';
	import { onNavigate } from '$app/navigation';
	import * as Resizable from "$lib/components/ui/resizable/index.js";
	import {language} from '$lib/i18n/store.js';
	import {setLanguage} from '$lib/i18n/store.js';


	const lang = language;
	let currentLanguage = $state(language);
	const unsubscribe = lang.subscribe(value => {
		currentLanguage = value;
	})
	function changeLanguage() {
		setLanguage(currentLanguage === 'fi' ? 'en' : 'fi');
	}

	let { children } = $props();
	let clean_path = $state('');
	$effect (() => {clean_path = page.url.pathname.replace(/^\/|\/$/g, '') || 'FinnSearch'})
	const navs = [
		{ path: '/', label: 'Home', icon: Home },
		{ path: '/recommendations', label: 'Recommendations', icon: Star },
		{ path: '/ai', label: 'AI', icon: Sparkles },
		{ path: '/privacy-policy', label: 'Privacy Policy', icon: LockKeyhole }
	];




	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise(resolve => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});


</script>
<svelte:head>
	<title>{decodeURIComponent(clean_path)}</title>
</svelte:head>



<ModeWatcher />
<Resizable.PaneGroup
	direction="horizontal"
	class="min-h-screen w-20 rounded-lg border"
	autoSaveId="paneSize"
>

	<Resizable.Pane
		defaultSize={95}
		minSize={30}
		class="flex flex-col">
		<main class="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
			{@render children()}
		</main>
	</Resizable.Pane>

	<Resizable.Handle withHandle />


	<Resizable.Pane defaultSize={5} minSize={5}>

		<div class="flex flex-col h-full pt-5 border-l">

			<nav class="flex flex-1 flex-col items-center space-y-8 mt-4">
				{#each navs as item}
					<Button href={item.path}
									disabled={true}
									variant={page.url.pathname === item.path ? 'outline' : 'ghost'}
									size="icon"
									title={item.label}
									class="flex items-center rounded-lg text-muted-foreground">

						<item.icon class="h-5 w-5" />

					</Button>
				{/each}
				<Button aria-label="Change language"
								class="rounded-lg mt-auto mb-4"
								title="Change language"
								on:click={changeLanguage}
								size="icon"
								variant="ghost">
					{#if currentLanguage === 'fi'}
						<span class="text-muted-foreground">en</span>
						{:else}
							<span class="text-muted-foreground">fi</span>
					{/if}
				</Button>
				<Button aria-label="Change theme" title="Change theme" class="rounded-lg mb-4" on:click={toggleMode} size="icon" variant="ghost">
					<Sun class="h-5 w-5 text-muted-foreground scale-100 transition-all dark:scale-0" />
					<Moon class="h-5 w-5 text-muted-foreground absolute scale-0 transition-all dark:scale-100" />
				</Button>
			</nav>


		</div>
	</Resizable.Pane>
</Resizable.PaneGroup>








