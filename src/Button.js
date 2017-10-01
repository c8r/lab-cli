import styled from 'styled-components'
import { space, fontSize, width, color } from 'styled-system'

const Button = styled('button')(
  [],
  props => ({
    display: 'inline-block',
    fontFamily: 'inherit',
    borderWidth: 0,
    borderRadius: '4px',
    appearance: 'none'
  }),
  space,
  fontSize,
  width,
  color
)

Button.defaultProps = {
  fontSize: 1,
  px: 4,
  py: 2,
  color: 'white',
  bg: 'blue'
}

export default Button
