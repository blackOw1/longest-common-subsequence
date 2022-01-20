import * as model from './model';
import formView from './views/formView';
import resultsView from './views/resultsView';

const controlFindCommonSubsequence = function() {
    // Sets the state
    model.setState();

    // Stores the values of the inputs
    [model.state.sequence1, model.state.sequence2] = formView._getInputData();

    // Finds the subsequence
    model.findSubsequence();

    // Render the result
    resultsView._render(model.state.common);
};

const init = function() {
    formView._addHandlerClick(controlFindCommonSubsequence);
};

init();