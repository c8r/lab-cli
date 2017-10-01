import styled from 'styled-components'
import { space, fontSize, width, color } from 'styled-system'

const Heading = styled('h2')(
  [],
  props => ({
    fontWeight: 'bold',
    lineHeight: 1.25
  }),
  space,
  fontSize,
  width,
  color
)

Heading.defaultProps = {
  fontSize: 5,
  m: 0,
  color: 'blue'
}

export default Heading
