import Sequelize, { Model } from "sequelize";
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
        birthday: Sequelize.STRING,
        full_name: Sequelize.VIRTUAL,
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
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

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
