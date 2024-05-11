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

    async initializeTestData({ fields, context = this._graphServer.context, headers }) {
        const response = await query({
            query: `mutation initialize_test_data {
                        training {
                            test_data_initialize {
                                ${fields}
                            }
                        }
                    }`,
            url: this._graphUrl,
            headers,
            key: "training.test_data_initialize"
        });

        return response;
    }
}

module.exports = TrainingPrefix;