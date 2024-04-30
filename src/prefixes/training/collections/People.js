const { createErrorResponse } = require("./../utils");
const {
    nullToUndefined,
    query
} = require("@simpleview/sv-graphql-client");
const { ObjectId } = require("mongodb");

class People {
    constructor({ graphUrl, graphServer }) {
        this._graphUrl = graphUrl;
        this._graphServer = graphServer;
    }

    async find({ filter, fields, context = this._graphServer.context, headers }) {
        if (filter !== undefined) {
            filter = JSON.parse(filter);

            // validation
            const { id, first_name, last_name } = filter;

            if (id !== undefined) {
                for (const val of id) {
                    if (!ObjectId.isValid(val)) {
                        return createErrorResponse("'id' property in the person filter contains an invalid ObjectId string");
                    }
                }
            }

            if (first_name !== undefined) {
                for (const val of first_name) {
                    if (typeof val !== "string") {
                        return createErrorResponse("'first_name' property in the person filter contains a non 'string' type");
                    }
                }
            }

            if (last_name !== undefined) {
                for (const val of last_name) {
                    if (typeof val !== "string") {
                        return createErrorResponse("'last_name' property in the person filter contains a non 'string' type");
                    }
                }
            }
        }

        const graphqlQuery = {
            query: `query findPeople($filter: training_people_find_filter_input) {
                        training {
                            people_find(filter: $filter) {
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

        response = response.training.people_find;
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
            return createErrorResponse("no people to insert from 'input' (is an empty array but expected non-empty array)");
        }
        for (const { first_name, last_name } of input) {
            if (first_name === undefined) {
                return createErrorResponse("'first_name' property not provided in a person");
            }
            if (typeof first_name !== "string") {
                return createErrorResponse("'first_name' property in a person is not of type 'string'");
            }

            if (last_name === undefined) {
                return createErrorResponse("'last_name' property not provided in a person");
            }
            if (typeof last_name !== "string") {
                return createErrorResponse("'last_name' property in a person is not of type 'string'");
            }
        }

        const graphqlQuery = {
            query: `mutation insertPeople($input: [training_people_insert_person_input!]!) {
                        training {
                            people_insert(input: $input) {
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

        response = response.training.people_insert;
        nullToUndefined(response);

        return response;
    }

    async remove({ filter, fields, context = this._graphServer.context, headers }) {
        if (filter !== undefined) {
            filter = JSON.parse(filter);

            // validation
            const { id } = filter;

            if (id === undefined) {
                return createErrorResponse("'id' property in the person filter is not provided");
            }
            for (const val of id) {
                if (!ObjectId.isValid(val)) {
                    return createErrorResponse("'id' property in the person filter contains an invalid ObjectId string");
                }
            }
        }

        const graphqlQuery = {
            query: `mutation removePeople($filter: training_people_remove_filter_input) {
                        training {
                            people_remove(filter: $filter) {
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

        response = response.training.people_remove;
        nullToUndefined(response);

        return response;
    }
}

module.exports = People;