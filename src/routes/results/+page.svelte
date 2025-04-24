<svelte:head>
    <title>Results - FinnSearch</title>
</svelte:head>

<script>
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Skeleton } from "$lib/components/ui/skeleton";
    import { Building, House } from "lucide-svelte";
    import { quizResults } from '$lib/quiz/stores.svelte.js';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { redirect } from '@sveltejs/kit';
    import { t } from '$lib/i18n/store.js';

    let isLoading = true;


    // Open city details in new tab
    function viewDetails(city) {
        const url = `/details/${city.toLowerCase()}`;
        setTimeout(() => {
            window.open(url, "_blank", 'noopener, noreferrer');
        }, 10);
    }

    // Redirect to home if quizResults are missing
    onMount(async () => {
        try {
            if (quizResults && quizResults.length > 0) {
                isLoading = false;
                return;
            }
            isLoading = false;
        } catch (e) {
            isLoading = false;
            await redirect(302, '/');
        }
    });
</script>

<div class="max-w-3xl mx-auto">
    <!-- Breadcrumb navigation -->
    <div class="flex items-center space-x-2 mb-6">
        <a href="/" class="text-sm text-muted-foreground hover:text-foreground">Home</a>
        <span class="text-muted-foreground">/</span>
        <a href="/quiz" class="text-sm text-muted-foreground hover:text-foreground">Quiz</a>
        <span class="text-muted-foreground">/</span>
        <span class="text-sm">Results</span>
    </div>

    <h1 class="text-2xl font-bold tracking-tight mb-2">{$t("quizResults_header")}</h1>
    <p class="text-muted-foreground mb-8">{$t("quizResults_description")}</p>

    <div class="space-y-4">
        {#each quizResults as match}
            <Card.Root class="overflow-hidden">
                {#if isLoading}
                    <!-- Skeleton placeholder while loading -->
                    <div class="p-8">
                        <div class="flex items-start">
                            <div class="mr-5">
                                <Skeleton class="h-10 w-10 rounded-full" />
                            </div>
                            <div class="flex-1">
                                <div class="mb-1">
                                    <Skeleton class="h-5 w-20" />
                                </div>
                                <Skeleton class="mt-3 h-5 w-[20%]" />
                                <Skeleton class="mt-3 h-5 w-[75%]" />
                                <div class="mt-4 flex space-x-2">
                                    <Skeleton class="mt-3 h-10 w-[25%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                {:else}
                    <!-- Match card -->
                    <div class="p-8">
                        <div class="flex items-start">
                            <div class="mr-5">
                                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-background border">
                                    <House class="h-5 w-5 text-foreground" />
                                </div>
                            </div>
                            <div class="flex-1">
                                <div class="mb-1">
                                    <span class="text-blue-400/75">
                                        {match.similarity}{$t("quizResults_match")}
                                    </span>
                                </div>
                                <h3 class="text-lg font-quicksand font-semibold mb-1">
                                    {match.city}
                                </h3>
                                <div class="mt-4 flex space-x-2">
                                    <Button
                                      on:click={viewDetails(match.city)}
                                      variant="outline"
                                      class="px-4"
                                    >
                                        {$t('viewDetails')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}
            </Card.Root>
        {/each}
    </div>

    <!-- Navigation buttons -->
    <div class="mt-8 flex justify-center space-x-8">
        <Button href="/" variant="outline">← Home</Button>
        <Button href="/quiz">Take quiz again</Button>
    </div>
</div>
