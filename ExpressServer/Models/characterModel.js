const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Character = sequelize.define('Character', {
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 250]
        }
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Initiative: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Current: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'Characters',
    timestamps: false
});

module.exports = Character;
