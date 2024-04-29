const { createErrorResponse } = require("./../utils");
const {
    nullToUndefined,
    query
} = require("@simpleview/sv-graphql-client");
const { ObjectId } = require("mongodb");

class Movies {
    constructor({ graphUrl, graphServer }) {
        this._graphUrl = graphUrl;
        this._graphServer = graphServer;
    }

    async find({ filter, fields, context = this._graphServer.context, headers }) {
        if (filter !== undefined) {
            filter = JSON.parse(filter);

            // validation
            const { id, title, release_date, director_id, actor_ids } = filter;

            if (id !== undefined) {
                for (const val of id) {
                    if (!ObjectId.isValid(val)) {
                        return createErrorResponse("'id' property in the movie filter contains an invalid ObjectId string");
                    }
                }
            }

            if (title !== undefined) {
                for (const val of title) {
                    if (typeof val !== "string") {
                        return createErrorResponse("'title' property in the movie filter contains a non 'string' type");
                    }
                }
            }

            if (release_date !== undefined) {
                for (const val of release_date) {
                    const date = new Date(val);
                    if (date.toString() === "Invalid Date") {
                        return createErrorResponse("'release_date' property in the movie filter contains an incorrect date format");
                    }
                }
            }

            if (director_id !== undefined) {
                for (const val of director_id) {
                    if (!ObjectId.isValid(val)) {
                        return createErrorResponse("'director_id' property in the movie filter contains an invalid ObjectId string");
                    }
                }
            }

            if (actor_ids !== undefined) {
                for (const val of actor_ids) {
                    if (!ObjectId.isValid(val)) {
                        return createErrorResponse("'actor_ids' property in the movie filter contains an invalid ObjectId string");
                    }
                }
            }
        }

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
        // validation
        if (input === undefined) {
            return createErrorResponse("'input' query parameter is not provided");
        }

        input = JSON.parse(input);

        // validation
        if (input.length === 0) {
            return createErrorResponse("no movies to insert from 'input' (is an empty array but expected non-empty array)");
        }
        for (const { title, release_date, director_id, actor_ids } of input) {
            if (title !== undefined && typeof title !== "string") {
                return createErrorResponse("'title' property in a movie is not of type 'string'");
            }

            if (release_date !== undefined) {
                const date = new Date(release_date);
                if (date.toString() === "Invalid Date") {
                    return createErrorResponse("'release_date' property in a movie has incorrect date format");
                }
            }

            if (director_id !== undefined && !ObjectId.isValid(director_id)) {
                return createErrorResponse("'director_id' property in a movie is an invalid ObjectId string");
            }

            if (actor_ids !== undefined) {
                for (const actorID of actor_ids) {
                    if (!ObjectId.isValid(actorID)) {
                        return createErrorResponse("'actor_ids' property in a movie contains an invalid ObjectId string");
                    }
                }
            }
        }

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
        if (filter !== undefined) {
            filter = JSON.parse(filter);

            // validation
            const { id } = filter;

            if (id === undefined) {
                return createErrorResponse("'id' property in the movie filter is not provided");
            }
            for (const val of id) {
                if (!ObjectId.isValid(val)) {
                    return createErrorResponse("'id' property in the movie filter contains an invalid ObjectId string");
                }
            }
        }

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