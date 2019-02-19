import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addItem: "",
      todos: [
        { id: 0, label: "Do the groceries", done: false },
        { id: 1, label: "Take out the trash", done: false },
        { id: 2, label: "Play some Overwatch", done: false }
      ],
      nextId: 3
    };
  }

  handleAddItemChanged = event => {
    const next = event.target.value;

    this.setState(state => {
      return {
        ...state,
        addItem: next
      };
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    this.setState(state => ({
      ...state,
      addItem: "",
      nextId: state.nextId + 1,
      todos: [
        ...state.todos,
        { id: state.nextId, done: false, label: state.addItem }
      ]
    }));
  };

  handleDone = todoId => {
    this.setState(state => ({
      ...state,
      todos: state.todos.map(todo => {
        if (todo.id !== todoId) return todo;
        return {
          ...todo,
          done: !todo.done
        };
      })
    }));
  };

  render() {
    return (
      <div className="App container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>React todo</h1>
        </header>
        <form onSubmit={this.handleFormSubmit}>
          <div className="input-group input-group-lg">
            <input
              type="text"
              name="itemText"
              className="form-control"
              placeholder="Add an item"
              data-qa="add-item__input"
              value={this.state.addItem}
              onChange={this.handleAddItemChanged}
            />
            <div className="input-group-append">
              <button
                type="submit"
                className="btn btn-secondary"
                data-qa="add-item__btn"
              >
                Add
              </button>
            </div>
          </div>
        </form>

        <ul className="App-items">
          {this.state.todos.map((todo, i) => (
            <li
              key={todo.id}
              className={"todo-item" + (todo.done ? " done" : "")}
              data-qa={"todo-item__" + i}
            >
              <label className="todo-item-label">
                <input
                  type="checkbox"
                  checked={todo.done}
                  data-qa="item__done-chkbox"
                  onChange={() => this.handleDone(todo.id)}
                />
                <div className="text" data-qa="item__label">
                  {todo.label}
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
