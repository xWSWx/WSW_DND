// src/models/Character.js
export default class Character {
    constructor(data = {}) {
        const normalizedData = Character.normalizeCharacter(data);
        this.id = normalizedData.id;
        this.name = normalizedData.name;
        this.description = normalizedData.description;
        this.initiative = normalizedData.initiative;
        this.current = normalizedData.current;
    }
    
    static normalizeCharacter(character) {
        return {
            id: character.id || character.Id,
            name: character.name || character.Name,
            description: character.description || character.Description,
            initiative: character.initiative || character.Initiative,
            current: character.current || character.Current
        };
    }

    validate() {
        const errors = {};

        if (!this.Name || this.Name.length > 250) {
            errors.Name = 'Name must be between 1 and 250 characters long.';
        }

        if (!this.Description) {
            errors.Description = 'Description is required.';
        }

        if (typeof this.Initiative !== 'number') {
            errors.Initiative = 'Initiative must be a number.';
        }

        if (typeof this.Current !== 'boolean') {
            errors.Current = 'Current must be a boolean.';
        }

        return errors;
    }

    async save() {
        const errors = this.validate();
        if (Object.keys(errors).length > 0) {
            throw new Error('Validation failed');
        }

        // Example call to backend API
        // return axios.post('/api/characters', this);

        return {
            Id: this.Id,
            Name: this.Name,
            Description: this.Description,
            Initiative: this.Initiative,
            Current: this.Current
        };
    }

    async update() {
        // Similar to save but with an API PUT request
    }
}
