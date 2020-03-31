'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('ongs', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },

        name: {
          type: Sequelize.STRING,
          allowNull: false
        },

        email: {
          type: Sequelize.STRING,
          allowNull: false
        },

        password: {
          type: Sequelize.STRING,
          allowNull: false
        },

        whatsapp: {
          type: Sequelize.STRING(11),
          allowNull: false
        },

        city: {
          type: Sequelize.STRING,
          allowNull: false
        },

        state: {
          type: Sequelize.STRING(2),
          allowNull: false
        },

        password_reset_token: {
          type: Sequelize.STRING
        },
  
        password_reset_expiration: {
            type: Sequelize.DATE
        },
        
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },

        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('ongs');
  }
};
