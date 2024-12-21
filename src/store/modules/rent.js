const state = {
  full_name: '',
  email: '',
  phone: '',
  rentAmount: '',
  houseType: '',
  houseAddress: '',
  image: null,
  landlordNumber: '',
  budgetRange: '',
  location: '',
  findHouseType: '',
  request: {},
  user: {},
};
const mutations = {
  set: (state, data) => {
    Object.keys(data).forEach((key) => {
      state[key] = data[key];
    });
  },
  clear: (state) => {
    Object.keys(state).forEach((key) => {
      state[key] = null;
    });
  },
};

const actions = {};

const getters = {};

const rent = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default rent;
