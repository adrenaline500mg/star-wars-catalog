import service from './service.js';

export default class Starship {
	constructor() {
		this.name = 'Death Star';
		this.model = 'DS-1 Orbital Battle Station';
		this.manufacturer = 'Imperial Department of Military Research, Sienar Fleet Systems';
		this.cost_in_credits = '1000000000000';
		this['length'] = '120000';
		this.max_atmosphering_speed = 'n/a';
		this.crew = '342,953';
		this.passengers = '843,342';
		this.cargo_capacity = '1000000000000';
		this.consumables = '3 years';
		this.hyperdrive_rating = '4.0';
		this.MGLT = '10';
		this.starship_class = 'Deep Space Mobile Battlestation';
		this.pilots = [];
		this.films = [
			'http://swapi.dev/api/films/1/'
		];
		this.created = '2014-12-10T16:36:50.509000Z';
		this.edited = '2014-12-20T21:26:24.783000Z';
		this.url = 'http://swapi.dev/api/starships/9/';
	}

	set(data) {
		this.name = data.name;
		this.model = data.model;
		this.manufacturer = data.manufacturer;
		this.cost_in_credits = data.cost_in_credits;
		this['length'] = data['length'];
		this.max_atmosphering_speed = data.max_atmosphering_speed;
		this.crew = data.crew;
		this.passengers = data.passengers;
		this.cargo_capacity = data.cargo_capacity;
		this.consumables = data.consumables;
		this.hyperdrive_rating = data.hyperdrive_rating;
		this.MGLT = data.MGLT;
		this.starship_class = data.starship_class;
		this.pilots = data.pilots;
		this.films = data.films;
		this.created = data.created;
		this.edited = data.edited;
		this.url = data.url;

		return this;
	}

	async readPage(url = 'https://swapi.dev/api/starships/') {
		try {
			var response = await service.getJSON(url);
			return response;
		} catch (error) {
			throw error;
		}
	}

	async read() {
		try {
			var starship = await service.getJSON(this.url);
			this.set(starship);
			return this;
		} catch (error) {
			throw error;
		}
	}
}