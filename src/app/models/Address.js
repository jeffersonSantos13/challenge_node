import Sequelize, { Model } from 'sequelize';

class Adrress extends Model {
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
      }
    );

    return this;
  }

  // Associando os campos de chave estrangeira
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Adrress;
