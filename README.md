Vue Modal

Plugin to display a modal using vue component and bulma modal markup.

Installation

npm install https://github.com/mm-x/vue-modal

Usage

require('vue-modal');

// basic
VueModal.show();

// component section
VueModal.show({
    components: {
        content: 'custom-component-content',
        footer: 'custom-component-footer',
    }
});

// passing data and callbacks
VueModal
    .show({
        data: {
            name: 'name',
            description: 'description',
        },
        components: {
            content: 'custom-component-content-2',
            footer: 'custom-component-footer-2',
        },
        callbacks: {
            confirm(){
                alert(`${this.name} and ${this.description}`);
            }
        }
    });