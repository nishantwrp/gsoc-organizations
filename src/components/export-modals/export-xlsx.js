import * as XLSX from "xlsx"
const generateExcel = data => {
  const wb = XLSX.utils.book_new() // Create a new workbook

  data.forEach(org => {
    const headers = [
      "name",
      "url",
      "description",
      "category",
      "topics",
      "technology",
      "year",
      "num_projects",
      "projects_url",
    ]

    const excelRows = [headers]
    const yearsArray = Object.entries(org.years).map(([year, details]) => [
      year,
      details.num_projects,
      details.projects_url,
    ])

    const maxRows = Math.max(
      org.technologies.length,
      org.topics.length,
      yearsArray.length
    )

    for (let i = 0; i < maxRows; i++) {
      const row = [
        i === 0 ? org.name : "",
        i === 0 ? org.url : "",
        i === 0 ? org.description : "",
        i === 0 ? org.category : "",
        org.topics[i] || "",
        org.technologies[i] || "",
        yearsArray[i]?.[0] || "",
        yearsArray[i]?.[1] || "",
        yearsArray[i]?.[2] || "",
      ]
      excelRows.push(row)
    }

    const ws = XLSX.utils.aoa_to_sheet(excelRows)
    const colWidths = excelRows[0].map(
      (_, colIndex) =>
        Math.max(
          ...excelRows.map(row =>
            row[colIndex] ? String(row[colIndex]).length : 0
          )
        ) + 2
    )

    excelRows.forEach((row, rowIndex) => {
      if (rowIndex > 0 && row[8]) {
        const cellRef = XLSX.utils.encode_cell({ r: rowIndex, c: 8 })
        ws[cellRef] = { v: row[8], t: "s", l: { Target: row[8] } }
      }
    })

    ws["!cols"] = colWidths.map(width => ({ wch: width }))

    let sheetName = org.name.replace(/[\\/?:*[\]]/g, "_").substring(0, 31)
    XLSX.utils.book_append_sheet(wb, ws, sheetName)
  })

  XLSX.writeFile(wb, "organizations.xlsx")
}
export { generateExcel }
