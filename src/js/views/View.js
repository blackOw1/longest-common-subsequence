export default class View {
    _data;

    _render(data) {
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
        this._parentElement.classList.add('show');
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }
}