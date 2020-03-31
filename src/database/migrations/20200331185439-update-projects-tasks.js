'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn(
        'projects',
        'tasks',
      )
  },

  down: (queryInterface, Sequelize) => {

  }
};
