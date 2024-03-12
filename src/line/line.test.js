/**
* @jest-environment jsdom
*/

const fs = require("fs")

require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")
const userEvent =require("@testing-library/user-event").default

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

test("When a user clicks the plus button, a new input box appears", async function() {
    // Arrange:
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)
    
    // Acquire the input field
    const plusButton = domTesting.getByText(document, "+")
    
    const initialInputCount = domTesting.getAllByLabelText(document, "X").length
    console.log(initialInputCount)
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