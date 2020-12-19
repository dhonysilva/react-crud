import React, { Component } from 'react';
import db from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            title: '',
            description: '',
            author: '',
            created_at: '',
            updated_at: '',
        };
    }

    componentDidMount() {
        const ref = db.collection('boards').doc(this.props.match.params.id);
        
        const date = new Date();
        
        ref.get().then((doc) => {
            if (doc.exists) {
                const board = doc.data();
                this.setState({
                    key: doc.id,
                    title: board.title,
                    description: board.description,
                    author: board.author,
                    created_at: board.created_at,
                    updated_at: date.toUTCString(),
                });
            } else {
                console.log("no such document.");
            }
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({board:state});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { title, description, author, created_at, updated_at } = this.state;

        const date = new Date();

        const updateRef = db.collection('boards').doc(this.state.key);
        updateRef.set({
            title,
            description,
            author,
            created_at,
            updated_at: date.toUTCString(),
        }).then((docRef) => {
            this.setState({
                key: '',
                title: '',
                description: '',
                author: '',
                created_at: '',
                updated_at: date.toUTCString(),
            });
            this.props.history.push("/show/"+this.props.match.params.id)
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">
                    EDIT BOARD
                    </h3>
                </div>
                <div class="panel-body">
                    <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Board List</Link></h4>
                    <form onSubmit={this.onSubmit}>
                    <div class="form-group">
                        <label for="title">Title:</label>
                        <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
                    </div>

                   

                    <div class="form-group">
                        <label for="description">Description:</label>
                        <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" rows="5" />
                    </div>
                    <div class="form-group">
                        <label for="author">Author:</label>
                        <input type="text" class="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author" />
                    </div>
                    <button type="submit" class="btn btn-success">Submit</button>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}

export default Edit;