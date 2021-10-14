import React from 'react';
import './style.scss';

class ClearCompleted extends React.Component {
  render() {
    return (
      <div className="clearCompleted">
        <span className="clearCompleted__button" onClick={this.props.onClearCompletedTodo}>
          Clear completed
        </span>
      </div>
    );
  }
}

export default ClearCompleted;
