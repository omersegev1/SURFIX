const beachesService = require('../services/beachesService.js');

module.exports = {
    getBeach,
    getBeaches,
    deleteBeach,
    updateBeach,
    addBeach,
}

async function getBeaches(req, res) {
    try {
        const {name, maxDistance, sortByName} = req.query;
        const filters = {};

        if (name) filters.name = name;
        if (maxDistance) filters.maxDistance = parseInt(maxDistance);
        if (sortByName) filters.sortByName = sortByName;

        const rows = await beachesService.query(filters);
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: 'Failed to retrieve beaches', error: error.message});
    }
}

async function getBeach(req, res) {
    try {
        const beach = await beachesService.getById(req.params.beachId);
        if (beach) {
            res.json(beach);
        } else {
            res.status(404).json({message: 'Beach not found'});
        }
    } catch (error) {
        res.status(500).json({message: 'Failed to retrieve beach', error: error.message});
    }
}

async function addBeach(req, res) {
    try {
        const beach = req.body;
        const addedBeach = await beachesService.add(beach);
        res.status(201).json(addedBeach);
    } catch (error) {
        console.error('Error adding beach:', error);
        res.status(500).json({ message: 'Failed to add beach', error: error.message });
    }
}

async function updateBeach(req, res) {
    try {
        const beachId = req.params.beachId;
        const beach = req.body;
        const updatedBeach = await beachesService.update(beach, beachId);
        if (updatedBeach) {
            res.json(updatedBeach);
        } else {
            res.status(404).json({ message: 'Beach not found' });
        }
    } catch (error){
        res.status(500).json({ message: 'Failed to update beach', error: error.message });
    }
}

async function deleteBeach(req, res) {
    try {
        const beachId = req.params.beachId;
        const result = await beachesService.remove(beachId);
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Beach not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete beach', error: error.message });
    }
}