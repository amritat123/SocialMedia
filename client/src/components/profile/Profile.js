import React, { Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
const Profile = ({
    getProfileById,
    profile: { profile ,loading},
    auth,
    match
})=> {
    useEffect(() => {
        getProfileById( match.parmas.id);
    },[getProfileById]);

    return (
        <Fragment>
            {profile === null || loading? <Spinner /> : <Fragment>
                <Link to="/profiles" className="btn btn-light">
                    Back To Profiles
                </Link>
                {auth.isAuthenticated && auth.loading === false && auth.user._id ===
                profile.user._id && ( <Link to="/edit-profile" className="btn btn-dark">
                    Edit Profile
                </Link>)}
                </Fragment>}
        </Fragment>
    );
};
Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
}

const mayStateToProps = state => ({
    profile:state.profile,
    auth:state.auth
})
export default connect(mayStateToProps, { getProfileById })(Profile);