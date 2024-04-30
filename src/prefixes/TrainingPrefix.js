const Movies = require("./training/collections/Movies");
const People = require("./training/collections/People");

class TrainingPrefix {
    constructor({ graphUrl, graphServer }) {
        this.name = "training";

        this._graphUrl = graphUrl;
        this._graphServer = graphServer;

        this._movies = new Movies({ graphUrl, graphServer });
        this._people = new People({ graphUrl, graphServer });
    }

    async movies_find({ filter, fields, context, headers }) {
        return this._movies.find({ filter, fields, context, headers });
    }

    async movies_insert({ input, fields, context, headers }) {
        return this._movies.insert({ input, fields, context, headers });
    }

    async movies_remove({ filter, fields, context, headers }) {
        return this._movies.remove({ filter, fields, context, headers });
    }

    async people_find({ filter, fields, context, headers }) {
        return this._people.find({ filter, fields, context, headers });
    }

    async people_insert({ input, fields, context, headers }) {
        return this._people.insert({ input, fields, context, headers });
    }

    async people_remove({ filter, fields, context, headers }) {
        return this._people.remove({ filter, fields, context, headers });
    }
}

module.exports = TrainingPrefix;