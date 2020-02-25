import Sequelize, { Model } from "sequelize";
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
        birthday: Sequelize.STRING,
        full_name: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${this.first_name} ${this.last_name}`;
          },
          set(value) {
            throw new Error('Do not try to set the `fullName` value!');
          }
        },
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'users',
      }
    );

    // Executando ações antes de salvar o registro no banco de dados
    this.addHook('beforeSave', async user => {
      /* Criptofrando a senha */
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    this.addHook('beforeUpdate', async user => {
      /**
      * Gravando o nome do Usuário, separando o nome nos campos
      * First Name
      * Last Name
      */
      if(user.full_name) {
        const [first_name, ...last_name] = user.full_name.split(' ');

        // First Name
        if(first_name){
          user.first_name = first_name;
        }

        // Last Name
        if(last_name.length > 0){
          user.last_name = last_name.join(' ');
        }
      }
    });

    return this;
  }

  // Associando os campos de chave estrangeira
  static associate(models) {
    this.hasMany(models.Phone_numbers, { foreignKey: 'user_id', as: 'phone_numbers' });
    this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
