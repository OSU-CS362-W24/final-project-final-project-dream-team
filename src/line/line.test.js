/**
* @jest-environment jsdom
*/
const fs = require("fs");
require("@testing-library/jest-dom");
const { getByText, getByLabelText, waitFor } = require("@testing-library/dom");
const userEvent = require("@testing-library/user-event").default;

function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    document.open();
    document.write(html);
    document.close();

    jest.isolateModules(function() {
        require(jsPath);
    });
}
//Arrange
initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`);

test("Clear chart button clears all chart data", async function() {
    const user = userEvent.setup();
    const chartTitleInput = getByLabelText(document, "Chart title");
    const xLabelInput = getByLabelText(document, "X label");
    const yLabelInput = getByLabelText(document, "Y label");
    const clearChartBtn = getByText(document, "Clear chart data");

    //Act
    await user.type(chartTitleInput, "Test Chart Title");
    await user.type(xLabelInput, "Test X Label");
    await user.type(yLabelInput, "Test Y Label");

    const xValueInputs = document.querySelectorAll("[data-testid^='x-input']");
    const yValueInputs = document.querySelectorAll("[data-testid^='y-input']");

    await user.type(xValueInputs[0], "1");
    await user.type(yValueInputs[0], "100");

    await user.click(clearChartBtn);

    //Assert
    await waitFor(function () {
        expect(chartTitleInput.value).toBe("");
        expect(xLabelInput.value).toBe("");
        expect(yLabelInput.value).toBe("");
    });
});
