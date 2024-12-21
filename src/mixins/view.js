export default {
	data: () => ({
		history: [],
		modal: '',
		overlay: '',
		completed: '',
	}),
	methods: {
		setOverlay() {
			this.overlay = '';
		},
		popView() {
			this.modal = '';
			this.history.pop();
		},
		pushView(view) {
			this.modal = '';
			if (this.history.includes(view)) {
				this.history = this.history.reduce((acc, v) => {
					if (!acc.includes(view)) acc.push(v);
					return acc;
				}, []);
			} else {
				this.history.push(view);
			}
		}
	},
	computed: {
		view() {
			return this.history[this.history.length - 1];
		}
	}
}
