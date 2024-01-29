import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <>
      <td>{props.label}</td><td>{props.stat}</td>
    </>
  )
};

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  return (
  <>
    <h1>statistics</h1>
    <table>
      <tbody>
        <tr><StatisticLine label={'good'} stat={good} /></tr>
        <tr><StatisticLine label={'neutral'} stat={neutral} /></tr>
        <tr><StatisticLine label={'bad'} stat={bad} /></tr>
        <tr><StatisticLine label={'all'} stat={all} /></tr>
        <tr><StatisticLine label={'average'} stat={average} /></tr>
        <tr><StatisticLine label={'positive'} stat={positive} /></tr>
      </tbody>
    </table>
  </>
  )
}

const Button = (props) => {
  return (
    <button onClick={() => props.stateSetter(props.state+1)}>{props.label}</button>
  )
};

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positive = (good/all) * 100

  return (
    <div>
      <h1>give feedback</h1>
      <Button label={'good'} state={good} stateSetter={setGood} />
      <Button label={'neutral'} state={neutral} stateSetter={setNeutral} />
      <Button label={'bad'} state={bad} stateSetter={setBad} />
  
      {all > 0 ? <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} /> : <><h1>statistics</h1><p>No feedback given</p></>}
    </div>
  )
}

export default App