const Character = require('../Models/characterModel');

const getAllCharacters = async () => {
    return await Character.findAll();
};

const createCharacter = async (data) => {
    const character = await Character.create(data);
    return character.id;
};

const updateCharacter = async (id, data) => {
    await Character.update(data, { where: { id } });
    return id;
};

const deleteCharacter = async (id) => {
    await Character.destroy({ where: { id } });
    return id;
};

module.exports = {
    getAllCharacters,
    createCharacter,
    updateCharacter,
    deleteCharacter,
};
