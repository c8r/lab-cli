import styled from 'styled-components'
import { space, fontSize, width, color } from 'styled-system'

const Box = styled('div')([], props => ({}), space, fontSize, width, color)

Box.defaultProps = {}

export default Box
