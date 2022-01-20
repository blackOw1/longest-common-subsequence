import View from "./View";

class ResultsView extends View {
    _parentElement = document.querySelector('.results');

    _generateMarkup() {
        return this._data.length === 0 ? `
        <p class="results__copy">There are no common subsequences</p>` : `
        <p class="results__copy">The common subsequence of the two sequences is</p>
        <p class="results__result">${this._data.join('')}</p>`;
    }
}

export default new ResultsView();