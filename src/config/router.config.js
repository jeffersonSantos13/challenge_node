module.exports = {
  cpf: {
    order: 1,
    response: 'full_name',
  },
  full_name: {
    order: 2,
    response: 'birthday',
  },
  birthday: {
    order: 3,
    response: 'phone-number',
  },
  address: {
    order: 4,
    response: 'decimal',
  }
};
