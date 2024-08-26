const charactersService = require('../services/charactersService');

const getAllCharacters = async (req, res) => {
    try {
        const characters = await charactersService.getAllCharacters();
        res.status(200).json(characters);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching characters.');
    }
};

const createCharacter = async (req, res) => {
    try {
        const { name, description, initiative, current } = req.body;
        const characterId = await charactersService.createCharacter({ name, description, initiative, current });
        res.status(200).json({ id: characterId });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while creating the character.');
    }
};

const updateCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, initiative, current } = req.body;
        await charactersService.updateCharacter(id, { name, description, initiative, current });
        res.status(200).json({ id });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the character.');
    }
};

const deleteCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        await charactersService.deleteCharacter(id);
        res.status(200).json({ id });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the character.');
    }
};

module.exports = {
    getAllCharacters,
    createCharacter,
    updateCharacter,
    deleteCharacter,
};
