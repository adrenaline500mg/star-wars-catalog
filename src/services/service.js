
import Axios from 'axios'
class Service {
	async getJSON(url) {
		try {
			var response = await Axios.get(url);
			return response;
		} catch (error) {
			throw error;
		}
	}
}

export default new Service();