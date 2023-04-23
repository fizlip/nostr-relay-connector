import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Events from '../common/components/elements/Events/Events'

describe('Event', () => {
  it('renders events', () => {
    render(<Events />)

    const heading = screen.getByRole('heading', {
      name: /Events/i
    })

    expect(heading).toBeInTheDocument()
  })
})