const fieldsDict = {
	'Novice' : 'Novizio',
	'Seasoned': 'Stagionato',
	'Veteran': 'Veterano',
	'Heroic': 'Eroico',
	'Legendary': 'Leggendario',

	'Special' : 'Speciale',
	'2 per point of Size change': '2 per 1 incremento di Taglia',

	'Sm' : 'Int',
	'Sm x2': 'Int x2',
	'Sm x 2': 'Int x2',
	'Smarts x5 (Sound); Smarts (Silence)' : 'Int x5 (Suono); Int (Silenzio)',
	'Touch': 'Tocco',
	'Cone Template': 'Template a cono',
	'Self': 'Se stesso',

	'10 minutes' : '10 minuti',
	'30 Minutes': '30 Minutes',
	'Instant' : 'Istantaneo',
	'One hour': '1 ora',
	'One Hour': '1 ora',
	'5 (detect), one hour (conceal)': '5 (Arcano rivelato), 1 ora (Arcano celato)',
	'Instant (Sound); 5 (Silence)': 'Istantaneo (Suono); 5 (Silenzio)',
	'Instant (slot); 5 (speed)': 'Instant (lentezza); 5 (velocità)',
	'5 (boost); Instant (lower)': '5 (incrementa); Instant (riduci)',
	'A brief conversation of about five minutes': 'Una breve conversazione di circa 5 minuti',
	'Until the end of the victim\'s next turn': 'Fino alla fine del prossimo turno della vittima'
}

const skillDict = {
	'Shooting' : 'Sparare',
	'Fighting' : 'Combattere',
	'Piloting' : 'Pilotare',
	'Riding' : 'Cavalcare',
	'Boating' : 'Navigare',
	'Driving' : 'Guidare'
}

const folderDict = {
	'Skills': 'Abilità',
	'Hindrances' : 'Svantaggi',
	'Edges' : 'Vantaggi',
	'Background Edges' : '01 - Vantaggi di Background',
	'Combat Edges' : '02 - Vantaggi di Combattimento',
	'Leadership Edges' : '03 - Vantaggi di Leadership',
	'Power Edges' : '04 - Vantaggi di Potere',
	'Professional Edges' : '05 - Vantaggi Professionali',
	'Social Edges' : '06 - Vantaggi Sociali',
	'Weird Edges' : '07 - Vantaggi Folli',
	'Legendary Edges' : '08 - Vantaggi Leggendari',
	'Bestiary' : 'Bestiario',
	'Vehicles' : 'Veicoli',
}

const actionDict = {
	'Close Range' : 'Distanza ravvicinata (Gittata corta/2)',
	'Short Range' : 'Gittata corta',
	'Double-Barrel Short Range' : 'Doppietta Gittata corta',
	'Medium Range' : 'Gittata media',
	'Double-Barrel Medium Range' : 'Doppietta Gittata media',
	'Long Range' : 'Gittata lunga',
	'Double-Barrel Long Range' : 'Doppietta Gittata lunga',
	'Slugs' : 'Proiettili solidi',
	'Double Barrel Slugs' : 'Doppietta con Proiettili solidi',
	'RoF 2 Attack' : 'Attacco CdT 2',
	'RoF 3 Attack' : 'Attacco CdT 3',
	'RoF 4 Attack' : 'Attacco CdT 4',
	'RoF 5 Attack' : 'Attacco CdT 5',
	'Snapfire RoF 2' : 'Bruciapelo CdT 2',
	'Snapfire RoF 3' : 'Bruciapelo CdT 3',
	'Snapfire RoF 4' : 'Bruciapelo CdT 4',
	'Snapfire RoF 5' : 'Bruciapelo CdT 5',
	'Three-Round Burst' : 'Raffica da Tre Colpi',
	'Snapfire' : 'Bruciapelo',
	'Overcharge' : 'Sovraccaricare',
	'One-handed' : 'Ad una mano',
	'Athletics (throwing)' : 'Atletica (lanciare)',
	'Fighting' : 'Combattere',
	'Bash' : 'Sfondare',
}

