import React, { Fragment , useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
// import DoISuportIt from 'components/DoISuportIt';


const Posts = ({ getPosts, post: { posts,loading } }) => {
    useEffect(() => {
        getPosts();
    //Dependcey
    },[getPosts]);
    return <div />
};

Posts.propType = {
    getPosts : PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post : state.post
});

export default connect(mapStateToProps, { getPosts})(Posts);