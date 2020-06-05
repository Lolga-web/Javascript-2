Vue.component('error',{
	props: ['visibility'],
	template:`
		<div id="error" v-show="visibility">
			<h1>404</h1>
			<p>error - not found</p>
		</div>
	`
})