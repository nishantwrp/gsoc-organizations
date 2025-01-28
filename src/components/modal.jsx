import React from "react"
import { generateExcel } from "./export-modals/export-xlsx"
import { generatePDF } from "./export-modals/export-pdf"
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Dropdown,
} from "semantic-ui-react"
const options = [
  {
    key: "Excel file",
    text: "Excel file (.xlsx)",
    value: "Excel file",
  },
  {
    key: "PDF file",
    text: "Pdf file (.pdf)",
    value: "PDF file",
  },
]

const ModalExampleModal = ({ filteredOrganizations }) => {
  const [open, setOpen] = React.useState(false)
  const [selectedOption, setSelectedOption] = React.useState(null)

  const handleDownload = () => {
    console.log("Selected file format:", selectedOption)
    console.log("filteredOrganizations:", filteredOrganizations)
    if (selectedOption === "Excel file") {
      generateExcel(filteredOrganizations)
    } else if (selectedOption === "PDF file") {
      generatePDF(filteredOrganizations)
    }
    setOpen(false)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button className="ui orange label">Show Modal</Button>}
    >
      <ModalHeader>Select a File Format</ModalHeader>
      <ModalContent image>
        <ModalDescription>
          <p>Extension</p>
          <Dropdown
            placeholder="Select file format"
            fluid
            selection
            options={options}
            value={selectedOption}
            onChange={(_, { value }) => setSelectedOption(value)}
          />
          <p>available formats: .xlsx, .pdf</p>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button
          color="orange"
          style={{ padding: "10px" }}
          onClick={handleDownload}
          disabled={!selectedOption}
        >
          Download
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default ModalExampleModal
