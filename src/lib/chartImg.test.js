const generateChartImg = require('./generateChartImg.js')
const fetch = require("whatwg-fetch");
//mocking the url function with a fake function since its not available to us in the test environment
global.URL.createObjectURL = jest.fn();
test('generates a URL when a request for a line chart is sent to the api', async ()=>{
    URL.createObjectURL.mockReturnValue('blob:mocked URL');

    const trialpoints = [
        { x:2, y:4 },
        {x:1,  y:5 },
        {x:7,  y:4 },

    ];
    const xLabel= 'X axis';
    const yLabel= 'Y axis';
    const title=  'My first line chart';
    const color = 'red';

    const url = await generateChartImg('line', trialpoints, xLabel, yLabel, title, color);
    expect(url).toBeTruthy();
    expect(url).toContain('blob:');
}); 
test('generates a Blolb URL when a request for a bar chart is sent to the api', async ()=>{
    URL.createObjectURL.mockReturnValue('blob:mocked URL');

    const trialpoints = [
        { x:2, y:4 },
        {x:1,  y:5 },
        {x:7,  y:4 },

    ];
    const xLabel= 'X axis';
    const yLabel= 'Y axis';
    const title=  'My first bar chart';
    const color = 'green';

    const url = await generateChartImg('bar', trialpoints, xLabel, yLabel, title, color);
    expect(url).toBeTruthy();
    expect(url).toContain('blob:');
}); 
test('generates a URL using blobs data when a request for a scatter chart is sent to the api', async ()=>{
    URL.createObjectURL.mockReturnValue('blob:mocked URL');

    const trialpoints = [
        { x:2, y:4 },
        {x:1,  y:5 },
        {x:7,  y:4 },

    ];
    const xLabel= 'X axis';
    const yLabel= 'Y axis';
    const title=  'My first scatter chart';
    const color = 'yellow';

    const url = await generateChartImg('scatter', trialpoints, xLabel, yLabel, title, color);
    expect(url).toBeTruthy();
    expect(url).toContain('blob:');
}); 
test('generates a URL using blobs data when a request for a scatter chart is sent to the api with null values', async ()=>{
    URL.createObjectURL.mockReturnValue('blob:mocked URL');

    const trialpoints = [];
    const xLabel= 'X axis';
    const yLabel= 'Y axis';
    const title=  'My first scatter chart';
    const color = 'yellow';

    const url = await generateChartImg('scatter', trialpoints, xLabel, yLabel, title, color);
    expect(url).toBeTruthy();
    expect(url).toContain('blob:');
}); 
test('generates a URL using blobs data which is negative when a request for a scatter chart is sent to the api', async ()=>{
    URL.createObjectURL.mockReturnValue('blob:mocked URL');

    const trialpoints = [
        { x:-12, y:4 },
        {x:100,  y:5 },
        {x:-7,  y:4 },

    ];
    const xLabel= 'X axis';
    const yLabel= 'Y axis';
    const title=  'My first scatter chart';
    const color = 'yellow';

    const url = await generateChartImg('scatter', trialpoints, xLabel, yLabel, title, color);
    expect(url).toBeTruthy();
    expect(url).toContain('blob:');
}); 
test('generates a URL using blobs data when a request for a scatter chart is sent to the api', async ()=>{
    URL.createObjectURL.mockReturnValue('blob:mocked URL');

    const trialpoints = [
        { x:2.6, y:4 },
        {x:1,  y:5 },
        {x:7000.4,  y:4 },

    ];
    const xLabel= 'X axis';
    const yLabel= 'Y axis';
    const title=  'My first scatter chart';
    const color = 'yellow';

    const url = await generateChartImg('scatter', trialpoints, xLabel, yLabel, title, color);
    expect(url).toBeTruthy();
    expect(url).toContain('blob:');
}); 