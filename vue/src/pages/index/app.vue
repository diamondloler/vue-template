<template>
	<div id="app">
		hello huya-vue
	</div>
</template>

<script>
	export default {
		mounted() {
			console.log(`hello huya-vue`);

			// this.$api.test.postQueryInfo({
			// 	'data': {
			// 		'user': '123456'
			// 	}
			// }).then(res => {
			// 	console.log(res);
			// }).catch(e => {
			// 	console.log(e);
			// });

			// this.$api.test.getQueryInfo({
			// 	'wupData': 'wupData'
			// }).then(res => {
			// 	console.log(res);
			// }).catch(e => {
			// 	console.log(e);
			// });

			// console.log(this.$store.state.count);
			// this.$store.commit('increment');
			// setTimeout(() => {
			//     console.log(this.$store.state.count);
			// }, 2000);

		}
	}
</script>

<style lang="scss">
	#app {
		background: #000;
		color: #fff;
	}
</style>