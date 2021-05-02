const skillDict = {
	'Shooting' : 'Sparare',
	'Fighting' : 'Combattere'
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
}

function parseSkill(value){
	if(skillDict[value] !== null) {
		return skillDict[value];
	}
	else return value;
}


function parseName(value){
	//Parse the translated compendiums to find a match
	let item = {};
	item['_id'] = value;
	let pack = game.packs.find(pack => pack.translated && pack.hasTranslation(item));
	if(pack) {
		return pack.translate(item, true).name;
	}
	//Otherwise return current value
	return value;
}


function parseRequirements(value, translations, data){
	//Parse the translated compendiums to find a match
	let item = {};
	item['_id'] = data.name;
	let pack = game.packs.find(pack => pack.translated && pack.hasTranslation(item));
	if(pack) {
		return pack.translate(item, true).data.requirements;
	}
	//Otherwise return current value
	return value;
}

function parseCfName(value){
	if(folderDict[value] !== null) {
		return folderDict[value];
	}
	else {
		console.log(value);
		return value;
	}
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
			"translateName": (value) => parseName(value),
			"translateRequirements": (value, translations, data) => parseRequirements(value, translations, data),
			"translateCfName": (value) => parseCfName(value),
		});
	}
});