import uniqid from 'uniqid'
import {Component} from "react";
import '../styles/Experience.css'

class Experience extends Component {
  constructor() {
    super();
    this.state = {
      addNew: false,
      job: {
        company: "",
        position: "",
        tasks: "",
        start: "",
        end: "",
        edit: false,
        id: uniqid()
      },
      jobs: []
    }
  }

  handleChange = (e) => {
    this.setState({
      job: {
        ...this.state.job,
        [e.target.name]: e.target.value,
      }
    })
  }

  displayNewForm = () => {
    this.setState({addNew: true})
  }

  saveNewJob = () => {
    this.setState({
      addNew: false,
      jobs: this.state.jobs.concat(this.state.job),
      job: {
        company: "",
        position: "",
        tasks: "",
        start: "",
        end: "",
        id: uniqid()
      }
    })
  }

  cancelNewJob = () => {
    this.setState({
      addNew: false,
      job: {
        ...this.state.job,
        company: "",
        position: "",
        tasks: "",
        start: "",
        end: "",
        id: uniqid()
      }
    })
  }

  deleteJob = (id) => {
    const jobs = [...this.state.jobs]
    const index = jobs.findIndex(job => job.id === id)
    jobs.splice(index, 1)
    this.setState({
      jobs: jobs
    })
  }

  editJob = (id) => {
    const jobs = [...this.state.jobs]
    const index = jobs.findIndex(job => job.id === id)
    jobs[index].edit = true
    this.setState({
      jobs: jobs
    })
  }
  
  saveJob = (id) => {
    const jobElement = document.getElementById(id)
    const company = jobElement.querySelector("input[name='company']").value
    const position = jobElement.querySelector("input[name='position']").value
    const tasks = jobElement.querySelector("input[name='tasks']").value
    const start = jobElement.querySelector("input[name='start']").value
    const end = jobElement.querySelector("input[name='end']").value
    const updatedjobs = this.state.jobs.map(job => {
      if(job.id === id){
        return(
          {
            ...job,
            company: company,
            position: position,
            tasks: tasks,
            start: start,
            end: end,
            edit: false
          }
        )
      }else {
        return job
      }
    })
    this.setState({
      jobs: updatedjobs
    })
  }

  render() {
    const {jobs} = this.state
    return (
      <div id="experience">
        <h2>Experience</h2>
        {jobs.map((job) => {
          return (
            <div key={job.id} id={job.id} className="job">
              <div className="job-info">
                <div className="input-field">
                  Company:
                  {job.edit ?
                    (<input name="company" defaultValue={job.company}></input>) :
                    (<p>{job.company}</p>)}
                </div>
                <div className="input-field">
                  Position:
                  {job.edit ?
                    (<input name="position" defaultValue={job.position}></input>) :
                    (<p>{job.position}</p>)}
                </div>
                <div className="input-field">
                  Tasks:
                  {job.edit ?
                    (<input name="tasks" defaultValue={job.tasks}></input>) :
                    (<p>{job.tasks}</p>)}
                </div>
                <div className="input-field">
                  From:
                  {job.edit ?
                    (<input name="start" defaultValue={job.start} type="date"></input>) :
                    (<p>{job.start}</p>)}
                </div>
                <div className="input-field">
                  To:
                  {job.edit ?
                    (<input name="end" defaultValue={job.end} type="date"></input>) :
                    (<p>{job.end}</p>)}
                </div>
              </div>
              {job.edit ?
                (<button onClick={() => {this.saveJob(job.id)}} className="save-button">Save</button>) :
                (<button onClick={() => {this.editJob(job.id)}} className="edit-button">Edit</button>)}
              <button onClick={() => {this.deleteJob(job.id)}} className="delete-button">X</button>
            </div>
          )
        })}
        {this.state.addNew ?
          (<div id="new-job" onChange={this.handleChange}>
            <div className="input-field">
              Company:
              <input name="company"></input>
            </div>
            <div className="input-field">
              Position:
              <input name="position"></input>
            </div>
            <div className="input-field">
              Tasks:
              <input name="tasks"></input>
            </div>
            <div className="input-field">
              From:
              <input name="start" type="date"></input>
            </div>
            <div className="input-field">
              To:
              <input name="end"  type="date"></input>
            </div>
            <div>
              <button onClick={this.cancelNewJob}>Cancel</button>
              <button onClick={this.saveNewJob}>Save</button>
            </div>
          </div>) :
          (<button onClick={this.displayNewForm}>+</button>)
        }
      </div>
    )
  }
}

export default Experience