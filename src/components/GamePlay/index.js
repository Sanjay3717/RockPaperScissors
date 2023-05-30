import Popup from 'reactjs-popup'
import {Component} from 'react'
import {RiCloseLine} from 'react-icons/ri'
import GameOptions from '../GameOptions'
import {
  OrderedList,
  ResponsiveContainer,
  RulesButton,
  TopDisplayContainer,
  ScoreDisplayContainer,
  Score,
  OrderedTop,
  ResultViewerContainer,
  ResultYouGameImage,
  ResultYouGameText,
  Result,
  PlayAgainButton,
} from './styledComponents'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  win: 'WIN',
  lost: 'LOST',
  draw: 'DRAW',
}

class GamePlay extends Component {
  state = {
    userChoice: '',
    gameChoice: '',
    score: 0,
    gameStatus: apiStatusConstants.inProgress,
  }

  userClickedOption = option => {
    this.setState(
      {userChoice: option, gameChoice: this.gameSelectedOption()},
      this.getScore,
    )
  }

  gameSelectedOption = () => {
    const {choicesList} = this.props
    const gamesListIndex = choicesList.map(item => item.id)
    const randomSelection = Math.floor(Math.random() * 3)
    return gamesListIndex[randomSelection]
  }

  onClickToGoGameView = () => {
    this.setState({gameStatus: apiStatusConstants.inProgress})
  }

  getScore = () => {
    const {userChoice, gameChoice} = this.state
    if (userChoice === gameChoice) {
      this.setState({gameStatus: apiStatusConstants.draw})
    } else if (userChoice === 'ROCK') {
      if (gameChoice === 'SCISSORS') {
        this.setState(prevState => ({
          gameStatus: apiStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: apiStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    } else if (userChoice === 'PAPER') {
      if (gameChoice === 'ROCK') {
        this.setState(prevState => ({
          gameStatus: apiStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: apiStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    } else if (userChoice === 'SCISSORS') {
      if (gameChoice === 'PAPER') {
        this.setState(prevState => ({
          gameStatus: apiStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: apiStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    }
  }

  renderInProgressView = () => {
    const {choicesList} = this.props
    return (
      <>
        <OrderedList>
          {choicesList.map(eachItem => (
            <GameOptions
              choices={eachItem}
              key={eachItem.id}
              userClicked={this.userClickedOption}
            />
          ))}
        </OrderedList>
      </>
    )
  }

  renderGameWon = () => {
    const {choicesList} = this.props
    const {userChoice, gameChoice} = this.state
    const userObjectList = choicesList.filter(item => item.id === userChoice)

    const userChoiceObject = userObjectList[0]
    const gameObjectList = choicesList.filter(item => item.id === gameChoice)
    const gameChoiceObject = gameObjectList[0]
    return (
      <>
        <Result>
          <ResultViewerContainer>
            <ResultYouGameText>You</ResultYouGameText>
            <ResultYouGameImage
              src={userChoiceObject.imageUrl}
              alt="your choice"
            />
          </ResultViewerContainer>

          <ResultViewerContainer>
            <ResultYouGameText>Other</ResultYouGameText>
            <ResultYouGameImage
              src={gameChoiceObject.imageUrl}
              alt="opponent choice"
            />
          </ResultViewerContainer>
        </Result>
        <ResultYouGameText>YOU WON</ResultYouGameText>
        <PlayAgainButton onClick={this.onClickToGoGameView}>
          Play Again
        </PlayAgainButton>
      </>
    )
  }

  renderGameLost = () => {
    const {choicesList} = this.props
    const {userChoice, gameChoice} = this.state
    const userObjectList = choicesList.filter(item => item.id === userChoice)
    console.log(userObjectList)
    const userChoiceObject = userObjectList[0]
    const gameObjectList = choicesList.filter(item => item.id === gameChoice)
    const gameChoiceObject = gameObjectList[0]
    return (
      <>
        <Result>
          <ResultViewerContainer>
            <ResultYouGameText>You</ResultYouGameText>
            <ResultYouGameImage
              src={userChoiceObject.imageUrl}
              alt="your choice"
            />
          </ResultViewerContainer>

          <ResultViewerContainer>
            <ResultYouGameText>Other</ResultYouGameText>
            <ResultYouGameImage
              src={gameChoiceObject.imageUrl}
              alt="opponent choice"
            />
          </ResultViewerContainer>
        </Result>
        <ResultYouGameText>YOU LOSE</ResultYouGameText>
        <PlayAgainButton onClick={this.onClickToGoGameView}>
          Play Again
        </PlayAgainButton>
      </>
    )
  }

  renderGameDraw = () => {
    const {choicesList} = this.props
    const {userChoice, gameChoice} = this.state
    const userObjectList = choicesList.filter(item => item.id === userChoice)
    console.log(userObjectList)
    const userChoiceObject = userObjectList[0]
    const gameObjectList = choicesList.filter(item => item.id === gameChoice)
    const gameChoiceObject = gameObjectList[0]
    return (
      <>
        <Result>
          <ResultViewerContainer>
            <ResultYouGameText>You</ResultYouGameText>
            <ResultYouGameImage
              src={userChoiceObject.imageUrl}
              alt="your choice"
            />
          </ResultViewerContainer>

          <ResultViewerContainer>
            <ResultYouGameText>Other</ResultYouGameText>
            <ResultYouGameImage
              src={gameChoiceObject.imageUrl}
              alt="opponent choice"
            />
          </ResultViewerContainer>
        </Result>
        <ResultYouGameText>IT IS DRAW</ResultYouGameText>
        <PlayAgainButton onClick={this.onClickToGoGameView}>
          Play Again
        </PlayAgainButton>
      </>
    )
  }

  displayOutput = () => {
    const {gameStatus} = this.state

    switch (gameStatus) {
      case apiStatusConstants.win:
        return this.renderGameWon()
      case apiStatusConstants.inProgress:
        return this.renderInProgressView()
      case apiStatusConstants.lost:
        return this.renderGameLost()
      case apiStatusConstants.draw:
        return this.renderGameDraw()
      default:
        return null
    }
  }

  render() {
    const {userChoice, gameChoice, score} = this.state
    console.log(`User : ${userChoice}`)
    console.log(`Game: ${gameChoice}`)
    console.log(`Score : ${score}`)
    return (
      <ResponsiveContainer>
        <TopDisplayContainer>
          <OrderedTop>
            <h1>ROCK</h1>
            <h1>PAPER</h1>
            <h1>SCISSORS</h1>
          </OrderedTop>
          <ScoreDisplayContainer>
            <Score>Score</Score>
            <Score>{score}</Score>
          </ScoreDisplayContainer>
        </TopDisplayContainer>
        {this.displayOutput()}
        <div>
          <Popup
            modal
            trigger={<button type="button">Rules</button>}
            closeOnEscape
            window
          >
            {close => (
              <>
                <button type="button" onClick={() => close()}>
                  <RiCloseLine />
                </button>
                <div>
                  <RulesButton
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                  />
                </div>
              </>
            )}
          </Popup>
        </div>
      </ResponsiveContainer>
    )
  }
}
export default GamePlay
