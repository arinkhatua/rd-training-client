const { query } = require("@simpleview/sv-graphql-client");

class Movies {
	constructor({ graphUrl, graphServer }) {
		this._graphUrl = graphUrl;
		this._graphServer = graphServer;
	}

	async find({ filter, fields, context = this._graphServer.context, headers }) {
		const variables = {
			filter
		};

		const response = await query({
			query: `query findMovies($filter: training_movies_find_filter_input) {
						training {
							movies_find(filter: $filter) {
								${fields}
							}
						}
					}`,
			variables,
			url: this._graphUrl,
			headers,
			key: "training.movies_find",
			clean: true
		});

		return response;
	}

	async insert({ input, fields, context = this._graphServer.context, headers }) {
		const variables = {
			input
		};

		const response = await query({
			query: `mutation insertMovies($input: [training_movies_insert_movie_input!]!) {
						training {
							movies_insert(input: $input) {
								${fields}
							}
						}
					}`,
			variables,
			url: this._graphUrl,
			headers,
			key: "training.movies_insert",
			clean: true
		});

		return response;
	}

	async remove({ filter, fields, context = this._graphServer.context, headers }) {
		const variables = {
			filter
		};

		const response = await query({
			query: `mutation removeMovies($filter: training_movies_remove_filter_input) {
						training {
							movies_remove(filter: $filter) {
								${fields}
							}
						}
					}`,
			variables,
			url: this._graphUrl,
			headers,
			key: "training.movies_remove",
			clean: true
		});

		return response;
	}
}

module.exports = Movies;