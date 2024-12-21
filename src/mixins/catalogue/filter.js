export default {
	data() {
		return {
			categories: [],
			payment_types: [
				{ text: 'On credit', value: 1 },
				{ text: 'Outright', value: 0 },
			],
			values: {},
			range: [1000, 10000],
			min: 0,
			max: 500000,
			sizes: [
				{ text: 'XS', value: 'XS' },
				{ text: 'S', value: 'S' },
				{ text: 'M', value: 'M' },
				{ text: 'L', value: 'L' },
				{ text: 'XL', value: 'XL' },
				{ text: 'XXL', value: 'XXL' },
			],
			genders: [
				{ text: 'Teen', value: '0' },
				{ text: 'Unisex', value: '1' },
				{ text: 'Unisex child', value: '2' },
				{ text: 'Men', value: '3' },
				{ text: 'Women', value: '4' },
			],
			sources: [
				{ text: 'Locally sourced', value: '0' },
				{ text: 'Foreign', value: '1' },
			]
		}
	},

	created() {
		const { min_price, max_price, ...values } = this.$store.state.catalogue.filter;
		this.range = [min_price, max_price];
		this.values = values;
		this.setCategories();
	},

	methods: {
		submit() {
			const [min_price, max_price] = this.range;
			const values = { ...this.values, min_price, max_price, page_number: 1, end: false }
			if (values.on_credit === 0) {
				values.max_monthly_amount = 0;
				values.max_no_of_months = 0;
			}
			this.$store.dispatch('catalogue/filterItems', values);
			if (!this.$route.path.match(/catalogue/gi)) {
				this.$router.push(`/${ this.$store.state.merchant.slug }/collections`)
			}
			this.$emit('close');
		},
		setCategories() {
			const categories = this.$store.state.merchant.tags.map(t => ({ value: t.id, text: t.name }))
			this.categories = [...categories]
		},
		cancelFilter() {
			this.values = {
				...this.values,
				max_monthly_amount: 0,
				max_no_of_months: 0,
				tag_ids: []
			}
			this.$refs.observer.reset()
			this.$store.commit('catalogue/cancelFilter')
		},
	},

	computed: {
		filtering() {
			return this.$store.state.catalogue.filtering
		},
	}
}
