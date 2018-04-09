module.exports = {
	template: `
		<div class="vue-modal">
			<div class="mask"></div>
			<div class="vue-modal-content">
				<div v-if="modal.defaultContent" v-html="modal.contentHtml"></div>
				<component v-if="modal.componentContent" :is="modal.contentComponent" :modal="modal"></component>
				<div v-if="modal.defaultFooter" class="btn-handler">
					<button class="button" @click="modal.close()" v-if="modal.isConfirm()">{{ modal.labels.cancel }}</button>
					<button class="button is-primary" @click="modal.confirm()">{{ modal.labels.confirm }}</button>
				</div>
				<div v-if="modal.htmlFooter" v-html="modal.footerHtml"></div>
				<component v-if="modal.componentFooter" :is="modal.footerComponent" :modal="modal"></component>
			</div>
		</div>
	`,

	props: {
		modal: {
			type: Object,
			default(){
				return VueModal.create();
			},
		},
	},
};