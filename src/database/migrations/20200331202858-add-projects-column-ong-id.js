'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'projects',
      'ong_id',
      {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'ongs', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn(
        'projects',
        'ong_id'
      )
  }
};
