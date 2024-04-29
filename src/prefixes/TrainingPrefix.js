class TrainingPrefix {
    constructor({ graphUrl, graphServer }) {
        this.name = "training";

        this._graphUrl = graphUrl;
        this._graphServer = graphServer;
    }
}

module.exports = TrainingPrefix;