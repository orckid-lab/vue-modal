Vue.component('vue-modal', {
	template: `
		<div v-if="modals.length > 0">
			<transition-group name="modal" tag="div">
				<modal v-for="(modal, index) in modals" v-bind:key="modal" :modal="modal" :class="modal.classesArray"></modal>
			</transition-group>
		</div>
	`,

	data(){
		return {
			modals: VueModal.modals(),
		}
	},

	components: {
		modal: require('./modal')
	},

	watch: {
		modals(newValue){
			let $contentWrapper = document.getElementById('app') || document.getElementById('global');

			if(newValue.length > 0 && (' ' + $contentWrapper.className + ' ').indexOf(' ' + 'active' + ' ') == -1){
				$contentWrapper.className += " active";

				return;
			}

			$contentWrapper.className = "";
		}
	}
});

new Vue({
	el: '#modals-wrapper',

	data: {},
});