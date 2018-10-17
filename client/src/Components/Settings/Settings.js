import React from 'react';

const InputField = (props) =>  {
    const {onChange, label, name, type, value} = props;
    console.log("here");
    return (
            <>
            <label>
                {label}
                <input type={type} 
                       name={name}
                       value={value} 
                       onChange={(e) => onChange(name, type === 'checkbox' ? e.target.checked : e.target.value)} />
            </label>
            </>
        
    );
}

class Settings extends React.Component {
    state = {};

    handleChange = (name, value) => {
        this.setState({[name]: value,
                       [`${name}Error`]: false})
    }

    validateForm() {
        if(!this.state['email'] || this.state['email'].length === 0) {
            this.setState({['emailError']: true});
        }

    }

    render() {
        return (
        <form>
            <InputField onChange={this.handleChange} label='Email:' name='email' type='text' value={this.state['email']}/>
            <br/>
            <InputField onChange={this.handleChange} label='Automate Scratch off:' name='scratchOff' type='checkbox' value={this.state['scratchOff']}/>
            <br/>
            <InputField onChange={this.handleChange} label='Old password:' name='oldPassword' type='text' value={this.state['oldPassword']}/>
            <br/>
            <InputField onChange={this.handleChange} label='New password:' name='newPassword' type='text' value={this.state['newPassword']}/>
            <br/>
            <button>Save</button>
        </form>
        )
    }
}




export default Settings;