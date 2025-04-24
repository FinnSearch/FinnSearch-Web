import {
	CloudMoon, Building, ChartCandlestick, Stethoscope, Luggage, UsersRound, Waypoints, DiamondPercent, BriefcaseBusiness, ShieldAlert, Thermometer, ThermometerSnowflake, House, Building2, School, SquareX, Coins, PiggyBank, ReceiptEuro, Gem, ShieldOff, ShieldHalf, ShieldCheck, ScanHeart, Hospital, Bus, PlaneTakeoff, Bike, Train, PartyPopper, Landmark, TentTree, Briefcase, Cloudy, GraduationCap, BookOpen, Baby, Dumbbell, Trees, Waves, Compass, Map
	// Removed unused icons: Lightbulb, MusicIcon, Theater, Users, ArrowLeftIcon, ArrowRightIcon - keep if needed elsewhere
} from 'lucide-svelte';

export const questions = [
	{
		id: 1,
		singleSelect: true,
		icon: Building,
		title: "Type of City",
		title_fi: "Kaupunkityyppi",
		str_id: "city_type",
		question: "What type of city do you prefer?",
		question_fi: "Millaista kaupunkityyppiä suosit?",
		options: [
			{ id: "rural", label: "Rural/Small", label_fi: "Maaseutu/Pieni", description: "Quiet and close to nature", description_fi: "Rauhallinen ja lähellä luontoa", icon: TentTree, value: 0.33 },
			{ id: "medium", label: "Medium", label_fi: "Keskisuuri", description: "Balanced lifestyle and amenities", description_fi: "Tasapainoinen elämäntyyli ja palvelut", icon: House, value: 0.66 },
			{ id: "big", label: "Big City", label_fi: "Suurkaupunki", description: "Fast-paced, high population", description_fi: "Nopeatempoinen, paljon asukkaita", icon: Building2, value: 1.0 },
		]
	},
	{
		id: 2,
		singleSelect: true,
		icon: Compass,
		title: "Geographic Location",
		title_fi: "Maantieteellinen sijainti",
		str_id: "location",
		question: "Which geographic region do you prefer?",
		question_fi: "Mitä maantieteellistä aluetta suosit?",
		options: [
			{ id: "south", label: "South", label_fi: "Etelä", description: "Southern regions", description_fi: "Eteläiset alueet", icon: Thermometer, value: 0.25 },
			{ id: "central", label: "Central", label_fi: "Keski", description: "Middle regions", description_fi: "Keski-alueet", icon: Map, value: 0.5 },
			{ id: "north", label: "North", label_fi: "Pohjoinen", description: "Northern regions", description_fi: "Pohjoiset alueet", icon: ThermometerSnowflake, value: 0.75 },
		]
	},
	{
		id: 3,
		icon: CloudMoon,
		singleSelect: true,
		title: "Climate Preference",
		title_fi: "Ilmasto",
		str_id: "climate",
		question: "What type of climate do you prefer?",
		question_fi: "Millaista ilmastoa suosit?",
		options: [
			{ id: "hot", label: "Warm", label_fi: "Lämmin", description: "Hot locations", description_fi: "Lämpimät paikat", icon: Thermometer, value: 0.25 },
			{ id: "moderate", label: "Moderate", label_fi: "Maltillinen", description: "Mild temperatures with distinct seasons", description_fi: "Miellyttävät lämpötilat, selkeät vuodenajat", icon: Cloudy, value: 0.5 },
			{ id: "cold", label: "Cool", label_fi: "Viileä", description: "Cold locations", description_fi: "Viileät paikat", icon: ThermometerSnowflake, value: 0.75 },
		]
	},
	{
		id: 4,
		icon: BriefcaseBusiness,
		singleSelect: true,
		title: "Employment Opportunities",
		title_fi: "Työllistymismahdollisuudet",
		str_id: "employment_need",
		question: "How important is access to job opportunities?",
		question_fi: "Kuinka tärkeää työpaikkojen saatavuus on?",
		options: [
			{ id: "not-important", label: "Not Important", label_fi: "Ei tärkeää", description: "Not currently job hunting", description_fi: "En etsi tällä hetkellä töitä", icon: SquareX, value: 0.2 },
			{ id: "important", label: "Important", label_fi: "Tärkeää", description: "Decent job options nearby", description_fi: "Kohtuulliset työmahdollisuudet lähellä", icon: Waypoints, value: 0.5 },
			{ id: "very-important", label: "Very Important", label_fi: "Erittäin tärkeää", description: "Strong job market is essential", description_fi: "Vahvat työmarkkinat ovat välttämättömät", icon: Briefcase, value: 1.0 }
		]
	},
	{
		id: 5,
		icon: ShieldAlert,
		singleSelect: true,
		title: "Safety and Security",
		title_fi: "Turvallisuus",
		str_id: "safety",
		question: "How important is safety and security?",
		question_fi: "Kuinka tärkeää turvallisuus on?",
		options: [
			{ id: "not-important", label: "Not Important", label_fi: "Ei tärkeää", description: "Safety is not a key concern", description_fi: "Turvallisuus ei ole keskeinen huolenaihe", icon: ShieldOff, value: 0.3 },
			{ id: "important", label: "Important", label_fi: "Tärkeää", description: "Some level of security is expected", description_fi: "Odotan jonkin tason turvallisuutta", icon: ShieldHalf, value: 0.7 },
			{ id: "very-important", label: "Very Important", label_fi: "Erittäin tärkeää", description: "A very safe area is essential", description_fi: "Erittäin turvallinen alue on välttämätön", icon: ShieldCheck, value: 0.9 }
		]
	},
	{
		id: 6,
		icon: ChartCandlestick,
		singleSelect: true,
		title: "Cost of Living",
		title_fi: "Elinkustannukset",
		str_id: "cost_of_living",
		question: "What cost of living do you prefer?",
		question_fi: "Millaisia elinkustannuksia suosit?",
		options: [
			{ id: "low", label: "Low", label_fi: "Matala", description: "Affordable daily expenses", description_fi: "Edulliset päivittäiskulut", icon: Coins, value: 0.2 },
			{ id: "average", label: "Average", label_fi: "Keskitaso", description: "Standard cost, neither cheap nor expensive", description_fi: "Normaali hintataso, ei halpa eikä kallis", icon: PiggyBank, value: 0.35 },
			{ id: "high", label: "High", label_fi: "Korkea", description: "Willing to spend more for location/lifestyle", description_fi: "Valmis maksamaan enemmän sijainnista/elämäntyylistä", icon: Gem, value: 0.6 }
		]
	},
	{
		id: 7,
		icon: DiamondPercent,
		title: "Housing Prices",
		title_fi: "Asuntojen hinnat",
		str_id: "housing_price",
		singleSelect: true,
		question: "What kind of housing prices do you prefer?",
		question_fi: "Millaisia asuntojen hintoja suosit?",
		options: [
			{ id: "low", label: "Low", label_fi: "Matala", description: "Affordable housing market", description_fi: "Edulliset asuntomarkkinat", icon: Coins, value: 0.1 },
			{ id: "average", label: "Average", label_fi: "Keskitaso", description: "Mid-range prices", description_fi: "Keskihintaluokka", icon: ReceiptEuro, value: 0.2 },
			{ id: "high", label: "High", label_fi: "Korkea", description: "Premium or upscale market", description_fi: "Korkeampi hintaluokka tai premium-markkinat", icon: Gem, value: 0.9 }
		]
	},
	{
		id: 8,
		icon: Luggage,
		singleSelect: false,
		title: "Transportation Options",
		title_fi: "Liikkumisvaihtoehdot",
		str_id: "transportation",
		question: "Which types of transportation are important to you?",
		question_fi: "Mitkä liikkumismuodot ovat sinulle tärkeitä?",
		options: [
			{ id: "public_transport", label: "Public Transport", label_fi: "Julkinen liikenne", description: "Buses, trams, metro", description_fi: "Bussit, raitiovaunut, metro", icon: Bus, field: "public_transport" },
			{ id: "bicycle", label: "Cycling", label_fi: "Pyöräily", description: "Bike-friendly infrastructure", description_fi: "Pyöräily-ystävällinen infrastruktuuri", icon: Bike, field: "bicycle" },
			{ id: "airport", label: "Airport", label_fi: "Lentokenttä", description: "Close to airports", description_fi: "Lähellä lentokenttiä", icon: PlaneTakeoff, field: "airport" },
			{ id: "railway", label: "Railway", label_fi: "Rautatie", description: "Access to train stations", description_fi: "Pääsy juna-asemille", icon: Train, field: "railway" }
		]
	},
	{
		id: 9,
		icon: Stethoscope,
		singleSelect: false, // Multi-select
		title: "Medical Facilities",
		title_fi: "Terveydenhuoltopalvelut",
		str_id: "medical_facilities",
		question: "How important are medical facilities nearby?",
		question_fi: "Kuinka tärkeitä lähellä olevat terveydenhuoltopalvelut ovat?",
		options: [
			{ id: "hospital", label: "Hospitals", label_fi: "Sairaalat", description: "Major medical centers", description_fi: "Suuremmat terveyskeskukset/sairaalat", icon: Hospital, field: "hospital", value: 0.8 },
			{ id: "clinic", label: "Clinics", label_fi: "Terveysasemat", description: "Local healthcare clinics", description_fi: "Paikalliset terveysasemat", icon: ScanHeart, field: "clinic", value: 0.8 }
		]
	},
	{
		id: 10,
		icon: GraduationCap,
		singleSelect: false, // Multi-select
		title: "Education Facilities",
		title_fi: "Koulutuspalvelut",
		str_id: "education_facilities",
		question: "Which educational facilities are important to have nearby?",
		question_fi: "Mitkä koulutuspalvelut ovat tärkeitä lähellä?",
		options: [
			{ id: "kindergarten", label: "Kindergartens", label_fi: "Päiväkodit", description: "Early childhood education", description_fi: "Varhaiskasvatus", icon: Baby, field: "kindergarten", value: 0.7 },
			{ id: "school", label: "Schools", label_fi: "Koulut", description: "Primary and secondary education", description_fi: "Perus- ja toisen asteen koulutus", icon: School, field: "school", value: 0.7 },
			{ id: "university", label: "Universities", label_fi: "Yliopistot/Korkeakoulut", description: "Higher education institutions", description_fi: "Korkeakoulut", icon: BookOpen, field: "university", value: 0.7 }
		]
	},
	{
		id: 11,
		icon: Dumbbell,
		singleSelect: false, // Multi-select
		title: "Fitness & Recreation",
		title_fi: "Kuntoilu ja virkistys",
		str_id: "fitness_recreation",
		question: "Which recreational facilities are important to you?",
		question_fi: "Mitkä virkistysmahdollisuudet ovat sinulle tärkeitä?",
		options: [
			{ id: "gym", label: "Gyms", label_fi: "Kuntosalit", description: "Fitness centers", description_fi: "Kuntokeskukset", icon: Dumbbell, field: "gym", value: 0.3 },
			{ id: "park_nearby", label: "Parks", label_fi: "Puistot", description: "Green spaces", description_fi: "Viheralueet", icon: Trees, field: "park_nearby" },
			{ id: "lake_nearby", label: "Lakes/Water", label_fi: "Järvet/Vesistöt", description: "Natural water bodies", description_fi: "Luonnon vesistöt", icon: Waves, field: "lake_nearby" }
		]
	},
	{
		id: 12,
		icon: UsersRound,
		singleSelect: false, // Multi-select
		title: "Social & Cultural Life",
		title_fi: "Sosiaali- ja kulttuurielämä",
		str_id: "social_cultural",
		question: "Which aspects of social and cultural life matter to you?",
		question_fi: "Mitkä sosiaali- ja kulttuurielämän osa-alueet ovat sinulle tärkeitä?",
		options: [
			{ id: "cultural_life", label: "Cultural Activities", label_fi: "Kulttuuritoiminta", description: "Museums, theaters, galleries", description_fi: "Museot, teatterit, galleriat", icon: Landmark, field: "cultural_life", value: 0.7 },
			{ id: "entertainment", label: "Entertainment", label_fi: "Viihde", description: "Nightlife, restaurants, bars", description_fi: "Yöelämä, ravintolat, baarit", icon: PartyPopper, field: "entertainment", value: 0.7 },
			{ id: "outdoor_activities", label: "Outdoor Activities", label_fi: "Ulkoiluaktiviteetit", description: "Hiking, sports, nature", description_fi: "Retkeily, urheilu, luonto", icon: TentTree, field: "outdoor_activities", value: 0.6 }
		]
	},
	// Importance ranking questions (all single select)
	{
		id: 13,
		icon: Building,
		singleSelect: true,
		importance: true,
		title: "Importance: Location & Climate",
		title_fi: "Tärkeys: Sijainti ja ilmasto",
		str_id: "importance_location",
		question: "Which factor is most important to you?",
		question_fi: "Mikä tekijä on sinulle tärkein?",
		options: [
			{ id: "city_type", label: "City Size/Type", label_fi: "Kaupunkityyppi", description: "The size and character of the city", description_fi: "Kaupungin koko ja luonne", icon: Building },
			{ id: "location", label: "Geographic Location", label_fi: "Maantieteellinen sijainti", description: "North, central, or south", description_fi: "Pohjoinen, keski tai etelä", icon: Compass },
			{ id: "climate", label: "Climate", label_fi: "Ilmasto", description: "Temperature and weather patterns", description_fi: "Lämpötila ja sääolosuhteet", icon: CloudMoon }
		]
	},
	{
		id: 14,
		icon: BriefcaseBusiness,
		singleSelect: true,
		importance: true,
		title: "Importance: Living Conditions",
		title_fi: "Tärkeys: Elinolosuhteet",
		str_id: "importance_living",
		question: "Which factor is most important to you?",
		question_fi: "Mikä tekijä on sinulle tärkein?",
		options: [
			{ id: "employment_need", label: "Employment Opportunities", label_fi: "Työllistymismahdollisuudet", description: "Access to jobs", description_fi: "Työpaikkojen saatavuus", icon: BriefcaseBusiness },
			{ id: "safety", label: "Safety & Security", label_fi: "Turvallisuus", description: "Crime rates and security", description_fi: "Rikollisuusluvut ja turvallisuus", icon: ShieldAlert },
			{ id: "cost_of_living", label: "Cost of Living", label_fi: "Elinkustannukset", description: "Daily expenses", description_fi: "Päivittäiset menot", icon: ChartCandlestick },
			{ id: "housing_price", label: "Housing Prices", label_fi: "Asuntojen hinnat", description: "Real estate costs", description_fi: "Kiinteistökustannukset", icon: DiamondPercent }
		]
	},
	{
		id: 15,
		icon: Luggage,
		singleSelect: true,
		importance: true,
		title: "Importance: Transportation",
		title_fi: "Tärkeys: Liikkuminen",
		str_id: "importance_transport",
		question: "Which transportation option is most important to you?",
		question_fi: "Mikä liikkumisvaihtoehto on sinulle tärkein?",
		options: [
			{ id: "public_transport", label: "Public Transportation", label_fi: "Julkinen liikenne", description: "Buses, trams, metro", description_fi: "Bussit, raitiovaunut, metro", icon: Bus },
			{ id: "bicycle", label: "Cycling Infrastructure", label_fi: "Pyöräilyinfrastruktuuri", description: "Bike paths and facilities", description_fi: "Pyörätiet ja -palvelut", icon: Bike },
			{ id: "airport", label: "Airport Access", label_fi: "Lentokentän läheisyys", description: "Proximity to airports", description_fi: "Etäisyys lentokentistä", icon: PlaneTakeoff },
			{ id: "railway", label: "Railway Access", label_fi: "Rautatieyhteydet", description: "Train connections", description_fi: "Junayhteydet", icon: Train }
		]
	},
	{
		id: 16,
		icon: Hospital,
		singleSelect: true,
		importance: true,
		title: "Importance: Facilities",
		title_fi: "Tärkeys: Palvelut",
		str_id: "importance_facilities",
		question: "Which type of facility is most important to you?",
		question_fi: "Mikä palvelutyyppi on sinulle tärkein?",
		options: [
			{ id: "medical", label: "Medical Facilities", label_fi: "Terveydenhuoltopalvelut", description: "Hospitals and clinics", description_fi: "Sairaalat ja terveysasemat", icon: Stethoscope },
			{ id: "education", label: "Educational Institutions", label_fi: "Koulutuspalvelut", description: "Schools and universities", description_fi: "Koulut ja korkeakoulut", icon: GraduationCap },
			{ id: "recreation", label: "Recreation", label_fi: "Virkistysmahdollisuudet", description: "Gyms, parks, lakes", description_fi: "Kuntosalit, puistot, järvet", icon: Dumbbell }
		]
	},
	{
		id: 17,
		icon: UsersRound,
		singleSelect: true,
		importance: true,
		title: "Importance: Lifestyle",
		title_fi: "Tärkeys: Elämäntyyli",
		str_id: "importance_lifestyle",
		question: "Which lifestyle aspect is most important to you?",
		question_fi: "Mikä elämäntyylin osa-alue on sinulle tärkein?",
		options: [
			{ id: "cultural_life", label: "Cultural Life", label_fi: "Kulttuurielämä", description: "Museums, theaters, arts", description_fi: "Museot, teatterit, taide", icon: Landmark },
			{ id: "entertainment", label: "Entertainment", label_fi: "Viihde", description: "Nightlife, restaurants", description_fi: "Yöelämä, ravintolat", icon: PartyPopper },
			{ id: "outdoor_activities", label: "Outdoor Activities", label_fi: "Ulkoiluaktiviteetit", description: "Nature and sports", description_fi: "Luonto ja urheilu", icon: TentTree }
		]
	}
];
