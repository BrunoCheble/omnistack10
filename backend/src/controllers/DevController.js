const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, bio, avatar_url } = response.data;

            const techsArray = parseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            dev = await Dev.create({
                github_username,
                name,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });
        }

        return res.json(dev);
    },
    async update(req, res) {

        const { id } = req.params;
        const { name, bio, techs, latitude, longitude } = req.body;

        let dev = await Dev.findById(id);

        if (dev) {
            const techsArray = parseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            dev = await Dev.updateOne({ _id: id }, {
                techs: techsArray,
                location,
                name, 
                bio
            });
            
        }

        return res.json(dev);
    },
    async destroy(req, res) {
        const { id } = req.params;
        const dev = await Dev.findByIdAndDelete(id);

        return res.json(dev);

    }
}