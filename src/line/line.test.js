/**
* @jest-environment jsdom
*/

const fs = require("fs")

require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")
const userEvent =require("@testing-library/user-event").default