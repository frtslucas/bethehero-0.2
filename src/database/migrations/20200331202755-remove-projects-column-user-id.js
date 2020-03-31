'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn(
        'projects',
        'user_id',
      )
  },

  down: (queryInterface, Sequelize) => {

  }
};