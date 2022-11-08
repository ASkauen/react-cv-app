import {Component} from "react";
import '../styles/Information.css'

class Information extends Component {
  constructor() {
    super();
    this.state = {
      name: "name",
      email: "email",
      phone: "phone",
      edit: false
    }
  }

  enableEdit = () => {
    this.setState({edit: true})
  }

  saveEdit = () => {
    const name = document.getElementById("name-input").value
    const email = document.getElementById("email-input").value
    const phone = document.getElementById("phone-input").value
    console.log(this)
    this.setState({
      edit: false,
      name: name,
      email: email,
      phone: phone
    })
  }

  render() {
    const {name, email, phone, edit} = this.state
    return (
      <div id="information">
        <h2>Information</h2>
        <div className="input-field">
          Name:
          {edit ?
            (<input defaultValue={name} id="name-input"></input>) :
            (<p>{name}</p>)
          }
        </div>
        <div className="input-field">
          Email:
          {edit ?
            (<input defaultValue={email} id="email-input"></input>) :

            (<p>{email}</p>)
          }
        </div>
        <div className="input-field">
          Phone:
          {edit ?
            (<input defaultValue={phone} id="phone-input"></input>) :
            (<p>{phone}</p>)}
        </div>
        {edit ?
          (<button className="edit-button" onClick={this.saveEdit}>Save</button>) :
          (<button className="edit-button" onClick={this.enableEdit}>Edit</button>)}
      </div>
    )
  }
}

export default Information