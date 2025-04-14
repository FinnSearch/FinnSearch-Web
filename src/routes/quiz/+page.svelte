<svelte:head>
    <title>Quiz - FinnSearch</title>
</svelte:head>

<script>
    import { onMount } from "svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { RadioGroup, RadioGroupItem } from "$lib/components/ui/radio-group/index.js";
    import { Checkbox } from "$lib/components/ui/checkbox";



    import {
        CloudMoon,
        GraduationCap,
        Building,
        ChartCandlestick,
        Stethoscope,
        Luggage,
        UsersRound,
        Waypoints,
        DiamondPercent,
        BriefcaseBusiness,
        ShieldAlert,
        Thermometer,
        ThermometerSnowflake,
        House,
        Building2,
        School,
        SquareX,
        Coins,
        PiggyBank,
        BadgeEuro,
        Gem,
        ShieldOff,
        ShieldHalf,
        ShieldCheck,
        ScanHeart,
        Hospital,
        Bus,
        PlaneTakeoff,
        Bike,
        Train,
        PartyPopper,
        Landmark,
        TentTree,
        Briefcase,
        Cloudy,

    } from "lucide-svelte";

    // Quiz state
    let currentQuestion = 1;
    let totalQuestions = 10;
    let answers = {};

    // Questions structure
    const questions = [

        {
            id: 1,
            singleSelect: true,
            icon: Building,
            title: "Type of City",
            str_id: "city_type",
            question: "What type of city do you prefer?",
            options: [
                { id: "rural", label: "Rural", description: "Quiet and close to nature", icon: TentTree },
                { id: "medium", label: "Medium", description: "Balanced lifestyle and amenities", icon: House },
                { id: "big", label: "Big City", description: "Fast-paced, high population", icon: Building2 },
            ]
        },

        {
            id: 2,
            icon: CloudMoon,
            singleSelect: false,
            title: "Climate Preference",
            str_id: "climate",
            question: "What type of climate do you prefer?",
            options: [
                { id: "warm", label: "Warm", description: "Warm locations", icon: Thermometer },
                { id: "moderate", label: "Moderate", description: "Mild temperatures with distinct seasons", icon: Cloudy },
                { id: "cool", label: "Cool", description: "North locations", icon: ThermometerSnowflake },
            ]
        },


        {
            id: 3,
            icon: GraduationCap,
            singleSelect: true,
            title: "Family and Education",
            str_id: "education_nearby",
            question: "How important are schools, kindergartens, and parks nearby?",
            options: [
                { id: "not-important", label: "Not Important", description: "Family amenities aren't a priority", icon: SquareX },
                { id: "important", label: "Important", description: "Some family infrastructure is needed", icon: School },
                { id: "very-important", label: "Very Important", description: "Top priority for family-friendly areas", icon: ShieldCheck }
            ]
        },

        {
            id: 4,
            icon: ChartCandlestick,
            singleSelect: true,
            title: "Cost of Living",
            str_id: "cost_of_living",
            question: "What cost of living do you prefer?",
            options: [
                { id: "low", label: "Low", description: "Affordable daily expenses", icon: Coins },
                { id: "average", label: "Average", description: "Standard cost, neither cheap nor expensive", icon: PiggyBank },
                { id: "high", label: "High", description: "Willing to spend more for location/lifestyle", icon: Gem }
            ]
        },

        {
            id: 5,
            icon: ShieldAlert,
            singleSelect: true,
            title: "Safety and Security",
            str_id: "safety_score",
            question: "How important is safety and security?",
            options: [
                { id: "not-important", label: "Not Important", description: "Safety is not a key concern", icon: ShieldOff },
                { id: "important", label: "Important", description: "Some level of security is expected", icon: ShieldHalf },
                { id: "very-important", label: "Very Important", description: "A very safe area is essential", icon: ShieldCheck }
            ]
        },

        {
            id: 6,
            icon: Stethoscope,
            singleSelect: true,
            title: "Medical Access",
            str_id: "medical_access",
            question: "How important is access to medical facilities?",
            options: [
                { id: "not-important", label: "Not Important", description: "Medical access is not a major factor", icon: SquareX },
                { id: "important", label: "Important", description: "Some nearby healthcare is necessary", icon: ScanHeart },
                { id: "very-important", label: "Very Important", description: "Quick access to hospitals and clinics is crucial", icon: Hospital },
            ]
        },

        {
            id: 7,
            icon: Luggage,
            singleSelect: false,
            title: "Hubs and Accessibility",
            str_id: "hubs_nearby",
            question: "Which types of transportation are important to you?",
            options: [
                { id: "buses", label: "Buses", description: "Reliable local bus networks", icon: Bus },
                { id: "trains", label: "Trains", description: "Access to intercity or metro trains", icon: Train },
                { id: "airports", label: "Airports", description: "Close to national/international airports", icon: PlaneTakeoff },
                { id: "cycling", label: "Cycling", description: "Bike-friendly infrastructure", icon: Bike }
            ]
        },

        {
            id: 8,
            icon: UsersRound,
            singleSelect: false,
            title: "Social Life and Activities",
            str_id: "social_life",
            question: "Which type of social or cultural life matters to you most?",
            options: [
                { id: "nightlife", label: "Nightlife/Parties", description: "Bars, clubs, late-night culture", icon: PartyPopper },
                { id: "cultural", label: "Cultural Life", description: "Museums, theaters, exhibitions", icon: Landmark },
                { id: "outdoors", label: "Outdoor Activities", description: "Hiking, parks, nature", icon: TentTree },
            ]
        },

        {
            id: 9,
            icon: DiamondPercent,
            title: "Housing Prices",
            str_id: "housing_price",
            singleSelect: true,
            question: "What kind of housing prices do you prefer?",
            options: [
                { id: "low", label: "Low", description: "Affordable housing market", icon: Coins },
                { id: "average", label: "Average", description: "Mid-range prices", icon: BadgeEuro },
                { id: "high", label: "High", description: "Premium or upscale market", icon: Gem }
            ]
        },

        {
            id: 10,
            icon: BriefcaseBusiness,
            singleSelect: true,
            title: "Employment Opportunities",
            str_id: "employment_rate",
            question: "How important is access to job opportunities?",
            options: [
                { id: "not-important", label: "Not Important", description: "Not currently job hunting", icon: SquareX },
                { id: "important", label: "Important", description: "Decent job options nearby", icon: Waypoints },
                { id: "very-important", label: "Very Important", description: "Strong job market is essential", icon: Briefcase }
            ]
        }



    ];

    // Current question data
    $: currentQuestionData = questions.find(q => q.id === currentQuestion) || questions[0];
    $: selectedOption = answers[currentQuestion] || null;


    function saveAnswers() {
        sessionStorage.setItem("answers", JSON.stringify(answers));
    }

    function handleSelectionChange(value) {
        answers[currentQuestion] = value;
        selectedOption = value;
        saveAnswers();
    }


    onMount (() => {
        const savedAnswers = sessionStorage.getItem("answers");
        if (savedAnswers) {
            console.log(savedAnswers);
            answers = JSON.parse(savedAnswers);
            selectedOption = answers[currentQuestion];
        }
    });




    function goToNextQuestion() {
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            console.log(answers);

        } else {
            submitQuiz();
        }
    }

    function goToPreviousQuestion() {
        if (currentQuestion > 1) {
            currentQuestion--;
        }
    }


    function submitQuiz() {

        window.location.href = "/results";
    }
