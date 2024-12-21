<template>
  <div class="d-flex flex-column align-center justify-center text-center px-10 py-16">
    <img alt="Hourglass" src="@/assets/images/hourglass.svg" style="max-width: 200px"/>
    <h3 class="mt-12">Check will be available in {{ timer.days }}:{{ timer.hours }}:{{ timer.minutes }}:{{ timer.seconds }}</h3>
    <p class="mt-4" style="max-width: 300px">Our team is hard at work to ensure you get the best checkout experience</p>
  </div>
</template>
<script>
	export default {
		name: 'CheckoutTimer',
		data: () => ({
			timer: {
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
			},
			date: '07/12/2021',
			interval: null
		}),
		created() {
			this.startTimer();
		},
		methods: {
			startTimer() {
				this.countdown(this.date);
				this.interval = setInterval(() => {
					this.countdown(this.date);
				}, 1000);
			},
			countdown(date) {
				const future = new Date(date);
				const now = new Date(Date.now());

				if (future < now) {
					this.timer = {
						days: '00',
						hours: '00',
						minutes: '00',
						seconds: '00'
					}
					return
				}

				const diff = future - now;

				this.timer.days = Math.floor(diff / (1000 * 60 * 60 * 24));
				this.timer.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				this.timer.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
				this.timer.seconds = Math.floor((diff % (1000 * 60)) / 1000);
			}
		}
	}
</script>
