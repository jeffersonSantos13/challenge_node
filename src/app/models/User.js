import Sequelize, { Model }from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize){
    super.init(
      {
        name: Sequelize.VIRTUAL,
        firt_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        email: Sequelize.STRING,
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
      if(user.name) {
        const [firt_name, ...last_name] = name.split(' ');

        // First Name
        if(firt_name){
          user.firt_name = firt_name;
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
