import React from 'react';
import { shallow, mount } from 'enzyme';
import { ItemsList } from '../index';

const defaultProps = {
  items: [],
};

describe('ItemsList', () => {
  it('renders without crashing', () => {
    shallow(<ItemsList {...defaultProps} />);
  });

  it('should display warning message if no items', () => {
    const renderedItem = shallow(<ItemsList {...defaultProps} items={[]} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(1);
  });

  it('should not display warning message if items are present', () => {
    const items = [{ id: 1, content: 'Test 1' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(0);
  });

  it('should render items as list items', () => {
    const items = [{ id: 1, content: 'Test 1' }, { id: 2, content: 'Test 2' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.instance().filteredItems()).toHaveLength(2);
  });

  it('should show `completed` items if Complete btn is clicked', () => {
    const items = [{ id: 1, content: 'Test 1', completed: true, }, { id: 2, content: 'Test 2', completed: false, }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    renderedItem.find('.show-completed').simulate('click');
    expect(renderedItem.instance().filteredItems()).toHaveLength(1);
  });

  it('should add className `active` if Complete btn is clicked ', () => {
    const items = [{ id: 1, content: 'Test 1', completed: true }, { id: 2, content: 'Test 2', completed: false }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    renderedItem.find('.show-completed').simulate('click');
    expect(renderedItem.find('.show-completed').hasClass('active')).toBe(true);
  });
});
