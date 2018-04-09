window.VueModal = require('./VueModal');

String.prototype.capitalize = function () {
	return `${this[0].toUpperCase()}${this.substring(1)}`
};

require('./components/vue-modal');