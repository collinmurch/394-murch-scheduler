import React from 'react'

const schedule = {
	title: 'CS Courses for 2021-2022',
    courses: {
        'F321': {
            id: 'F321',
            meets: 'TuTh 17:00-18:20',
            title: 'Programming Languages'
        },
        'F336': {
            id: 'F336',
            meets: 'TuTh 11:00-12:20',
            title: 'Design and Analysis of Algorithms'
        },
        'W340': {
            id: 'W340',
            meets: 'TuTh 9:30-10:50',
            title: 'Introduction to Networking'
        },
        'W200': {
            id: 'W200',
            meets: 'TuTh 12:30-13:50',
            title: 'Foundations of Data Science'
        },
        'W394': {
            id: 'W394',
            meets: 'MW 15:30-16:50',
            title: 'Agile Software Development'
        }
    }
}

const terms = { 
    F: 'Fall', 
    W: 'Winter', 
    S: 'Spring'
}

const Banner = ({ title }) => (
    <h1>{ title }</h1>
)

const getCourseTerm = course => (
    terms[course.id.charAt(0)]
)

const getCourseNumber = course => (
  course.id.slice(1, 4)
)

const Course = ({ course }) => (
  <div>
    { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
  </div>
)

const CourseList = ({ courses }) => (
    <div>
        { Object.values(courses).map(course => <Course key={course.id} course={ course } />) }
    </div>
)

const App = () => (
    <div>
        <Banner title={ schedule.title } />
        <CourseList courses={ schedule.courses } />
    </div>
)

export default App
