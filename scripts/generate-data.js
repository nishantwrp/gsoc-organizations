const fs = require("fs")
const { compileData } = require("../api/compile-data")

const organizations = compileData()
fs.writeFileSync("./organizations.json", JSON.stringify(organizations))
