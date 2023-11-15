import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { approveEvent, rejectEvent } from "../api/event";
import { fetchEvents } from "../features/eventSlice";

import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  z-index: 100;
  width: 500px;
  max-width: 90%;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
`;

const ModalContent = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TextArea = styled.textarea`
  width: 250px;
  margin-top: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  margin-left: 10px;
  margin-bottom: 14px;

  &.primary {
    background: #007bff;
    color: white;
  }

  &.danger {
    background: #dc3545;
    color: white;
  }

  &.confirm {
    background: #48bb78;
    color: white;
    margin-left: 0;
    width: 250px;
  }
`;

export default function EventPopup({
  event,
  onClose,
  token,
  formatDate,
  formatProposedDates,
}) {
  const [selectedDate, setSelectedDate] = useState(null);

  const [rejectionReason, setRejectionReason] = useState("");

  const currentUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleApprove = async () => {
    if (!selectedDate) {
      alert("Please select a date first");
      return;
    }

    try {
      await approveEvent(event._id, selectedDate, token);
      dispatch(fetchEvents(token));
      onClose();
    } catch (error) {
      console.error("Error approving event:", error);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason) {
      alert("Please enter a rejection reason");
      return;
    }

    try {
      await rejectEvent(event._id, rejectionReason, token);
      dispatch(fetchEvents(token));
      onClose();
    } catch (error) {
      console.error("Error rejecting event:", error);
    }
  };

  if (currentUser.role === "company") {
    return (
      <Modal>
        <ModalTitle>{event.name}</ModalTitle>

        <ModalContent>
          <p>Name: {event.name}</p>
          <p>Vendor: {event.vendorName}</p>
          <p>
            Dates:{" "}
            {event.confirmedDate
              ? formatDate(event.confirmedDate)
              : formatProposedDates(event.proposedDates)}
          </p>
          <p>Status: {event.status} </p>
          <p>Created at: {formatDate(event.created_at)}</p>
        </ModalContent>

        <ModalActions>
          <Button className="danger" onClick={onClose}>
            Close
          </Button>
        </ModalActions>
      </Modal>
    );
  }

  if (currentUser.role === "vendor") {
    return (
      <Modal>
        <ModalTitle>{event.name}</ModalTitle>

        <ModalContent>
          <p>Choose from 3 proposed dates to approve:</p>
          {event.proposedDates.map((date) => (
            <Button
              className="confirm"
              key={date}
              onClick={() => setSelectedDate(date)}
            >
              Confirm {formatDate(date)}
            </Button>
          ))}
          <TextArea
            placeholder="Reason for rejection"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          ></TextArea>
        </ModalContent>

        <ModalActions>
          <Button className="danger" onClick={onClose}>
            Close
          </Button>
          <Button className="primary" onClick={handleApprove}>
            Approve
          </Button>
          <Button className="danger" onClick={handleReject}>
            Reject
          </Button>
        </ModalActions>
      </Modal>
    );
  }
}

EventPopup.propTypes = {
  event: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  formatDate: PropTypes.func.isRequired,
  formatProposedDates: PropTypes.func.isRequired,
};
