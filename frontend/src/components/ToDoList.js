import React from 'react';

import Loading from './common/Loading'

class ToDoList extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            tasks: [{id: 1, text: 'asss'}],
            newTask: "",
        };
        this.fetchTasks = this.fetchTasks.bind(this);
        this.onChecked = this.onChecked.bind(this);
        this.handleNewTaskChange = this.handleNewTaskChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('/api').then(response => {
            if (response.ok) return response.json();
            Promise.reject();
        }).then((json) => this.setState({tasks: json, loading: false}))
    }

    onChecked(event, task) {
        console.log(task);
        let id = task.id;
        task.is_complete = !task.is_complete;
        fetch(`/api/${id}/`, {
            'method': 'patch', headers: {
                "Content-Type": "application/json"
            }, 'body': JSON.stringify(task)
        }).then(response => {
            console.log(response);
            if (response.ok) return response.json();
            Promise.reject();
        }).then((json) => {
            let index = this.state.tasks.findIndex(x => x.id === id);
            let tasks = this.state.tasks;
            tasks[index] = json;
            this.setState({tasks: tasks})
        })
    }

    onDelete(task) {
        let id = task.id;
        task.is_complete = !task.is_complete;
        fetch(`/api/${id}/`, {
            'method': 'delete'
        }).then(response => {
            if (response.ok) return response;
            Promise.reject();
        }).then((response) => {
            let index = this.state.tasks.findIndex(x => x.id === id);
            let tasks = this.state.tasks;
            delete tasks[index];
            this.setState({tasks: tasks})
        })
    }

    handleSubmit(event){
        event.preventDefault();
        let task = {text: this.state.newTask};
        fetch(`/api/`, {
            'method': 'post', headers: {
                "Content-Type": "application/json"
            }, 'body': JSON.stringify(task)
        }).then(response => {
            console.log(response);
            if (response.ok) return response.json();
            Promise.reject();
        }).then((json)=>{
            let tasks = this.state.tasks;
            tasks.push(json);
                this.setState({tasks: tasks, newTask: ""});
            }
        )
    }
    handleNewTaskChange(event){
        this.setState({newTask: event.target.value})
    }
    render() {
        if (this.state.loading) {
            return <Loading/>
        }
        return (
            <div className="container col-md-6">
                <ul className="list-group">
                    {this.state.tasks.map((task) => <li key={task.id}
                                                        className={"list-group-item" + (task.is_complete ? ' text-strike' : "")}>
                            <input
                                onChange={(event) => this.onChecked(event, task)} type="checkbox"
                                checked={task.is_complete}/> {task.text}
                            <button className="btn btn-danger btn-sm float-right"
                                    onClick={() => this.onDelete(task)}>Delete
                            </button>
                        </li>
                    )}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div className="row">
                        <div className="col-md-10">
                            <input type="text" id="newTask" className="form-control" value={this.state.newTask} onChange={this.handleNewTaskChange}/>
                        </div>
                        <div className="col-md-2">
                        <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                        </div>
                        </div>
                </form>
            </div>
        )
    }
}

export default ToDoList;