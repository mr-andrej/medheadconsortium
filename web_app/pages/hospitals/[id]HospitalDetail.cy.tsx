import React from 'react'
import HospitalDetail from './[id]'

describe('<HospitalDetail />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<HospitalDetail/>)
    })
})