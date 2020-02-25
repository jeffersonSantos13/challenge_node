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
  phone_number: {
    order: 4,
    response: 'address',
  },
  address: {
    order: 5
  }
};
