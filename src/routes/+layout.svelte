<script>
  import { page } from '$app/state';
  import '../app.css'; // Global styles
  import { ModeWatcher, toggleMode } from 'mode-watcher';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Home, LockKeyhole, Moon, Sparkles, Sun } from 'lucide-svelte';
  import { onNavigate } from '$app/navigation';


  let { children } = $props();
	const navs = [
		{ path: '/', label: 'Home', icon: Home },
		{ path: '/ai', label: 'AI', icon: Sparkles },
		{ path: '/privacy-policy', label: 'Policy', icon: LockKeyhole }
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


<ModeWatcher />
<div class="flex min-h-screen">
	<aside class="fixed right-0 top-0 z-50 w-12 flex flex-col h-full pt-5">

		<nav class="flex flex-1 flex-col items-center space-y-8">
			{#each navs as item}
				<Button href={item.path}
								disabled={true}
								variant={page.url.pathname === item.path ? 'outline' : 'ghost'}
								size="icon"
								class="flex items-center rounded-lg text-muted-foreground">
					<item.icon class="h-5 w-5" />
				</Button>
			{/each}
			<Button aria-label="Toggle theme" class="rounded-lg" on:click={toggleMode} size="icon" variant="disabled">
				<Sun class="text-muted-foreground scale-100 transition-all dark:scale-0" />
				<Moon class="text-muted-foreground absolute scale-0 transition-all dark:scale-100" />
				<span class="sr-only">Toggle theme</span>
			</Button>
		</nav>
		<div class="flex flex-1 flex-col items-center space-y-8">

		</div>


	</aside>
	<main class="flex-1 overflow-y-auto mr-12 p-4 sm:p-6 md:p-8">
		{@render children()}

	</main>

</div>






