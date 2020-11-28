const fs = require("fs")
fs.readFile("package-lock.json", (err, data) => {
  if (err) {
    return
  }
  throw new Error("package-lock.json found!")
})
