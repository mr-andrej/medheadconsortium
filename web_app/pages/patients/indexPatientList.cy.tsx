import React from 'react'
import PatientList from './index'

describe('<PatientList />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<PatientList/>)
    })
})