const Movies = require("./collections/Movies");
const People = require("./collections/People");
const { query } = require("@simpleview/sv-graphql-client");

class TrainingPrefix {
	constructor({ graphUrl, graphServer }) {
		this.name = "training";

		this._graphUrl = graphUrl;
		this._graphServer = graphServer;

		this.movies = new Movies({ graphUrl, graphServer });
		this.people = new People({ graphUrl, graphServer });
	}

	async test_data_clear({ fields, context = this._graphServer.context, headers }) {
		const response = await query({
			query: `
				mutation clearTestData {
					training {
						test_data_clear {
							${fields}
						}
					}
				}
			`,
			url: this._graphUrl,
			headers,
			key: "training.test_data_clear"
		});

		return response;
	}

	async test_data_reset({ fields, context = this._graphServer.context, headers }) {
		const response = await query({
			query: `
				mutation resetTestData {
					training {
						test_data_reset {
							${fields}
						}
					}
				}
			`,
			url: this._graphUrl,
			headers,
			key: "training.test_data_reset"
		});

		return response;
	}
}

module.exports = TrainingPrefix;