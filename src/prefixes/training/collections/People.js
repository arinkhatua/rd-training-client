const {
    nullToUndefined,
    query
} = require("@simpleview/sv-graphql-client");

class People {
    constructor({ graphUrl, graphServer }) {
        this._graphUrl = graphUrl;
        this._graphServer = graphServer;
    }

    async find({ filter, fields, context = this._graphServer.context, headers }) {
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