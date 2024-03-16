//arrange
const sortPoints = require('./sortPoints.js')
test('sorts an array based on the ascending order of the x values recieved', ()=>{
    const trialpoints = [
        { x:2, y:4 },
        {x:1,  y:5 },
        {x:7,  y:4 },

    ];
    // act
    const sortedxvalues = sortPoints(trialpoints);
    //assert
    expect(sortedxvalues).toEqual([
        { x:1, y:5},
        {x:2,  y:4},
        {x:7, y:4},
    ]);
});
test('sorts an array based on the ascending order but now of very high x values', ()=>{
    const trialpoints = [
        { x:2001, y:4 },
        {x:100000,  y:5 },
        {x:1999,  y:4 },

    ];
    // act
    const sortedxvalues = sortPoints(trialpoints);
    //assert
    expect(sortedxvalues).toEqual([
        { x:1999, y:4},
        {x:2001,  y:4},
        {x:100000, y:5},
    ]);
});
test('sorting out same x values same array should be recived', ()=>{
    const trialpoints = [
        { x:2, y:9 },
        {x:2,  y:5 },
        {x:7,  y:4 },

    ];
    // act
    const sortedxvalues = sortPoints(trialpoints);
    //assert
    expect(sortedxvalues).toEqual([
        { x:2, y:9},
        {x:2,  y:5},
        {x:7, y:4},
    ]);
});
test('tesing out sorting in ascending order when negative numbers are in the array ', ()=>{
    const trialpoints = [
        { x:-2, y:4 },
        {x:1,  y:5 },
        {x:7,  y:4 },

    ];
    // act
    const sortedxvalues = sortPoints(trialpoints);
    //assert
    expect(sortedxvalues).toEqual([
        { x:-2, y:4},
        {x:1,  y:5},
        {x:7, y:4},
    ]);
});
test('tesing out sorting in ascending order when all values in the array have the same x values ', ()=>{
    const trialpoints = [
        { x:1, y:4 },
        {x:1,  y:5 },
        {x:1,  y:4 },

    ];
    // act
    const sortedxvalues = sortPoints(trialpoints);
    //assert
    expect(sortedxvalues).toEqual([
        { x:1, y:4},
        {x:1,  y:5},
        {x:1, y:4},
    ]);
});
test('tesing out sorting in ascending order when the array is completely empty', ()=>{
    const trialpoints = [];
    // act
    const sortedxvalues = sortPoints(trialpoints);
    //assert
    expect(sortedxvalues).toEqual([]);
});