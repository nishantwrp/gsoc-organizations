import React from "react"
import { Dropdown } from "semantic-ui-react"
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
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

function ModalExampleModal() {
  const [open, setOpen] = React.useState(false)
  const [selectedOption, setSelectedOption] = React.useState(null)

  const handleDownload = () => {
    console.log("Selected file format:", selectedOption)
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
            onChange={(e, { value }) => setSelectedOption(value)}
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
