// FINAL_START
import React from 'react'
import renderer from 'react-test-renderer'
import getStoreStub from '../store/Customers.stub'
import CustomerList from './CustomerList'
// FINAL_END
// WORKSHOP_START
// you're going to need to import a few things here:
// react, react-test-renderer, ../store/Customers.stub,
// and the ./CustomerList component (which we're testing)
// WORKSHOP_END

test('should render no customers', () => {
  // FINAL_START
  snapshotCustomerList()
  // FINAL_END
  // WORKSHOP_START
  // create a snapshotCustomerList function and test the default
  //   behavior by calling it without arguments
  // Then use the resulting component to check the snapshot
  // WORKSHOP_END
})

test('should render customers', () => {
  // FINAL_START
  const {store} = getStoreStub([{name: 'Bob'}, {name: 'Joanna'}])
  snapshotCustomerList({store})
  // FINAL_END
  // WORKSHOP_START
  // get a store from the stub and initialize it with two customers
  // we need to have the <CustomerList /> component use our stub instead of the singleton store somehow...
  //   We _could_ use Jest's mocking capabilities. Or, we could just alter the CustomerList component to allow you
  //   to specify a store! So go to the CustomerList.js file and add a prop called `store`. Wherever the singleton
  //   `store` is used, use `this.props.store` instead and use defaultProps to have the `store` default to the singleton
  //   `store` (that way actual users of the component don't have to specify the store).
  // Now use the snapshotCustomerList function you wrote to pass the store as a prop
  // WORKSHOP_END
})

test('should respond to store updates', () => {
  // FINAL_START
  const {store, updateCustomers} = getStoreStub()
  const component = renderCustomerList({store})
  expect(component).toMatchSnapshot()
  updateCustomers([{name: 'Jill'}, {name: 'Fred'}])
  expect(component).toMatchSnapshot()
  // FINAL_END
  // WORKSHOP_START
  // get both the store and the updateCustomers from a call to `../store/Customers.stub`
  // render the customer list with the store stub
  // take a snapshot
  // call updateCustomers with a few customers
  // take another snapshot
  // WORKSHOP_END
})

// FINAL_START
/**
 * Render the <CustomerList /> and snapshot it
 * @param {Object} props - the props to render with
 */
function snapshotCustomerList(props = {}) {
  const component = renderCustomerList(props)
  expect(component).toMatchSnapshot()
}

/**
 * Renders <CustomerList /> with the given props
 * @param {Object} props - the props to render with
 * @return {Object} the rendered component
 */
function renderCustomerList({store = getStoreStub().store}) {
  return renderer.create(<CustomerList store={store} />)
}
// FINAL_END
// WORKSHOP_START
// Create a snapshotCustomerList function that:
// 1. Accepts props
// 2. Creates a component with those props with a call to renderer.create (tip: you may wanna do this in a separate function)
// 3. Asserts on a snapshot of that component with expect(component).toMatchSnapshot()
// WORKSHOP_END
