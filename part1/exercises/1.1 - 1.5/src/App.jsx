const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <>
      {props.name} {props.number}
    </>
  )
}

const Content = (props) => {
  return (
  <>
      <Part name={props[0].name} number={props[0].exercises} />
      <br />
      <br />
      <Part name={props[1].name} number={props[1].exercises} />
      <br />
      <br />
      <Part name={props[2].name} number={props[2].exercises} />
  </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props[0].exercises + props[1].exercises + props[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content {...course.parts} />
      <Total {...course.parts} /> 
    </div>
  );
}

export default App