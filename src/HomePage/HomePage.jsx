import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { linkActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getLinks(this.props.user.Id);
    }
    handleDeleteUser(id) {
        return (e) => this.props.deleteLink(id);
    }

    render() {
        const { user, users, links } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.FirstName}!</h1>
                <h3>All your youtube links By Category:</h3>
                {links.loading && <em>Loading Links...</em>}
                {links.error && <span className="text-danger">ERROR: {links.error}</span>}
                {links.items && 
                    <ul>
                            <li >
                                {links.categories.next().value}
                                <ul>
                                    {links.items.map((link, index) =>
                                        <li key={index}>
                                            <iframe width="280" height="155" src={link.src} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </li>
                                    )}
                                </ul>
                            </li>
                    </ul>
                }
                
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication, links } = state;
    const { user } = authentication;
    return { user, users, links };
}

const actionCreators = {
    getLinks: linkActions.getAllLinks,
    deleteLink: linkActions.deleteLink
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };