import Ajax from './ajax'

module.exports = class Contact {
    constructor() {
        this.form = document.getElementById('contactform')

        if (!this.form) return

        this.confirmation = document.querySelector('.confirmation')
        this.ajax = new Ajax()

        this.form.addEventListener('submit', (e) => {
            this.submit()
            e.preventDefault()
            return false
        })
    }

    submit() {
        var data = this.toJSONString(this.form)
        this.ajax.post('https://formspree.io/filosoferenindeventer+contactformulier@gmail.com',
            data,
            (e) => {
                this.showConfirmation()
            },
            true,
            'json'
        )
    }

    toJSONString (form) {
		var obj = {};
		var elements = form.querySelectorAll( "input, select, textarea" );
		for( var i = 0; i < elements.length; ++i ) {
			var element = elements[i];
			var name = element.name;
			var value = element.value;

			if( name ) {
				obj[ name ] = value;
			}
		}
        return obj;
    }

    showConfirmation() {
        this.confirmation.classList.toggle('visible')
    }
}