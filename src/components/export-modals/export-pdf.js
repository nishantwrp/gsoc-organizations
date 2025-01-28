import jsPDF from "jspdf"
const generatePDF = data => {
  const doc = new jsPDF()
  data.forEach((org, orgIndex) => {
    if (orgIndex > 0) doc.addPage()

    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text(org.name, 10, 10)
    doc.setFont("helvetica", "normal")
    const urlText = doc.splitTextToSize(`URL: ${org.url}`, 180)
    doc.setTextColor(0, 0, 255)
    doc.text(urlText, 10, 20)
    doc.setTextColor(0, 0, 0)
    const descriptionText = doc.splitTextToSize(
      `Description: ${org.description}`,
      180
    )
    doc.text(descriptionText, 10, 30 + urlText.length * 5)
    doc.text(`Category: ${org.category}`, 10, 40 + urlText.length * 5)

    let startY = 50 + urlText.length * 5

    const addTextWithPageBreak = (text, x, isUrl = false) => {
      const lines = doc.splitTextToSize(text, 180)
      lines.forEach((line, index) => {
        if (startY + 10 > 270) {
          doc.addPage()
          startY = 10
        }
        if (isUrl) {
          doc.setTextColor(0, 0, 255)
        }
        doc.text(line, x, startY + index * 10)
        if (isUrl) {
          doc.setTextColor(0, 0, 0)
        }
      })
      startY += lines.length * 10
    }

    const addSection = (title, items, x) => {
      addTextWithPageBreak(`${title}:`, x)
      items.forEach((item, index) => {
        addTextWithPageBreak(`${index + 1}. ${item}`, x + 10)
      })
    }

    addSection("Topics", org.topics, 10)
    addSection("Technologies", org.technologies, 10)

    addTextWithPageBreak("Years:", 10)
    const yearsArray = Object.entries(org.years)
    yearsArray.forEach(([year, details], index) => {
      addTextWithPageBreak(
        `${index + 1}. ${year}: ${details.num_projects} projects`,
        20
      )
      addTextWithPageBreak(`Projects URL: ${details.projects_url}`, 20, true)
    })
  })

  doc.save("organizations.pdf")
}

export { generatePDF }
