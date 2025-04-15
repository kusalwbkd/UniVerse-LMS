import React from 'react'
import WelcomeBanner from './_componenets/WelcomeBanner'
import CourseList from './_componenets/CourseList'

const Dashboard = () => {
  return (
    <div>
      <WelcomeBanner/>
      <CourseList/>
    </div>
  )
}

export default Dashboard