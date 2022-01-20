export const state = {
    // sequence1: null,
    // sequence2: null,
    // common: [],
    // table: {}
};

export const findSubsequence = function(seq1, seq2) {
    seq1 = state.sequence1;
    seq2 = state.sequence2;

    if (seq1.length < seq2.length) [seq1, seq2] = [seq2, seq1];

    if (seq1.length > seq2.length || seq1.length === seq2.length) {
        state.table.row1 = new Array(seq2.length + 1).fill(0);
        createRows(seq1);
    }

    if (seq2.length > seq1.length) {
        state.table.row1 = new Array(seq1.length + 1).fill(0);
        createRows(seq2);
    }

    // Fills the rows of the table
    fillRows(seq1, seq2);

    // Finds the common letters
    findCommonLtrs(seq1, seq2);

    if (state.common) state.common = state.common.reverse();

    // console.log(state);
};

const createRows = function(data) {
    [...data].forEach((ltr, i) => {
        state.table[`row${i + 2}`] = [];
        state.table[`row${i + 2}`].push(0);
    });
};

const fillRows = function(seq1, seq2) {    
    for (const [seq1Index] of [...seq1].entries()) {
        for (const [seq2Index] of [...seq2].entries()) {
            const adjacent = Number(state.table[`row${seq1Index + 1}`][seq2Index]);
            
            if (seq2[seq2Index] === seq1[seq1Index]) {
                // add 1 + adjacent number + convert to string
                state.table[`row${seq1Index + 2}`].push(String(adjacent + 1));
                // convert adjacent to string
                state.table[`row${seq1Index + 1}`][seq2Index] = String(adjacent);
            } else {
                // verify left and right neighbors and see which number is bigger
                const left = Number(state.table[`row${seq1Index + 2}`][seq2Index]);
                const top = Number(state.table[`row${seq1Index + 1}`][seq2Index + 1]);
                const biggerNum = left > top ? left : top;
                state.table[`row${seq1Index + 2}`].push(biggerNum);
            }
        }
    }
};

const findCommonLtrs = function(seq1, seq2) {
    let starterIndex = 0;

    for (const [seq1Index, seq1Ltr] of [...seq1].reverse().entries()) {
        for (const [seq2Index, seq2Ltr] of [...seq2].reverse().entries()) {
            if (seq2Index < starterIndex) continue;

            const adjacent = state.table[`row${seq1.length - seq1Index}`][seq2.length - seq2Index - 1];
            const top = state.table[`row${seq1.length - seq1Index}`][seq2.length - seq2Index];
            const current = state.table[`row${seq1.length - seq1Index + 1}`][seq2.length - seq2Index];

            if (typeof current === 'string' && typeof adjacent === 'string' && seq2Ltr === seq1Ltr) {
                state.common.push(seq2Ltr);
                starterIndex = seq2Index + 1;
                break;
            }

            if (typeof current === 'string' && typeof top === 'string') break;

            if (typeof current !== 'string' && typeof top === 'string') break;
        }
    }
};

export const setState = function() {
    state.sequence1 = null;
    state.sequence2 = null;
    state.common = [];
    state.table = {};
};