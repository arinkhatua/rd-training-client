const { query } = require("@simpleview/sv-graphql-client");

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
            headers,
            clean: true
        };
        let response = await query(graphqlQuery);

        return response.training.people_find;
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
            headers,
            clean: true
        };
        let response = await query(graphqlQuery);

        return response.training.people_insert;
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
            headers,
            clean: true
        };
        let response = await query(graphqlQuery);

        return response.training.people_remove;
    }
}

module.exports = People;