const {
    nullToUndefined,
    query
} = require("@simpleview/sv-graphql-client");

class Movies {
    constructor({ graphUrl, graphServer }) {
        this._graphUrl = graphUrl;
        this._graphServer = graphServer;
    }

    async find({ filter, fields, context = this._graphServer.context, headers }) {
        const graphqlQuery = {
            query: `query findMovies($filter: training_movies_find_filter_input) {
                        training {
                            movies_find(filter: $filter) {
                                ${fields}
                            }
                        }
                    }`,
            variables: {
                filter
            },
            url: this._graphUrl,
            headers
        };
        let response = await query(graphqlQuery);

        response = response.training.movies_find;
        nullToUndefined(response);

        return response;
    }

    async insert({ input, fields, context = this._graphServer.context, headers }) {
        const graphqlQuery = {
            query: `mutation insertMovies($input: [training_movies_insert_movie_input!]!) {
                        training {
                            movies_insert(input: $input) {
                                ${fields}
                            }
                        }
                    }`,
            variables: {
                input
            },
            url: this._graphUrl,
            headers
        };
        let response = await query(graphqlQuery);

        response = response.training.movies_insert;
        nullToUndefined(response);

        return response;
    }

    async remove({ filter, fields, context = this._graphServer.context, headers }) {
        const graphqlQuery = {
            query: `mutation removeMovies($filter: training_movies_remove_filter_input) {
                        training {
                            movies_remove(filter: $filter) {
                                ${fields}
                            }
                        }
                    }`,
            variables: {
                filter
            },
            url: this._graphUrl,
            headers
        };
        let response = await query(graphqlQuery);

        response = response.training.movies_remove;
        nullToUndefined(response);

        return response;
    }
}

module.exports = Movies;