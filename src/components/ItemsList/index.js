import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItem from '../ListItem';
import './styles.css';

export class ItemsList extends React.Component {
  state = { filter: 'all' };
  filteredItems() {
    const {filter} = this.state;
    let filteredItems = this.props.items.filter((item) => {
      if(filter === 'all') {
        return true;
      } else if (filter === 'completed') {
        return item.completed;
      } else if (filter === 'active') {
        return !item.completed;
      }
      return true;
    });
    return filteredItems;
  }
  onFilter(filter) {
    this.setState({filter});
  }
  render() {
    const {filter} = this.state;
    const filteredItems = this.filteredItems();
    return (
    <div>
      <ul className="itemsList-ul">
        {filteredItems.length < 1 && <p id="items-missing">Add some tasks above.</p>}
        {filteredItems.map(item => (
          <ListItem class="li" key={item.id} item={item} />
        ))}
      </ul>
      <div>
        <button className={filter === 'all' ? 'active show-all' : 'show-all'} onClick={() => this.onFilter('all')}>All</button>
        <button className={filter === 'completed' ? 'active show-completed' : 'show-completed'} onClick={() => this.onFilter('completed')}>Completed</button>
        <button className={filter === 'active' ? 'active show-active' : 'show-active'} onClick={() => this.onFilter('active')}>Active</button>
      </div>
    </div>
  )};
};

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return { items: state.todos.items };
};

export default connect(mapStateToProps)(ItemsList);
