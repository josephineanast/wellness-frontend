import EventPopup from "../components/EventPopup";
import { useState } from "react";
import PropTypes from "prop-types";

function VendorDashboard({ events, token }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  return (
    <>
      <h1>Vendor Dashboard</h1>

      <table>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>
                <button onClick={() => setSelectedEvent(event)}>View</button>
              </td>

              <td>{event.name}</td>
              <td>{event.vendor}</td>
              <td>{event.confirmedDate || "Proposed Dates"}</td>
              <td>{event.status}</td>
              <td>{event.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEvent && (
        <EventPopup
          event={selectedEvent}
          token={token}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}

VendorDashboard.propTypes = {
  events: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
};

export default VendorDashboard;
