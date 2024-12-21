export default {
	data() {
		return {
			merchant: this.$store.state.merchant,
			view: 'home',
			views: {
				home: 'home',
				how: 'how',
				confirmation: 'confirmation',
				form: 'form',
				success: 'success'
			},
		};
	},

	methods: {
		cancel() {
			this.$emit('close');
			this.view = this.views.home;
		}
	}
}