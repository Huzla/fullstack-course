import React from 'react';
import Course from './components/Course.js';
import Header from './components/Header.js';

const App = () => {
  const courses = [
   {
     name: 'Half Stack application development',
     parts: [
       {
         name: 'Fundamentals of React',
         exercises: 10,
         id: 1
       },
       {
         name: 'Using props to pass data',
         exercises: 7,
         id: 2
       },
       {
         name: 'State of a component',
         exercises: 14,
         id: 3
       },
       {
         name: 'Redux',
         exercises: 11,
         id: 4
       }
     ]
   },
   {
     name: 'Node.js',
     parts: [
       {
         name: 'Routing',
         exercises: 3,
         id: 1
       },
       {
         name: 'Middlewares',
         exercises: 7,
         id: 2
       }
     ]
   }
 ]

 const title = "Web development curriculum"

  return (
    <div>
      <Header level=1 course={ title } />
      <Course course={course} />
    </div>
  )
}

export default App
