import React from 'react';
import { shallow, mount } from 'enzyme';
import { ListItem } from '../index';

const defaultProps = {
  item: {id: 1, content: "test", completed: false},
  onRemove: () => {},
  onComplete: () => {},
};

describe('ListItem', () => {
  it('renders without crashing', () => {
    shallow(<ListItem {...defaultProps} />);
  });

  it('should call onRemove when Remove btn clicked', () => {
    const onRemoveMock = jest.fn();
    const renderedItem = shallow(<ListItem {...defaultProps} onRemove={onRemoveMock} />);
    renderedItem.find('.remove').simulate('click');
    expect(onRemoveMock).toHaveBeenCalled();
    expect(onRemoveMock).toHaveBeenCalledWith(1);
  });

  it('should call onComplete when checkbox is clicked', () => {
    const onCompleteMock = jest.fn();
    const renderedItem = shallow(<ListItem {...defaultProps} onComplete={onCompleteMock} />);
    renderedItem.find('.complete').simulate('change');
    expect(onCompleteMock).toHaveBeenCalled();
    expect(onCompleteMock).toHaveBeenCalledWith(1);
  });

  it('should add class `completed` when item is completed', () => {
    const item = {id: 1, content: "test", completed: true};
    const renderedItem = shallow(<ListItem {...defaultProps} item={item} />);
    expect(renderedItem.find('label').hasClass('completed')).toBe(true);
  });
});
