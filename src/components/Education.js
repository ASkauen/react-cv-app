import uniqid from 'uniqid'
import {Component} from "react";
import '../styles/Education.css'

class Education extends Component {
  constructor() {
    super();
    this.state = {
      addNew: false,
      study: {
        schoolName: "",
        studyTitle: "",
        studyDate: "",
        edit: false,
        id: uniqid()
      },
      studies: []
    }
  }

  handleChange = (e) => {
    this.setState({
      study: {
        ...this.state.study,
        [e.target.name]: e.target.value,
      }
    })
  }

  displayNewForm = () => {
    this.setState({addNew: true})
  }

  saveNewStudy = () => {
    this.setState({
      addNew: false,
      studies: this.state.studies.concat(this.state.study),
      study: {
        schoolName: "",
        studyTitle: "",
        studyDate: "",
        id: uniqid()
      }
    })
  }

  cancelNewStudy = () => {
    this.setState({
      addNew: false,
      study: {
        ...this.state.study,
        schoolName: "",
        studyTitle: "",
        studyDate: ""
      }
    })
  }

  deleteStudy = (id) => {
    const studies = [...this.state.studies]
    const index = studies.findIndex(study => study.id === id)
    studies.splice(index, 1)
    this.setState({
      studies: studies
    })
  }

  editStudy = (id) => {
    const studies = [...this.state.studies]
    const index = studies.findIndex(study => study.id === id)
    studies[index].edit = true
    this.setState({
      studies: studies
    })
  }

  saveStudy = (id) => {
    const studyElement = document.getElementById(id)
    const school = studyElement.querySelector("input[name='schoolName']").value
    const title = studyElement.querySelector("input[name='studyTitle']").value
    const date = studyElement.querySelector("input[name='studyDate']").value
    const updatedStudies = this.state.studies.map(study => {
      if(study.id === id){
        return(
          {
            ...study,
            schoolName: school,
            studyTitle: title,
            studyDate: date,
            edit: false
          }
        )
      }else {
        return study
      }
    })
    this.setState({
      studies: updatedStudies
    })
  }

  render() {
    const {studies} = this.state
    return (
      <div id="education">
        <h2>Education</h2>
        {studies.map((study) => {
          return (
            <div key={study.id} id={study.id} className="study">
              <div className="study-info">
                <div className="input-field">
                  School:
                  {study.edit ?
                    (<input name="schoolName" defaultValue={study.schoolName}></input>) :
                    (<p>{study.schoolName}</p>)
                  }
                </div>
                <div className="input-field">
                  Study title:
                  {study.edit ?
                    (<input name="studyTitle" defaultValue={study.studyTitle}></input>) :
                    (<p>{study.studyTitle}</p>)
                  }
                </div>
                <div className="input-field">
                  Study date:
                  {study.edit ?
                    (<input name="studyDate" defaultValue={study.studyDate} type="date"></input>) :
                    (<p>{study.studyDate}</p>)
                  }
                </div>
              </div>
              {study.edit ?
                (<button onClick={() => {this.saveStudy(study.id)}} className="save-button">Save</button>) :
                (<button onClick={() => {this.editStudy(study.id)}} className="edit-button">Edit</button>)}
              <button onClick={() => {this.deleteStudy(study.id)}} className="delete-button">X</button>
            </div>
            )
        })}
        {this.state.addNew ?
          (<div id="new-study" onChange={this.handleChange}>
            <div className="input-field">
              School:
              <input name="schoolName" id="school-name-input"></input>
            </div>
            <div className="input-field">
              Study title:
              <input name="studyTitle" id="study-title-input"></input>
            </div>
            <div className="input-field">
              Date:
              <input name="studyDate" id="study-date-input" type="date"></input>
            </div>
            <div>
              <button onClick={this.cancelNewStudy}>Cancel</button>
              <button onClick={this.saveNewStudy}>Save</button>
            </div>
          </div>) :
          (<button onClick={this.displayNewForm}>+</button>)
        }
      </div>
    )
  }
}

export default Education