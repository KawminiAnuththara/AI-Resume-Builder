import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetails from './preview/PersonalDetails'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

function ResumePreview() {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style={{
      borderColor:resumeInfo?.themeColor
    }}>
     {/*  personal details */}
     <PersonalDetails resumeInfo={resumeInfo}/>

     <SummeryPreview resumeInfo={resumeInfo}/>

     <ExperiencePreview resumeInfo={resumeInfo}/>

     <EducationalPreview resumeInfo={resumeInfo}/>

     <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview
