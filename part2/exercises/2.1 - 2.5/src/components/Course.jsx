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
      {props.parts.map((part) => (
        <div key={part.id}>
          <Part name={part.name} number={part.exercises} />
          <br />
          <br />
        </div>
      ))}
    </>
  )
};

const Total = (props) => {
  const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0);  
  return (
    <>     
      <p><b>total of {totalExercises} exercises</b></p>
    </>
  )
}

const Course = (props) => {
    return (
      <div>
        <Header course={props.course.name} />
        <Content {...props.course} />
        <Total {...props.course} /> 
      </div>
    )
  }

  export default Course;