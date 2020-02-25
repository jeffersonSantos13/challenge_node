import Sequelize, { Model } from "sequelize";

class AmountRequested extends Model {
  static init(sequelize) {
    super.init(
      {
        amount_requested: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'amount_requested'
      }
    );

    return this;
  }

  // Associando os campos de chave estrangeira
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'amount_requested' });
  }
}

export default AmountRequested;
