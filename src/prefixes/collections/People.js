const { query } = require("@simpleview/sv-graphql-client");

class People {
    constructor({ graphUrl, graphServer }) {
        this._graphUrl = graphUrl;
        this._graphServer = graphServer;
    }

    async find({ filter, fields, context = this._graphServer.context, headers }) {
        const variables = {
            filter
        };

        const response = await query({
            query: `query findPeople($filter: training_people_find_filter_input) {
                        training {
                            people_find(filter: $filter) {
                                ${fields}
                            }
                        }
                    }`,
            variables,
            url: this._graphUrl,
            headers,
            key: "training.people_find",
            clean: true
        });

        return response;
    }

    async insert({ input, fields, context = this._graphServer.context, headers }) {
        const variables = {
            input
        };

        const response = await query({
            query: `mutation insertPeople($input: [training_people_insert_person_input!]!) {
                        training {
                            people_insert(input: $input) {
                                ${fields}
                            }
                        }
                    }`,
            variables,
            url: this._graphUrl,
            headers,
            key: "training.people_insert",
            clean: true
        });

        return response;
    }

    async remove({ filter, fields, context = this._graphServer.context, headers }) {
        const variables = {
            filter
        };

        const response = await query({
            query: `mutation removePeople($filter: training_people_remove_filter_input) {
                        training {
                            people_remove(filter: $filter) {
                                ${fields}
                            }
                        }
                    }`,
            variables,
            url: this._graphUrl,
            headers,
            key: "training.people_remove",
            clean: true
        });

        return response;
    }
}

module.exports = People;