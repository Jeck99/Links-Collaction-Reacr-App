import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                FirstName: '',
                LastName: '',
                Email: '',
                Password: '',
                ConfirmPassword: '',
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        if (this.isUserValid(user)) {
            this.props.register(user);

        };
    }

    isUserValid(user) {
        if (user.FirstName && user.LastName && user.Email && user.Password) {
            return true;
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.FirstName ? ' has-error' : '')}>
                        <label htmlFor="FirstName">First Name</label>
                        <input type="text" className="form-control" name="FirstName" value={user.FirstName} onChange={this.handleChange} />
                        {submitted && !user.FirstName &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.LastName ? ' has-error' : '')}>
                        <label htmlFor="LastName">Last Name</label>
                        <input type="text" className="form-control" name="LastName" value={user.LastName} onChange={this.handleChange} />
                        {submitted && !user.LastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.Email ? ' has-error' : '')}>
                        <label htmlFor="Email">Email</label>
                        <input type="email" className="form-control" name="Email" value={user.Email} onChange={this.handleChange} />
                        {submitted && !user.Email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.Password ? ' has-error' : '')}>
                        <label htmlFor="Password">Password</label>
                        <input type="password" className="form-control" name="Password" value={user.Password} onChange={this.handleChange} />
                        {submitted && !user.Password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.ConfirmPassword ? ' has-error' : '')}>
                        <label htmlFor="Password">Confiermd Password</label>
                        <input type="password" className="form-control" name="ConfirmPassword" value={user.ConfirmPassword} onChange={this.handleChange} />
                        {submitted && !user.Password &&
                            <div className="help-block">Confirming Password is required</div>
                        }
                        {submitted && (!user.Password != user.ConfirmPassword) &&
                            <div className="help-block">Confirming Password is Worng, Please Try Agin</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };