import React, { Component } from 'react';

export default class SignIn extends Component {

    constructor(props) {
        super(props);

        this.onChangeId = this.onChangeId.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        //this.lessonId = this.onChangeLessonId.bind(this); //TODO remove hard coding if time
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            password: '',
            lessonId: '2905',
        }
    }

    onChangeId(e) {
        this.setState({
          id: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
          password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.connect(this.state.id, this.state.password, this.state.lessonId);
    }   


    render() {
        return (
            <div style = {{marginTop: "30px"}}>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>UserName: </label>
                        <input
                            type="text"
                            name = "id"
                            required
                            value={this.state.id}
                            onChange={this.onChangeId}/>
                    </div>
                    <br />
                    <div>
                        <label>Password:&nbsp;</label>
                        <input
                            type="password"
                            placeholder=""
                            required
                            value={this.state.password}
                            onChange={this.onChangePassword} />
                    </div>
                    <br/>
                    <label>{this.props.loginError}</label>
                    <br />
                    <center className="form-group">
                        <input type="submit" value="Connect to Lesson"/>
                    </center>
                </form>
            </div>
        )
    }
}
