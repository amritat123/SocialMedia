import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import { getProfileById } from "../../actions/profile";
const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.parmas.id);
  }, [getProfileById, match.parmas.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div class="profile-gried my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
            <h2 class="text-primary">Experience</h2>
            {profile.experience.length > 0 ? (<Fragment>
              {profile.experience.map(experience => (
                <ProfileExperience 
                key={experience._id} 
                experience={experience} />
              ))}
            </Fragment>) : (<h4>No experience creadentails</h4>)}
            </div>

            <div className="profile-edu bg-white p-2">
            <h2 class="text-primary">Education</h2>
            {profile.education.length > 0 ? (<Fragment>
              {profile.education.map(education => (
                <ProfileEducation 
                key={education._id} 
                education={education} />
              ))}
            </Fragment>) : (<h4>No education creadentails</h4>)}
          </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mayStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mayStateToProps, { getProfileById })(Profile);
