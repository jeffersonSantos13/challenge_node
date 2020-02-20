import Sequelize, { Model } from "sequelize";

class Phone_numbers extends Model {
  static init(sequelize) {
    super.init(
      {
        phone_number: Sequelize.INTEGER,
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

export default Phone_numbers;
