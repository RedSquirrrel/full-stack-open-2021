import React, { useState } from 'react';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = props => (
  <div>
    <table style={{ width: '150px' }}>
      <tbody>
        <tr>
          <th style={{ textAlign: 'left' }}>{props.text}</th>
          <td style={{ textAlign: 'right' }}>{props.value}</td>
        </tr>
      </tbody>
    </table>
  </div>
);
const Statistics = props => {
  return (
    <div>
      <StatisticLine text='Good' value={props.good} />
      <StatisticLine text='Neutral' value={props.neutral} />
      <StatisticLine text='Bad' value={props.bad} />
      <StatisticLine text='All' value={props.totalFeedback} />
      <StatisticLine text='Average' value={props.average} />
      <StatisticLine text='Positive' value={`${props.positive}%`} />
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalFeedback = good + neutral + bad;
  const average = (good - bad) / totalFeedback;
  const positive = (good / totalFeedback) * 100;

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='Good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='Neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='Bad' />

      <h1>Statistics</h1>

      {totalFeedback !== 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          totalFeedback={totalFeedback}
          average={average}
          positive={positive}
        />
      ) : (
        'No feedback given'
      )}
    </div>
  );
};

export default App;