function parseSkill(value){
	if(skillDict[value] !== null && skillDict[value] !== undefined ) {
		return skillDict[value];
	}
	console.log(value + " not found, please add to skillDict");
	return value;
}

function parseAction(value, translations, data){
	if (isEmpty(value)) {
		return value;
	}
	let toSearch;
	for (const prop in value) {
		if (value.hasOwnProperty(prop)) {
			toSearch = value[prop].name;
			if (actionDict[toSearch] !== undefined) {
				value[prop].name = actionDict[toSearch];
			} else {
				console.log(value[prop].name + " not found for " + data.name + ", please add to actionDict");
			}
		}
	}

	return value;
}

function parseName(value, translations, data, tc) {
	let pack = game.babele.packs.find(pack => pack.translated && pack.translations[data.name]);
	if(pack && pack !== tc) {
		return pack.translateField("name", data);
	}
	return value;
}

function parseDescription(value, translations, data, tc) {
	let pack = game.babele.packs.find(pack => pack.translated && pack.translations[data.name]);
	if(pack && pack !== tc) {
		return pack.translateField("description", data);
	}
	return value;
}

function parseRequirements(value, translations, data, tc){
	let pack = game.babele.packs.find(pack => pack.translated && pack.translations[data.name]);
	if(pack && pack !== tc) {
		return pack.translateField("requirements", data);
	}
	return value;
}

function parseEmbeddedAbilities(value, translations, data, tc) {
	value.forEach( (item, k) => {
		let pack = game.babele.packs.find(pack => pack.translated && pack.translations[item[1].name]);
		if(pack && pack !== tc) {
			value[k][1].name = pack.translateField("name", item[1]);
		}
	});
	return value;
}


function parseCfName(value){
	if(folderDict[value] !== null) {
		return folderDict[value];
	}
	else {
		return value;
	}
}

function parseFields(value){

	if(fieldsDict[value] !== null && fieldsDict[value] !== undefined) {
		return fieldsDict[value];
	}
	else if(!Number.isInteger(value * 1)) {
		console.log('SWADE IT 3 Missing translation for ' + value);
		return value;
	}
}

function parseTrapping(value, translations, data, tc) {
	let pack = game.babele.packs.find(pack => pack.translated && pack.translations[data.name]);
	if(pack && pack !== tc) {
		return pack.translateField("trapping", data);
	}
	return value;
}

Hooks.once('init', () => {

	if(typeof Babele !== 'undefined') {

		Babele.get().register({
			module: 'swade-it',
			lang: 'it',
			dir: 'compendium'
		});


		Babele.get().registerConverters({
			"translateSkill": (value) => parseSkill(value),
			"translateName": (value, translations, data, tc) => {
				return parseName(value, translations, data, tc)
			},
			"translateTrapping": (value, translations, data, tc) => {
				return parseTrapping(value, translations, data, tc)
			},
			"translateDescription": (value, translations, data, tc) => {
				return parseDescription(value, translations, data, tc)
			},
			"translateRequirements": (value, translations, data, tc) => {
				return parseRequirements(value, translations, data, tc)
			},
			"translateEmbeddedAbilities": (value, translations, data, tc) => {
				return parseEmbeddedAbilities(value, translations, data, tc)
			},
			"translateCfName": (value) => {
				return parseCfName(value)
			},
			"translateFields": (value) => parseFields(value),
			"translateAction": (value, translations, data) => parseAction(value, translations, data),
		});

	}
});

Hooks.on('renderSwadeVehicleSheet', (app, html, data) => {
	const opSkill = app.element.find("[name='data.driver.skill']")[0];
	if (opSkill.length > 0) {

		for (let i = 0; i < opSkill.length; i++) {
			opSkill[i].text = parseSkill(opSkill[i].text);
			opSkill[i].value = parseSkill(opSkill[i].value);
			opSkill[i].selected = false;
			if(system.data.driver.skill === opSkill[i].value) {
				opSkill[i].selected = true;
			}
		}
	}


});