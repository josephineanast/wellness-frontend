import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getVendors } from "../api/vendor";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;
  min-width: 300px;
`;

const Label = styled.label`
  margin-bottom: 12px;
`;

const ChildLabel = styled.label``;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  box-sizing: border-box;
`;

const Select = styled.select`
  padding: 5px;
  margin-bottom: 10px;
`;

const Option = styled.option`
  padding: 5px;
`;

const SubmitBtn = styled.button`
  margin-top: 16px;
  margin-bottom: 10px;
`;

const CancelBtn = styled.button``;

export default function EventForm({ token, userId, onClose, onSubmit }) {
  const [eventFormData, setEventFormData] = useState({
    name: "",
    company: userId,
    vendor: "",
    proposedDates: [],
    confirmedDate: null,
    status: "Pending",
    remarks: "",
    proposedLocation: {
      postalCode: "",
      streetName: "",
    },
    vendorName: "",
  });
  const [vendors, setVendors] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(eventFormData, token, event);
  };

  const handleDateChange = (e) => {
    if (selectedDates.length >= 3) {
      alert("You can only select three dates.");
      return;
    }

    const date = e.target.value;
    const selectedDate = new Date(date);

    if (!isNaN(selectedDate.getTime())) {
      setSelectedDates((prevDates) => [...prevDates, selectedDate]);

      setEventFormData((prevData) => ({
        ...prevData,
        proposedDates: [
          ...prevData.proposedDates,
          selectedDate.toISOString().split("T")[0],
        ],
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "vendor") {
      const selectedVendor = vendors.find((vendor) => vendor._id === value);

      setEventFormData((prevData) => ({
        ...prevData,
        vendorName: selectedVendor ? selectedVendor.name : "",
        [name]: value,
      }));
    } else if (name.startsWith("proposedLocation")) {
      const locationField = name.split("proposedLocation")[1];
      setEventFormData((prevData) => ({
        ...prevData,
        proposedLocation: {
          ...prevData.proposedLocation,
          [locationField]: value,
        },
      }));
    } else {
      setEventFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await getVendors();
        setVendors(response);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Label>Event Name</Label>
        <Input
          type="text"
          name="name"
          value={eventFormData.name}
          onChange={handleInputChange}
        />
        <Label>Vendor</Label>
        <Select
          name="vendor"
          value={eventFormData.vendor}
          onChange={handleInputChange}
        >
          <Option value="">Select Vendor</Option>
          {vendors.map((vendor) => (
            <Option key={vendor._id} value={vendor._id}>
              {vendor.name}
            </Option>
          ))}
        </Select>
        <Label>
          Selected Dates:{" "}
          {selectedDates
            .filter((date) => !isNaN(date.getTime()))
            .map((date) => date.toISOString().split("T")[0])
            .join(", ")}
        </Label>

        <Input
          type="date"
          value={selectedDates}
          onChange={handleDateChange}
          placeholder="Select 3 proposed dates"
        />

        <Label>Proposed Locations:</Label>
        <ChildLabel> Postal Code</ChildLabel>
        <Input
          type="text"
          name="proposedLocationpostalCode"
          value={eventFormData.proposedLocation.postalCode}
          onChange={handleInputChange}
        />
        <ChildLabel>Street Name</ChildLabel>
        <Input
          type="text"
          name="proposedLocationstreetName"
          value={eventFormData.proposedLocation.streetName}
          onChange={handleInputChange}
        />
        <SubmitBtn type="submit">Submit</SubmitBtn>
        <CancelBtn onClick={onClose}>Cancel</CancelBtn>
      </Form>
    </>
  );
}

EventForm.propTypes = {
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
