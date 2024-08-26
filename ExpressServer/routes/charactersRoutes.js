const express = require('express');
const charactersController = require('../controllers/charactersController');

const router = express.Router();

router.get('/', charactersController.getAllCharacters);
router.post('/', charactersController.createCharacter);
router.put('/:id', charactersController.updateCharacter);
router.delete('/:id', charactersController.deleteCharacter);

module.exports = router;
