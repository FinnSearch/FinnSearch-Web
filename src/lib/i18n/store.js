import {writable, derived} from 'svelte/store';

export const languages = ['en', 'fi'];
export const defaultLanguage = 'fi';

export const language = writable(
	typeof localStorage !== 'undefined' ?
		localStorage.getItem('language') :
		detectBrowserLanguage()
);

if (typeof localStorage !== 'undefined') {
	language.subscribe(value => {
		localStorage.setItem('language', value);
	});
}

function detectBrowserLanguage() {
	if (typeof navigator !== 'undefined') {
		const browserLanguage = navigator.language.split('-')[0];
		if (languages.includes(browserLanguage)) {
			return browserLanguage;
		}

		return 'fi';
	}
}


export const translations = {
	en: {
		mainHeader: 'Find your perfect Finnish City',
		mainHeader_description: 'Discover cities that match your lifestyle preferences and priorities',
		mainCards_header: 'Discovery Options',

		mainSearch_header: "Search cities",
		mainSearch_placeholder: "Enter city name",

		mainQuiz_header: 'Explore with a quiz',
		mainQuiz_description: 'Answer questions to find your ideal city',
		mainQuiz_button: 'Take the Quiz',

		mainAI_header: 'Find with AI',
		mainAI_description: 'Let AI suggest cities',
		mainAI_button: 'Try with AI',
		viewDetails: 'View details',


		quizHeader: 'City Preference Quiz',
		quizHeader_description: 'Answer a few questions to help us find your perfect city match',
		quizProgress_question: 'Question',
		quizProgress_progress: 'Progress ',


		quizResults_header: 'Your Perfect City Matches',
		quizResults_description: 'Based on your lifestyle preferences, we\'ve found these cities that match your criteria',
		quizResults_match: '% match',


		AIHeader: 'Find with AI',
		AI_description: 'Ask some questions to find the matching city',
		AI_role_assistant: 'Assistant',
		AI_role_user: 'You',
		AI_assistant_welcome: 'Hi! Ready to help you find your perfect city. How can I help?',
		AI_home: 'Home',
		AI_clear: 'Clear',
		AI_search: 'Ask anything...',

		AI_tos_header: 'Terms of service',
		AI_tos_description: 'This app uses the Mistral-small-latest model provided by Mistral AI. \nBy using this service, you agree to their',
		AI_tos_close: 'Get back',
		AI_tos_continue: 'Continue'




	},

	fi: {
		mainHeader: 'Löydä täydellinen suomalainen kaupunki',
		mainHeader_description: 'Löydä elämäntyyliisi ja arvoihisi sopivat kaupungit',

		mainSearch_header: "Etsi kaupunkeja",
		mainSearch_placeholder: "Kirjoita kaupungin nimi",

		mainQuiz_header: 'Löydä testillä',
		mainCards_header: 'Löydä vaihtoehtoja',
		mainQuiz_description: 'Vastaa kysymyksiin ja löydä ihanteellinen kaupunkisi',
		mainQuiz_button: 'Tee testi',

		mainAI_header: 'Löydä AI',
		mainAI_description: 'Anna AI ehdottaa kaupunkeja',
		mainAI_button: 'Kokeile AI',
		viewDetails: 'Näytä tiedot',


		quizHeader: 'Kaupunkivalinta testi',
		quizHeader_description: "Vastaa muutamaan kysymykseen, jotta voimme löytää sinulle täydellisen kaupungin",
		quizProgress_question: 'Kysymys',
		quizProgress_progress: 'Vaihe ',

		quizResults_header: 'Täydelliset Kaupunkivastineesi',
		quizResults_description: 'Perustuen elämäntapatoiveisiisi, olemme löytäneet nämä kaupungit, jotka täyttävät kriteerisi',
		quizResults_match: '% vastaavuus',

		AIHeader: 'Löydä tekoälyn avulla',
		AI_description: 'Kysy muutama kysymys, jotta löydämme sopivan kaupungin',
		AI_role_assistant: 'AI',
		AI_role_user: 'Sinä',
		AI_assistant_welcome: 'Hei! Olen täällä auttamassa sinua löytämään täydellisen kaupungin. Kuinka voin auttaa?',
		AI_home: 'Koti',
		AI_clear: 'Tyhjennä',
		AI_search: 'Kysy mitä tahansa...',

		AI_tos_header: 'Käyttöehdot',
		AI_tos_description: 'Tämä sovellus käyttää Mistral AI:n tarjoamaa Mistral-small-latest-mallia.\nKäyttämällä tätä palvelua hyväksyt heidän',
		AI_tos_close: 'Koti',
		AI_tos_continue: 'Jatka'
	},

};

function formatTranslation(text, params = {}) {
	if (!text) return '';
	let result = text;

	for (const key in params) {
		const value = params[key];
		const placeholder = new RegExp(`{${key}}`, 'g');
		result = result.replace(placeholder, value)
	}

	return result;
}


export function setLanguage(newLanguage) {
	if (languages.includes(newLanguage)) {
		language.set(newLanguage);
		return true;
	}

	return false;
}


export const t = derived(language, $language => {
	const languageTranslations = translations[$language] || translations[defaultLanguage];

	// Return a function that fetches and formats a translation
	return (key, params = {}) => {
		const translation = languageTranslations[key];

		if (typeof translation === 'string') {
			return formatTranslation(translation, params);
		}

		// If translation not found, return the key as a fallback
		return key;
	};
});
