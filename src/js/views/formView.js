class FormView {
    _parentElement = document.querySelector('.form');
    _input1 = this._parentElement.querySelector('#input-1');
    _input2 = this._parentElement.querySelector('#input-2');

    _addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            const btn = e.target.closest('.form__btn');

            if (!btn) return;

            handler();
        });
    }

    _getInputData() {
        return [this._input1.value.toUpperCase(), this._input2.value.toUpperCase()];
    }
}

export default new FormView();