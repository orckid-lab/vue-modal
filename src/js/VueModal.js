let modals = [];

let deepMerge = require('deep-extend');

class VueModal {
	constructor(settings) {
		this.section = {
			header: 'default',
			content: 'default',
			footer: 'default',
		};

		this.created_at = new Date().getTime() + parseInt(Math.random() * 100);

		this.labels = {
			confirm : 'Save changes',
			cancel: 'cancel',
		};

		this.modalType = 'confirm'; // confirm, alert

		this.contentHtml = 'See documentation how to customize the modal content.';

		this.classesArray = [];

		this._mergeSettings(settings)
	}

	_mergeSettings(settings){
		if(!settings){
			return;
		}

		let {data, components, callbacks, buttonLabels} = settings;

		this.data(data)
			.components(components)
			.callbacks(callbacks)
			.buttonLabels(buttonLabels);
	}

	setHeader(type, content = true) {
		return this._setSection('header', type, content);
	}

	setContent(type, content = true) {
		return this._setSection('content', type, content);
	}

	setFooter(type, content = true) {
		return this._setSection('footer', type, content);
	}

	_setSection(section_name, type, content) {
		this.section[section_name] = type;

		this[`${section_name}${type.capitalize()}`] = content;

		return this;
	}

	_component(section, name, options = null) {
		this.section[section] = 'component';

		this[`${section}Component`] = name;

		return this;
	}

	isConfirm(){
		return this.modalType == 'confirm';
	}

	show() {
		let sections = ['header', 'content', 'footer'];

		sections.forEach(function (section) {
			this[`${this.section[section]}${section.capitalize()}`] = true;
		}.bind(this));

		modals.push(this);

		return this;
	}

	close() {
		console.log(_.findIndex(modals, {created_at: this.created_at}), this.created_at);
		modals.splice(_.findIndex(modals, {created_at: this.created_at}), 1);
	}

	components(components){
		if(components){
			for(let component in components){
				if(components.hasOwnProperty(component)){
					this._component(component, components[component]);
				}
			}
		}

		return this;
	}

	callbacks(callbacks){
		if(callbacks){
			Object.assign(this, callbacks);
		}

		return this;
	}

	data(data){
		if(data){
			Object.assign(this, data);
		}

		return this;
	}

	buttonLabels(labels){
		if(labels){
			Object.assign(this.labels, labels);
		}

		return this;
	}

	type(modalType){
		this.modalType = modalType;

		return this
	}

	content(content){
		this.contentHtml = content;

		return this;
	}

	classes(classes){
		this.classesArray = classes;

		return this;
	}

	confirm(){
		this.close();
	}

	static create(){
		return new VueModal;
	}

	static component(name, options){
		let merged_options = deepMerge(options, {
			props: {
				modal: {
					type: Object,
					default(){
						return VueModal.create();
					},
				}
			},

			computed: {
				content(){
					return this.$parent.$children[0];
				}
			}
		});

		Vue.component(name, merged_options);
	}

	static modals (){
		return modals;
	}

	static show(settings){
		return new VueModal(settings).show();
	}
}

module.exports = VueModal;