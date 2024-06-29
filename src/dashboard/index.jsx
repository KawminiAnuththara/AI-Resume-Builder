import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from '../../Service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';
import robo from '../assets/robo.png'

function Dashboard() {
  const {user}=useUser();

  const [resumeList,setResumeList]=useState([]);

  useEffect(()=>{
    user&&GetResumeList()
  },[user])

  const GetResumeList=()=>{
    GlobalApi.GetUserResume(user?.primaryEmailAddress?.emailAddress)
    .then(resp=>{
      setResumeList(resp.data.data);
    })
  } 
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <div  className='flex flex-row'>
      <div>
      <h2 className='font-bold text-3xl'>
        My Resume
      </h2>
      <p>Start creating your AI resume for your upcoming job opportunity</p>
      </div>
      <img src={robo} className="w-[70px] ml-5 animate-bounce "/>
      </div>
      <div className='grid grid-cols-2
       md:grid-cols-3 
       lg:grid-cols-5  mt-10 gap-5'>
        <AddResume/>
        {resumeList.length>0&&resumeList.map((resume,index)=>(
          <ResumeCardItem resume={resume} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
