// Based on: https://github.com/tastejs/todomvc/blob/gh-pages/examples/react/js/todoItem.jsx

import React, { Component } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import { TextField } from "@appbaseio/reactivesearch";

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

import "./todomvc.scss";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: "",
      editing: false,
    };
  }

  handleBlur(event) {
    this.setState({
      editText: this.props.todo.title,
      editing: false
    });
  }

  handleSubmit(event) {
    let val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({
        editText: val,
        editing: false
      });
    } else {
      this.props.onDestroy();
    }
  }

  handleEdit() {
    this.setState({
      editText: this.props.todo.title,
      editing: true
    });
  }

  handleKeyDown(event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({
        editText: this.props.todo.title,
        editing: false
      });
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  }

  handleChange(value) {
    if (this.state.editing) {
      this.setState({ editText: value });
    }
  }

  getInitialState() {
    return { editText: this.props.todo.title };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.editing && this.state.editing) {

      let { editField } = this;
      editField.focus();
      editField.setSelectionRange(editField.value.length, editField.value.length);
    }
  }

  render() {
    return (
      <li
        className={classNames({
          completed: this.props.todo.completed,
          editing: this.state.editing
        })}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.props.onToggle}
          />
          <label onDoubleClick={this.handleEdit.bind(this)}>
            {this.props.todo.title}
          </label>
          <button className="destroy" onClick={this.props.onDestroy} />
        </div>
        <TextField
          innerRef={(input) => { this.editField = input; }}
          autoFocus={true}
          componentId="EditSensor"
          dataField="title"
          innerClass={{
            input: 'edit-todo'
          }}
          className="edit-todo-container"
          defaultSelected={this.state.editText}
          onBlur={this.handleBlur.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          onValueChange={this.handleChange.bind(this)}
        />
      </li>
    );
  }
}

export default TodoItem;
