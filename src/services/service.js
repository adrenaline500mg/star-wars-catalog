class Service {
	async getJSON(url) {
		try {
			var response = await $.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
				contentType: 'application/json'
			});

			return response;
		} catch (error) {
			throw error;
		}
	}
}

export default new Service();