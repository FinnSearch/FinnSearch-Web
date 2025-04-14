<svelte:head>
    <title>Results - FinnSearch</title>
</svelte:head>

<script>
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Building } from "lucide-svelte";


    const cityMatches = [
        {
            city: "Barcelona, Spain",
            matchPercentage: 98,
            description: "Vibrant coastal city with rich culture, architecture, and Mediterranean lifestyle."
        },
        {
            city: "Melbourne, Australia",
            matchPercentage: 92,
            description: "Cultural hub with diverse neighborhoods, great coffee, and artistic atmosphere."
        },
        {
            city: "Berlin, Germany",
            matchPercentage: 87,
            description: "Creative metropolis with rich history, affordable living, and vibrant nightlife."
        },
        {
            city: "Lisbon, Portugal",
            matchPercentage: 84,
            description: "Coastal city with historic charm, sunny climate, and relaxed Mediterranean vibe."
        },
        {
            city: "Prague, Czech Republic",
            matchPercentage: 79,
            description: "Fairytale city with stunning architecture, rich history, and vibrant cultural scene."
        }
    ];

    // Function to save a city to favorites
    function saveCity(city) {
        // In a real app, this would save to local storage or a database
        alert(`Added ${city} to favorites!`);
    }
</script>

<div class="max-w-3xl mx-auto">
    <div class="flex items-center space-x-2 mb-6">
        <a href="/" class="text-sm text-muted-foreground hover:text-foreground">Home</a>
        <span class="text-muted-foreground">/</span>
        <a href="/quiz" class="text-sm text-muted-foreground hover:text-foreground">Quiz</a>
        <span class="text-muted-foreground">/</span>
        <span class="text-sm">Results</span>
    </div>

    <h1 class="text-2xl font-bold tracking-tight mb-2">Your Perfect City Matches</h1>
    <p class="text-muted-foreground mb-8">Based on your lifestyle preferences, we've found these cities that match your criteria.</p>

    <div class="space-y-4">
        {#each cityMatches as match}
            <Card.Root class="overflow-hidden">
                <div class="p-8">
                    <div class="flex items-start">
                        <div class="mr-5">
                            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-background border">
                                <Building class="h-5 w-5 text-foreground" />
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="mb-1">
                                <span class="text-blue-500 font-medium">{match.matchPercentage}% Match</span>
                            </div>
                            <h3 class="text-lg font-semibold mb-1">{match.city}</h3>
                            <p class="text-muted-foreground">{match.description}</p>

                            <div class="mt-4 flex space-x-2">
                                <Button variant="default" class="px-4">View Details</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card.Root>
        {/each}
    </div>

    <div class="mt-8 flex justify-center space-x-8">
        <Button href="/" variant="outline"> ← Home</Button>
        <Button href="/quiz">Take quiz again</Button>
    </div>
</div>