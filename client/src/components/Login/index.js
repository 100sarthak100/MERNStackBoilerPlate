import React, { Component } from 'react'

export class index extends Component {
    state = {
        email: "",
        password: "",
        errors: ['1', '2']
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    displayErrors = errors => {
        errors.map((error, i) => <p key={i} >{error}</p>)
    }

    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = {
            email: this.state.email,
            password: this.state.password
        };

        if (this.isFormValid(this.state)) {
            this.setState({
                errors: []
            })
        }
    }

    isFormValid = ({ email, password }) => {
        return email && password;
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h2>Login</h2>
                    <div className="row">
                        <form className="col s12" onSubmit={event => this.submitForm(event)}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input name="email"
                                        value={this.state.email}
                                        onChange={e => this.handleChange(e)}
                                        id="email"
                                        type="email"
                                        className="validate" />
                                    <label htmlFor="email">Email</label>
                                    <span className="helper-text"
                                        data-error="Type correct type of email"
                                        data-success="right"
                                    />
                                </div>

                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <input name="password"
                                        value={this.state.password}
                                        onChange={e => this.handleChange(e)}
                                        id="password"
                                        type="password"
                                        className="validate" />
                                    <label htmlFor="password">Password</label>
                                    <span className="helper-text"
                                        data-error="Wrong"
                                        data-success="right"
                                    />
                                </div>
                            </div>

                            {this.state.errors.length > 0 && (
                                <div>
                                    {this.displayErrors(this.state.errors)}
                                </div>
                            )}

                            <div className="row">
                                <div className="col s12">
                                    <button className="btn waves-effect green lighten-2"
                                        type="submit"
                                        name="action"
                                        onClick={e => this.submitForm(e)}>
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default index

