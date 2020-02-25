import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        cep: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'addresses'
      }
    );

    return this;
  }

  // Associando os campos de chave estrangeira
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'address' });
  }
}

export default Address;
