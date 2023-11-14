import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { approveEvent, rejectEvent } from "../api/event";
import { fetchEvents } from "../features/eventSlice";

export default function EventPopup({ event, onClose, token }) {
  console.log(event);
  const currentUser = useSelector((state) => state.auth.user);
  const [selectedDate, setSelectedDate] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const dispatch = useDispatch();

  const handleApprove = async () => {
    try {
      if (!selectedDate) {
        alert("Please select a date first");
        return;
      }
      await approveEvent(event._id, selectedDate, token);
      dispatch(fetchEvents(token));
      onClose();
    } catch (error) {
      console.error("Error approving event:", error);
    }
  };

  const handleReject = async () => {
    try {
      if (!rejectionReason) {
        alert("Please enter a rejection reason");
        return;
      }
      await rejectEvent(event._id, rejectionReason, token);
      dispatch(fetchEvents(token));
      onClose();
    } catch (error) {
      console.error("Error rejecting event:", error);
    }
  };

  if (currentUser.role === "company") {
    return (
      <div className="popup">
        <h2>{event.name}</h2>
        <p>Vendor: {event.vendorName}</p>
        <p>Dates: {event.proposedDates.join(", ")}</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  if (currentUser.role === "vendor") {
    return (
      <div className="popup">
        <h2>{event.name}</h2>

        <div>
          {event.proposedDates.map((date) => (
            <button key={date} onClick={() => setSelectedDate(date)}>
              Confirm {date}
            </button>
          ))}
        </div>

        <button onClick={handleApprove}>Approve Event</button>

        <textarea
          placeholder="Reason for rejection"
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
        />

        <button onClick={handleReject}>Reject</button>

        <button onClick={onClose}>Close</button>
      </div>
    );
  }
}

EventPopup.propTypes = {
  event: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  token: PropTypes.array.isRequired,
};
