import EventPopup from "../components/EventPopup";
import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { SideDashboardComponent } from "../components/SideDashboard";

const Dashboard = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: #eee;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;

  &:nth-child(even) {
    background: #f5f5f5;
  }
`;

const TableCell = styled.td`
  padding: 10px;
`;

const TableHeadCell = styled(TableCell)`
  font-weight: bold;
`;

const Button = styled.button`
  background: #7e30e1;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #49108b;
  }
`;

function VendorDashboard({ events, token, name }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const formattedDateTime =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();

    return formattedDateTime;
  }

  function formatProposedDates(dates) {
    const formattedDateTime = dates
      .map((date) => {
        const d = new Date(date);
        return (
          d.getFullYear() +
          "-" +
          (d.getMonth() + 1) +
          "-" +
          d.getDate() +
          " " +
          d.getHours() +
          ":" +
          d.getMinutes()
        );
      })
      .join(", ");
    return formattedDateTime;
  }

  return (
    <Dashboard>
      <SideDashboardComponent name={name} />
      <Header>Vendor Dashboard</Header>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Vendor</TableHeadCell>
            <TableHeadCell> Date</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Created</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableRow>
        </TableHead>

        <tbody>
          {events?.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.vendorName}</TableCell>
              <TableCell>
                {event.confirmedDate
                  ? formatDate(event.confirmedDate)
                  : formatProposedDates(event.proposedDates)}
              </TableCell>
              <TableCell>{event.status}</TableCell>
              <TableCell>{formatDate(event.created_at)}</TableCell>
              <TableCell>
                <Button onClick={() => setSelectedEvent(event)}>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {selectedEvent && (
        <EventPopup
          event={selectedEvent}
          token={token}
          onClose={() => setSelectedEvent(null)}
          formatDate={formatDate}
          formatProposedDates={formatProposedDates}
        />
      )}
    </Dashboard>
  );
}

VendorDashboard.propTypes = {
  events: PropTypes.array,
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default VendorDashboard;
