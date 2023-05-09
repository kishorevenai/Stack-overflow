import React, { useEffect } from "react";
import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../../components/RightSidebar/RightSidebar";
import Avatar from "../../../components/Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import EditProfileForm from "../EditProfileForm/EditProfileForm";
import ProfileBio from "../ProfileBio/ProfileBio";
import "./UserProfiles.css";
import { authUsers, currentUser } from "../../../features/authSlice";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useState } from "react";

const UserProfiles = () => {
  const [Switch, SetSwitch] = useState(false);
  const { id } = useParams();
  const currentAuth = useSelector(currentUser);  
  const users = useSelector(authUsers);

  const currentProfile = users.find((user) => user._id === id);
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <section className="ABCD">
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="50px"
                borderRadius="10px"
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.name}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake}></FontAwesomeIcon>{" "}
                  Joined {moment(currentProfile?.joinedOn).fromNow()}{" "}
                </p>
              </div>
            </div>
            {currentAuth?.result._id === id && (
              <button
                type="button"
                onClick={() => SetSwitch(true)}
                className="edit-profile-btn"
              >
                <FontAwesomeIcon
                  icon={faPen}
                  style={{ marginRight: "10px" }}
                ></FontAwesomeIcon>
                Edit Profile
              </button>
            )}
          </div>
          <>
            {Switch & (currentAuth?.result._id === id) ? (
              <EditProfileForm
                currentProfile={currentProfile}
                setSwitch={SetSwitch}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
        </section>
      </div>
      <RightSidebar />
    </div>
  );
};

export default UserProfiles;
