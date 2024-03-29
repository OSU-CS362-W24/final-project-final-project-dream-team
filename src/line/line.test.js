/**
* @jest-environment jsdom
*/

const fs = require("fs")

//Import testing libraries
require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")
const userEvent =require("@testing-library/user-event").default

//Initializes DOM from HTML and JS files
function initDomFromFiles(htmlPath, jsPath) {
	const html = fs.readFileSync(htmlPath, 'utf8')
	document.open()
	document.write(html)
	document.close()
    //Isolates javascript module
	jest.isolateModules(function() {
		require(jsPath)
	})
}

//Reset modules and mocks before each test
beforeEach(function() {
    jest.resetModules()
    jest.restoreAllMocks()
})

test("When a user clicks the plus button, a new input box appears", async function() {
    // Arrange:
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)
    
    // Acquire the input field
    const plusButton = domTesting.getByText(document, "+")
    
    const initialInputCount = domTesting.getAllByLabelText(document, "X").length
    // Act:
    const user = userEvent.setup()
    await user.click(plusButton)

    // Assert:
    await domTesting.waitFor(() => {
        newInputCount = domTesting.getAllByLabelText(document, "X").length
        return newInputCount
    })
    expect(newInputCount).toBe(initialInputCount + 1)

})

test("When a user clicks the plus button five times, five new input boxes appear", async function() {
    // Arrange:
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)
    
    // Acquire the input field
    const plusButton = domTesting.getByText(document, "+")
    
    const initialInputCount = domTesting.getAllByLabelText(document, "X").length
    // Act:
    const user = userEvent.setup()
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)

    // Assert:
    await domTesting.waitFor(() => {
        newInputCount = domTesting.getAllByLabelText(document, "X").length
        return newInputCount
    })
    expect(newInputCount).toBe(initialInputCount + 5)

})

test("When a user clicks the plus button, the values the user already entered are not impacted ", async function() {
    // Arrange:
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    
    // Acquire the input field
    const plusButton = domTesting.getByText(document, "+")
    
    const initialXValues = domTesting.getAllByLabelText(document, "X")
    const initialYValues = domTesting.getAllByLabelText(document, "Y")

    // Get the values before user interaction
    const initialXValuesText = initialXValues.map(input => input.value)
    const initialYValuesText = initialYValues.map(input => input.value)

    // Act:
    const user = userEvent.setup()
    await user.type(initialXValues[0], "4")
    await user.type(initialYValues[0], "2")
    await user.click(plusButton)

    // Assert:
    await domTesting.waitFor(() => {
        newXValues = domTesting.getAllByLabelText(document, "X")
        newYValues = domTesting.getAllByLabelText(document, "Y")
        return newXValues && newYValues
    })
    const newXValuesText = newXValues.map(input => input.value)
    const newYValuesText = newYValues.map(input => input.value)

    // Check if the new values match the initial values
    expect(newXValuesText).toEqual(expect.arrayContaining(initialXValuesText))
    expect(newYValuesText).toEqual(expect.arrayContaining(initialYValuesText))

})

test("When a user clicks the generate chart button without entering a label for x or y and without entering any data, an error message is displayed", async function() {
    // Arrange:
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {})

    // Acquire the input field
    const generateChart = domTesting.getByText(document, 'Generate chart')

    // Act:
    const user = userEvent.setup()
    await user.click(generateChart)

    // Assert:
    expect(mockAlert).toHaveBeenCalledTimes(1)
    mockAlert.mockRestore()

})

test("When a user clicks the generate chart button after only providing a Y label, an error message is displayed", async function() {
    // Arrange:
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {})

    // Acquire the input field
    const generateChart = domTesting.getByText(document, 'Generate chart')
    const yLabel = domTesting.getByLabelText(document, 'Y label')

    // Act:
    const user = userEvent.setup()
    await user.type(yLabel, 'Speed')
    await user.click(generateChart)

    // Assert:
    expect(mockAlert).toHaveBeenCalledTimes(1)
    mockAlert.mockRestore()

})

test("When a user clicks the generate chart button after only providing a X label, an error message is displayed", async function() {
    // Arrange:
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {})

    // Acquire the input field
    const generateChart = domTesting.getByText(document, 'Generate chart')
    const XLabel = domTesting.getByLabelText(document, 'X label')

    // Act:
    const user = userEvent.setup()
    await user.type(XLabel, 'Time')
    await user.click(generateChart)

    // Assert:
    expect(mockAlert).toHaveBeenCalledTimes(1)
    mockAlert.mockRestore()

})

