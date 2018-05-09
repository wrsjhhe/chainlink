import { shallow } from 'enzyme'
import React from 'react'

import App from '../pages/index.js'

describe('With Enzyme', () => {
  it('App shows welcome message', () => {
    const app = shallow(<App />)

    expect(app.find('div').text()).toEqual('Welcome to the Chainlink GUI!!!')
  })
})
