<script>
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import { quizResults } from '$lib/quiz/stores.svelte.js';
    import { language, t } from "$lib/i18n/store.js";
    import QuizHeader from "./QuizHeader.svelte";
    import QuizNavigation from "./QuizNavigation.svelte";
    import QuizQuestion from "./QuizQuestion.svelte";
    import QuizProgress from "./QuizProgress.svelte";
    import { questions } from "$lib/quiz/questions.js";
    import { PUBLIC_CITY_SELECTION_URL } from '$env/static/public';

    let currentQuestion = 1;
    let answers = {};
    let importanceAnswers = {};

    const totalQuestions = questions.length;

    // Reactive
    $: currentQuestionData = questions.find(q => q.id === currentQuestion) || questions[0];
    $: selectedOption = answers[currentQuestion] || null;
    $: isNextDisabled = getNextButtonDisabledState(currentQuestionData, answers, importanceAnswers);

    // "Next" button should be disabled
    function getNextButtonDisabledState(questionData, answers, importanceAnswers) {
        if (questionData.singleSelect) {
            return questionData.importance
              ? !importanceAnswers[questionData.str_id]
              : !answers[questionData.id];
        } else {
            return !(answers[questionData.id] && answers[questionData.id].length > 0);
        }
    }

    function saveAnswers() {
        sessionStorage.setItem("answers", JSON.stringify(answers));
        sessionStorage.setItem("importanceAnswers", JSON.stringify(importanceAnswers));
    }

    // single-select or importance-based input
    function handleSelectionChange(value) {
        if (currentQuestionData.importance) {
            importanceAnswers[currentQuestionData.str_id] = value;
        } else {
            answers[currentQuestion] = value;
        }
        selectedOption = value;
        saveAnswers();
    }

    // multi-select input (checkboxes)
    function handleCheckboxChange(optionId) {
        if (!answers[currentQuestion]) {
            answers[currentQuestion] = [];
        }

        if (answers[currentQuestion].includes(optionId)) {
            answers[currentQuestion] = answers[currentQuestion].filter(id => id !== optionId);
        } else {
            answers[currentQuestion] = [...answers[currentQuestion], optionId];
        }

        answers = answers;
        saveAnswers();
    }

    // previous answers from sessionStorage
    onMount(() => {
        const savedAnswers = sessionStorage.getItem("answers");
        const savedImportance = sessionStorage.getItem("importanceAnswers");

        if (savedAnswers) {
            answers = JSON.parse(savedAnswers);
            selectedOption = answers[currentQuestion];
        }

        if (savedImportance) {
            importanceAnswers = JSON.parse(savedImportance);
        }
    });

    async function goToNextQuestion() {
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
        } else {
            await submitQuiz();
        }
    }

    function goToPreviousQuestion() {
        if (currentQuestion > 1) {
            currentQuestion--;
        }
    }

    // importance value for each field
    function getImportanceValue(category) {
        const defaultImportance = 0.5;

        // Full match
        for (const key in importanceAnswers) {
            if (importanceAnswers[key] === category) {
                return 1.0;
            }
        }

        // Group match
        const categoryGroups = {
            medical: ["hospital", "clinic"],
            education: ["kindergarten", "school", "university"],
            recreation: ["gym", "park_nearby", "lake_nearby"]
        };

        for (const key in importanceAnswers) {
            const selectedGroup = importanceAnswers[key];
            if (categoryGroups[selectedGroup]?.includes(category)) {
                return 0.8;
            }
        }

        return defaultImportance;
    }

    // Final quiz submission logic
    async function submitQuiz() {
        const result = {};

        // Single-select fields
        processQuestionData("city_type", result);
        processQuestionData("climate", result);
        processQuestionData("location", result);
        processQuestionData("employment_need", result);
        processQuestionData("safety", result);
        processQuestionData("cost_of_living", result);
        processQuestionData("housing_price", result);

        // Multi-select fields
        processMultiSelectData("transportation", result);
        processMultiSelectData("medical_facilities", result);
        processMultiSelectData("education_facilities", result);
        processMultiSelectData("fitness_recreation", result);
        processMultiSelectData("social_cultural", result);

        try {
            const prefs = await sendPrefs(result);

            if (Array.isArray(prefs)) {
                quizResults.push(...prefs);
            } else {
                console.error("Expected array from API but got:", prefs);
                quizResults.length = 0;
            }

            await goto('/results');
        } catch (error) {
            console.error("Error submitting quiz:", error);
        }
    }

    // Helper for single-select answers
    function processQuestionData(strId, result) {
        const question = questions.find(q => q.str_id === strId);
        if (!question) return;

        const answer = answers[question.id];
        if (!answer) return;

        const selectedOption = question.options.find(opt => opt.id === answer);
        if (selectedOption) {
            result[strId] = {
                importance: getImportanceValue(strId),
                value: selectedOption.value
            };
        }
    }

    // Helper for multi-select answers
    function processMultiSelectData(strId, result) {
        const question = questions.find(q => q.str_id === strId);
        if (!question) return;

        const selectedAnswers = answers[question.id] || [];

        question.options.forEach(option => {
            const isSelected = selectedAnswers.includes(option.id);

            if (option.field === "gym") {
                result[option.field] = {
                    importance: getImportanceValue(option.field),
                    value: isSelected ? option.value : 0.2
                };
            } else if (option.hasOwnProperty("value")) {
                result[option.field] = {
                    importance: getImportanceValue(option.field),
                    value: isSelected ? option.value : 0.2
                };
            } else {
                result[option.field] = {
                    importance: getImportanceValue(option.field),
                    value: isSelected
                };
            }
        });
    }

    // POST results to city-selection endpoint
    async function sendPrefs(reqData) {
        const res = await fetch(PUBLIC_CITY_SELECTION_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reqData)
        });

        return await res.json();
    }
</script>

<!-- Quiz layout -->
<div class="">
    <QuizHeader />

    {#key currentQuestion}
        <QuizNavigation
          {currentQuestion}
          {goToPreviousQuestion}
          {goToNextQuestion}
          {isNextDisabled}
        >
            <QuizQuestion
              {currentQuestionData}
              {answers}
              {importanceAnswers}
              {handleSelectionChange}
              {handleCheckboxChange}
            />
        </QuizNavigation>

        <QuizProgress {currentQuestion} {totalQuestions} />
    {/key}
</div>
