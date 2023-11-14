import { useState } from "react";
import PropTypes from "prop-types";
import EventPopup from "../components/EventPopup";

export default function CompanyAdminDashboard({ events, token }) {
  CompanyAdminDashboard.propTypes = {
    events: PropTypes.array.isRequired,
    token: PropTypes.string.isRequired,
  };
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div>
      <h2>Company HR Admin Dashboard</h2>
      <table>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.vendor}</td>
              <td>{event.confirmedDate || "Proposed Dates"}</td>
              <td>{event.status}</td>
              <td>{event.created_at}</td>
              <td>
                <button onClick={() => handleViewEvent(event)}>View</button>
              </td>
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
    </div>
  );
}
