import React from 'react';
import { connect } from 'react-redux';
import { removeItem, toggleItem } from '../../logic/todos';
import './styles.css';

export const ListItem = ({item,onRemove,onComplete}) => {
  return (
    <li>
      <label className={item.completed ? 'completed' : null}>
        <input type="checkbox" className="complete" checked={item.completed} onChange={() => onComplete(item.id)} />
        {item.content}
      </label>
      <button className="remove" onClick={() => onRemove(item.id)}>Remove</button>
    </li>
    );
};

const mapDispatchToProps = dispatch => ({
  onRemove: itemId => dispatch(removeItem(itemId)),
  onComplete: itemId => dispatch(toggleItem(itemId)),
});

export default connect(null, mapDispatchToProps)(ListItem);