import service from './service.js';

export default class People {
	constructor() {
		this.name = 'Luke Skywalker';
		this.height = '172';
		this.mass = '77';
		this.hair_color = 'blond';
		this.skin_color = 'fair';
		this.eye_color = 'blue';
		this.birth_year = '19BBY';
		this.gender = 'male';
		this.homeworld = 'http://swapi.dev/api/planets/1/';
		this.films = [
			'http://swapi.dev/api/films/1/',
			'http://swapi.dev/api/films/2/',
			'http://swapi.dev/api/films/3/',
			'http://swapi.dev/api/films/6/'
		];
		this.species = [];
		this.vehicles = [
			'http://swapi.dev/api/vehicles/14/',
			'http://swapi.dev/api/vehicles/30/'
		];
		this.starships = [
			'http://swapi.dev/api/starships/12/',
			'http://swapi.dev/api/starships/22/'
		];
		this.created = '2014-12-09T13:50:51.644000Z';
		this.edited = '2014-12-20T21:17:56.891000Z';
		this.url = 'http://swapi.dev/api/people/1/';
	}

	set(data) {
		this.name = data.name;
		this.height = data.height;
		this.mass = data.mass;
		this.hair_color = data.hair_color;
		this.skin_color = data.skin_color;
		this.eye_color = data.eye_color;
		this.birth_year = data.birth_year;
		this.gender = data.gender;
		this.homeworld = data.homeworld;
		this.films = data.films;
		this.species = data.species;
		this.vehicles = data.vehicles;
		this.starships = data.starships;
		this.created = data.created;
		this.edited = data.edited;
		this.url = data.url;

		return this;
	}

	async readPage(url = 'https://swapi.dev/api/people/') {
		try {
			var response = await service.getJSON(url);
			return response;
		} catch (error) {
			throw error;
		}
	}

	async read() {
		try {
			var people = await service.getJSON(this.url);
			this.set(people);
			return this;
		} catch (error) {
			throw error;
		}
	}
}