import http from '../../plugins/http'

const state = {
  id: null,
  items: [],
  req_status: 0,
  request_schedule: [],
  no_of_months: 0,
  upfront_amt: 0,
  customer: {},
  bs_transaction_id: null,
  upfront_paid: null,
  cred_plus_upfront: 0,
  eligibility_data: null,
  creditclan_request_id: null,
  stages: {},
  stage: 0,
  analysis_completed: [],
  email_verified: 0,
  offer: null,
  slug: null,
  whatsapp_order: 0,
  cc_request: null,
  payment_status: 0,
  total: 0,
}

const getters = {
  total() {
    return state.total
  },
  hasOffer(state) {
    return state.cc_request?.loan?.offer_selected
  },
  stage(state) {
    return state?.cc_request?.loan?.stage
  },
  paid(state) {
    return state.payment_status === 1
  },
  status(state) {
    return +state.cc_request?.loandetails?.LOAN_STATUS || 0
  },
  upfrontAmount(state) {
    return state.cc_request?.loan?.offer_selected?.upfront || 0
  },
  noOfMonths(state) {
    if (!state.cc_request || !state.cc_request.loan.offer_selected) {
      const plan_duration = state.items[0]?.item_plan?.plan?.duration
      return plan_duration || state.no_of_months
    }
    return state.cc_request.loan.offer_selected.duration
  },
  monthlyAmount(state) {
    return state.cc_request?.loan?.offer_selected?.monthly_repayment
  },
  schedule(state) {
    if (state.cc_request?.loan?.offer_selected) {
      return (
        state.cc_request?.schedule?.map((s, i) => ({
          date: s.repayment_date,
          serial: i + 1,
          amount: +s.how_much_paid + +s.how_much_remaining,
          amount_paid: +s.how_much_paid,
          paid: +s.how_much_remaining === 0,
        })) || []
      )
    }
    return request?.request_schedule || []
  },
  nextPayment(state, getters) {
    const unpaidSchedules = getters.schedule.filter((s) => {
      return (
        new Date(Date.now()) > new Date(s.date) && +s.amount_paid < +s.amount
      )
    })
    const debt = unpaidSchedules.reduce((acc, s) => {
      acc += +s.amount - +s.amount_paid
      return acc
    }, 0)
    const next = getters.schedule.find((s) => {
      return (
        new Date(Date.now()) < new Date(s.date) && +s.amount_paid < +s.amount
      )
    })
    const amount = (next ? +next.amount - +next.amount_paid : 0) + debt
    return next
      ? {
        amount,
        date: next.date,
        ids: [...unpaidSchedules.map((s) => s.id), next.id],
      }
      : {
        amount,
        date: unpaidSchedules[unpaidSchedules.length - 1]
          ? unpaidSchedules[unpaidSchedules.length - 1].date
          : null,
        ids: unpaidSchedules.map((s) => s.id),
      }
  },
  analysisDone(state) {
    return state.cc_request?.loan?.stage === 'completed'
  },
  emailVerified(state) {
    return (
      (state.customer.email && state.email_verified === 1) ||
      state.whatsapp_order === 1
    )
  },
  credit() {
    return !!state.creditclan_request_id
  },
}

const mutations = {
  set: (state, data) => {
    Object.keys(data).forEach((key) => {
      state[key] = data[key]
    })
  },
  clear: (state) => {
    Object.keys(state).forEach((key) => {
      state[key] = null
    })
  },
}

const actions = {
  async resolveId(_, slug) {
    const {
      data: { data },
    } = await http.get(`/3/slug/${ slug }`)
    return data
  },
  async load({ commit }, id) {
    try {
      const res = await http.get(
        `https://sellbackend.creditclan.com/merchantclan/public/index.php/api/get_order_request/${ id }`
      )
      const data = res.data.data
      commit('set', {
        ...data,
        merchant_id: data.items[0].merchant_id,
      })
    } catch (e) {
      console.log(e)
    }
  },
  async cancel({ state, getters }) {
    if (getters.paid) return
    const { id: rid, creditclan_request_id } = state
    await http.delete(
      `https://sellbackend.creditclan.com/merchantclanbackend/public/index.php/api/request/${rid}`
    )
    if (creditclan_request_id) {
      await http.post(
        `https://mobile.creditclan.com/api/v3/cancel/loan_request`,
        { request_id: creditclan_request_id },
        {
          headers: {
            'x-api-key': 'WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228',
          },
        }
      )
    }
  },
}

const request = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

export default request