test("When a user clicks the generate chart button without providing data, an error message is displayed", async function() {
    // Arrange:
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {})

    // Acquire the input field
    const generateChart = domTesting.getByText(document, 'Generate chart')
    const XLabel = domTesting.getByLabelText(document, 'X label')
    const yLabel = domTesting.getByLabelText(document, 'Y label')

    // Act:
    const user = userEvent.setup()
    await user.type(XLabel, 'Time')
    await user.type(yLabel, 'Speed')
    await user.click(generateChart)

    // Assert:
    expect(mockAlert).toHaveBeenCalledTimes(1)
    mockAlert.mockRestore()

})

test("When a user clicks the generate chart button without x and y labels but provides data, an error message is displayed", async function() {
    // Arrange:
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {})
    
    // Acquire the input field
    const plusButton = domTesting.getByText(document, "+")
    const generateChart = domTesting.getByText(document, 'Generate chart')
    const Xvalues = domTesting.getAllByLabelText(document, "X")
    const Yvalues = domTesting.getAllByLabelText(document, "Y")


    // Act:
    const user = userEvent.setup()
    await user.type(Xvalues[0], '4')
    await user.type(Yvalues[0], '3')
    await user.click(plusButton)
    await user.type(Xvalues[1], '5')
    await user.type(Yvalues[1], '5')

    await user.click(generateChart)

    // Assert:
    expect(mockAlert).toHaveBeenCalledTimes(1)
    mockAlert.mockRestore()

})

test("Clear chart button clears all chart data", async function() {

    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`);

    const user = userEvent.setup();
    const chartTitleInput = domTesting.getByLabelText(document, "Chart title");
    const xLabelInput = domTesting.getByLabelText(document, "X label");
    const yLabelInput = domTesting.getByLabelText(document, "Y label");
    const clearChartBtn = domTesting.getByText(document, "Clear chart data");
    const xValueInputs = domTesting.getAllByLabelText(document, "X");
    const yValueInputs = domTesting.getAllByLabelText(document, "Y");

    //Act
    await user.type(chartTitleInput, "Test Chart Title");
    await user.type(xLabelInput, "Test X Label");
    await user.type(yLabelInput, "Test Y Label");
    await user.type(xValueInputs[0], "1");
    await user.type(yValueInputs[0], "100");
    await user.click(clearChartBtn);

    await domTesting.waitFor(() => {
        XValues = domTesting.getAllByLabelText(document, "X")
        YValues = domTesting.getAllByLabelText(document, "Y")
        return XValues && YValues
    })

    const XValuesText = XValues.map(input => input.value)
    const YValuesText = YValues.map(input => input.value)
    

    //Assert
    await domTesting.waitFor(function () {
        expect(chartTitleInput.value).toBe("");
        expect(xLabelInput.value).toBe("");
        expect(yLabelInput.value).toBe("");
        expect(XValuesText).toEqual([""]);
        expect(YValuesText).toEqual([""]); 
    });
    
});

test("generateChartImg() is called when generate chart is clicked with chart data and correct image url is returned", async function(){

    jest.mock("../lib/generateChartImg.js")
    const generateChartImgStub = require("../lib/generateChartImg")
    generateChartImgStub.mockImplementation(function() {
        return "http://placekitten.com/480/480"
    })

    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    const user = userEvent.setup()
    const chartTitleInput = domTesting.getByLabelText(document, "Chart title")
    const xLabelInput = domTesting.getByLabelText(document, "X label")
    const yLabelInput = domTesting.getByLabelText(document, "Y label")
    const xValueInputs = domTesting.getAllByLabelText(document, "X")
    const yValueInputs = domTesting.getAllByLabelText(document, "Y")
    const generateChartButton = domTesting.getByText(document, "Generate chart")
    const chartColor = domTesting.getByTestId(document, "chart-color-input").value

    await user.type(chartTitleInput, "Chart Title")
    await user.type(xLabelInput, "X Label")
    await user.type(yLabelInput, "Y Label")
    await user.type(xValueInputs[0], "1")
    await user.type(yValueInputs[0], "10")
    await user.click(generateChartButton)

    expect(generateChartImgStub).toHaveBeenCalledTimes(1)
    expect(generateChartImgStub).toHaveBeenCalledWith(
        'line',
        [{"x": "1", "y": "10"}],
        'X Label',
        'Y Label',
        'Chart Title',
        chartColor
    )

    const returnedUrl = await generateChartImgStub('line', [{"x": "1", "y": "10"}], 'X Label', 'Y Label', 'Chart Title', chartColor)
    expect(returnedUrl).toMatch("http://placekitten.com/480/480")

    generateChartImgStub.mockRestore()
})