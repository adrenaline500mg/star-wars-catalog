import service from './service.js';

export default class Planet {
	constructor() {
		this.name = 'Geonosis';
		this.rotation_period = '30';
		this.orbital_period = '256';
		this.diameter = '11370';
		this.climate = 'temperate, arid';
		this.gravity = '0.9 standard';
		this.terrain = 'rock, desert, mo;ntain, barren',
		this.surface_water = '5';
		this.population = '100000000000';
		this.residents = [
			'http://swapi.dev/api/planet/63/'
		];
		this.films = [
			'http://swapi.dev/api/films/5/'
		];
		this.created = '2014-12-10T12:47:22.350000Z';
		this.edited = '2014-12-20T20:58:18.437000Z';
		this.url = 'http://swapi.dev/api/planets/11/';
	}

	set(data) {
		this.name = data.name ;
		this.rotation_period = data.rotation_period ;
		this.orbital_period = data.orbital_period ;
		this.diameter = data.diameter ;
		this.climate = data.climate ;
		this.gravity = data.gravity ;
		this.terrain = data.terrain ,
		this.surface_water = data.surface_water ;
		this.population = data.population ;
		this.residents = data.residents ;
		this.films = data.films ;
		this.created = data.created ;
		this.edited = data.edited ;
		this.url = data.url ;

		return this;
	}

	async readPage(url = 'https://swapi.dev/api/planets/') {
		try {
			var response = await service.getJSON(url);
			return response;
		} catch (error) {
			throw error;
		}
	}

	async read() {
		try {
			var planet = await service.getJSON(this.url);
			this.set(planet.data);
			return this;
		} catch (error) {
			throw error;
		}
	}
}