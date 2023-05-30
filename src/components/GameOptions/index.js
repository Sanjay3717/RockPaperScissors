import {ImageSource, ListButtonElement, ListItem} from './styledComponents'

const GameOptions = props => {
  const {choices, userClicked} = props
  const {id, imageUrl} = choices

  const clickedByUser = () => {
    userClicked(id)
  }

  return (
    <ListItem>
      <ListButtonElement
        type="button"
        onClick={clickedByUser}
        data-testid={`${id.toLowerCase()}Button`}
      >
        <ImageSource src={imageUrl} alt={id} />
      </ListButtonElement>
    </ListItem>
  )
}
export default GameOptions