</script>

<div class="max-w-2xl mx-auto">
    <div class="flex items-center space-x-2 mb-6">
        <a href="/" class="text-sm text-muted-foreground hover:text-foreground">Home</a>
        <span class="text-muted-foreground">/</span>
        <span class="text-sm">Quiz</span>
    </div>

    <h1 class="text-2xl font-bold tracking-tight mb-2">City Preference Quiz</h1>
    <p class="text-muted-foreground mb-8">Answer a few questions to help us find your perfect city match</p>
    {#key currentQuestion}
    <Card.Root class="mb-8">
        <Card.Header>
            <div class="flex items-center justify-center mb-2">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <svelte:component this={currentQuestionData.icon || Thermometer} class="h-5 w-5 text-foreground" />
                </div>
            </div>
            <div class="text-center">
                <h3 class="font-medium text-lg">{currentQuestionData.title}</h3>
                <Card.Title class="mb-1">Question {currentQuestion} of {totalQuestions}</Card.Title>
                <Card.Description>{currentQuestionData.question}</Card.Description>
            </div>
        </Card.Header>
        <Card.Content class="pt-4">
            {#if currentQuestionData.singleSelect === true}
            <RadioGroup
                    value = {answers[currentQuestion]}
                    onValueChange = {(value)=>handleSelectionChange(value)}
            >
                {#each currentQuestionData.options as option}
                    <label
                            class="flex items-center space-x-2 mb-4 p-3 rounded-md hover:bg-muted cursor-pointer"
                            for={option.id}
                    >
                        <RadioGroupItem value={option.id} id={option.id} />
                        <div class="flex items-center mr-3">
                            <svelte:component this={option.icon} class="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div class="flex-1">
                            <Label for={option.id} class="font-medium">{option.label}</Label>
                            <p class="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                    </label>
                {/each}
            </RadioGroup>
            {:else}
                {#each currentQuestionData.options as option}
                    <label
                            class="flex items-center space-x-2 mb-4 p-3 rounded-md hover:bg-muted"
                            for={option.id}>
                        <Checkbox id={option.id}
                                  checked={answers[currentQuestion] && answers[currentQuestion].includes(option.id)}
                                  onCheckedChange={() => {
                                            if (!answers[currentQuestion]) {
                                                answers[currentQuestion] = [];
                                            }

                                            if (answers[currentQuestion].includes(option.id)) {
                                                answers[currentQuestion] = answers[currentQuestion].filter(id => id !== option.id);
                                            } else {
                                                answers[currentQuestion] = [...answers[currentQuestion], option.id];
                                            }

                                            sessionStorage.setItem("answers", JSON.stringify(answers));
                                  }}


                        />
                        <div class="flex items-center mr-3">
                            <svelte:component this={option.icon} class="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div class="flex-1">
                            <Label for={option.id} class="font-medium">{option.label}</Label>
                            <p class="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                    </label>
                {/each}
            {/if}

        </Card.Content>
        <Card.Footer class="flex justify-between">
            <Button variant="outline" on:click={goToPreviousQuestion} disabled={currentQuestion===1}>Back</Button>
            <div class="text-sm text-muted-foreground self-center">Progress: {currentQuestion}/{totalQuestions}</div>
            <Button on:click={goToNextQuestion} disabled={!selectedOption}>
                {currentQuestion === totalQuestions ? 'Finish' : 'Next'}
            </Button>
        </Card.Footer>
    </Card.Root>
        {/key}
</div>