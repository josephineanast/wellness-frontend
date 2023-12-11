import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../api/auth";
import PropTypes from "prop-types";
import {
  logoutStart,
  logoutFailure,
  logoutSuccess,
} from "../features/authslice";
import styled from "styled-components";

const SideDashboard = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #ccc;
  border-radius: 50%;
  margin-right: 10px;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 10;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
`;

const LogoutOption = styled.span`
  color: #49108b;
  text-decoration: none;
  cursor: pointer;
`;

export const SideDashboardComponent = ({ name }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = async () => {
    dispatch(logoutStart());
    try {
      await logoutUser();
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFailure(error.message));
    }
  };

  return (
    <SideDashboard onClick={() => setShowLogout(!showLogout)}>
      <UserIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="14"
          viewBox="0 0 448 512"
        >
          <path
            fill="#7e30e1"
            d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
          />
        </svg>
      </UserIcon>
      {user && (
        <>
          <span>Hello, {name}</span>
          {showLogout && (
            <Dropdown>
              <LogoutOption onClick={handleLogout}>Logout</LogoutOption>
            </Dropdown>
          )}
        </>
      )}
    </SideDashboard>
  );
};

SideDashboardComponent.propTypes = {
  name: PropTypes.string.isRequired,
};
