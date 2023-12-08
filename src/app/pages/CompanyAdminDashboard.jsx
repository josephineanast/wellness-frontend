import { useState } from "react";
import PropTypes from "prop-types";
import EventPopup from "../components/EventPopup";
import { createEventAction } from "../features/eventSlice";
import { useDispatch } from "react-redux";
import EventForm from "../components/EventForm";
import styled from "styled-components";

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
  background: blue;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: darkblue;
  }
`;

const ModalContainer = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const CreateEventBtn = styled.button`
  background: blue;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;
  margin-bottom: 18px;

  &:hover {
    background: darkblue;
  }
`;

export default function CompanyAdminDashboard({ events, token, userId }) {
  CompanyAdminDashboard.propTypes = {
    events: PropTypes.array,
    token: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  };

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleCreateEvent = async (eventData, token, event) => {
    event.preventDefault();
    try {
      dispatch(createEventAction(eventData, token));
      setIsCreateEventModalOpen(false);
    } catch (error) {
      throw new Error(
        `Failed to create new event: ${error.response.data.message}`
      );
    }
  };

  const openCreateEventModal = () => {
    setIsCreateEventModalOpen(true);
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
  };

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
      <Header>Company Admin Dashboard</Header>
      <CreateEventBtn onClick={openCreateEventModal}>
        Create Event
      </CreateEventBtn>
      <ModalContainer isOpen={isCreateEventModalOpen}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {isCreateEventModalOpen && (
            <EventForm
              token={token}
              userId={userId}
              onClose={() => setIsCreateEventModalOpen(null)}
              onSubmit={handleCreateEvent}
            />
          )}
        </ModalContent>
      </ModalContainer>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Vendor</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Created At</TableHeadCell>
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
                <Button onClick={() => handleViewEvent(event)}>View</Button>
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
