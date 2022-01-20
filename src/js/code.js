'use strict'

const longestCommonSubsequence = function(s1, s2) {
    if (s1.length < s2.length) [s1, s2] = [s2, s1];
    // the number of rows is determined by the longest string of the two parameters
    const table = {};
    let commonSubsequence = [];

    const createRows = function(data) {
        for (const [i] of [...data].entries()) {
        table[`row${i + 2}`] = [];
        table[`row${i + 2}`].push(0);
        }
    };

    const fillRows = function() {
        for (const [s1Index] of [...s1].entries()) {
            for (const [s2Index] of [...s2].entries()) {
                let adjacent = Number(table[`row${s1Index + 1}`][s2Index]);
                if (s2[s2Index] === s1[s1Index]) {
                    // add 1 + adjacent number + convert to string
                    table[`row${s1Index + 2}`].push(String(adjacent + 1));
                    // convert adjacent to string
                    table[`row${s1Index + 1}`][s2Index] = String(adjacent);
                } else {
                    // verify left and right neighbors and see which number is bigger
                    const left = Number(table[`row${s1Index + 2}`][s2Index]);
                    const top = Number(table[`row${s1Index + 1}`][s2Index + 1]);
                    const biggerNum = left > top ? left : top;
                    table[`row${s1Index + 2}`].push(biggerNum);
                }
            }
        }
    };

    const findMatchingLetters = function() {
        let starterIndex = 0;
        for (const [s1Index, s1Letter] of [...s1].reverse().entries()) {
            for (const [s2Index, s2Letter] of [...s2].reverse().entries()) {
                if (s2Index < starterIndex) continue;
                let adjacent = table[`row${s1.length - s1Index}`][s2.length - s2Index - 1];
                const top = table[`row${s1.length - s1Index}`][s2.length - s2Index];
                const current = table[`row${s1.length - s1Index + 1}`][s2.length - s2Index];

                if (typeof current === 'string' && typeof adjacent === 'string' && s2Letter === s1Letter) {
                    commonSubsequence.push(s2Letter);
                    starterIndex = s2Index + 1;
                    break;
                } else if (typeof current === 'string' && typeof top === 'string') {
                    break;
                } else if (typeof current !== 'string' && typeof top === 'string') {
                    break;
                }
            }
        }
    };

    const result = function() {
        const str = commonSubsequence.length === 0 ? 'None' : commonSubsequence.reverse().join('');
        console.log(`LCS: ${str}`);
        console.log(table);
    }

    // calls the function that creates rows based on which string has the greater length
    if (s1.length > s2.length) {
        table.row1 = new Array(s2.length + 1).fill(0);
        createRows(s1);
    } else if (s2.length > s1.length) {
        table.row1 = new Array(s1.length + 1).fill(0);
        createRows(s2);
    } else {
        table.row1 = new Array(s2.length + 1).fill(0);
        createRows(s1);
    }

    fillRows();
    findMatchingLetters();
    return result();
};