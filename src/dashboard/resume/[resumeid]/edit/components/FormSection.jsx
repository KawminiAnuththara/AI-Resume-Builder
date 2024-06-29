import React,{useState} from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, HomeIcon, LayoutGrid } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom';
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import Home from '@/home';
import ThemeColor from './ThemeColor';
//import Skills from './forms/Skills';

function FormSection() {

  const [activeFormIndex,setActiveFormIndex]=useState(2);
  const [enableNext,setEnableNext]=useState(false);
  const {resumeId}=useParams();
  return (
    <div>

      <div className='flex justify-between items-center'>
        <div className='flex gap-5 '>
        <Link to={"/dashboard"}>
        <Button size="sm"><HomeIcon/></Button>
        </Link>
        <ThemeColor/>
        
        </div>
        <div className=' flex gap-2'>
          {activeFormIndex>1&& <Button size="sm"
          onClick={()=>setActiveFormIndex(activeFormIndex-1)}
          ><ArrowLeft/></Button>}
          <Button 
          disabled={enableNext}
          className="flex gap-2 " size="sm"
          onClick={()=>setActiveFormIndex(activeFormIndex+1)}
          >Next <ArrowRight/></Button>
        </div>
      </div>
      {/* personal Details */}
      {activeFormIndex===1?<PersonalDetails enableNext={(v)=>setEnableNext(v)}/>
      :activeFormIndex==2?
      <Summery enableNext={(v)=>setEnableNext(v)}/>
      :activeFormIndex==3?
      <Experience enableNext={(v)=>setEnableNext(v)}/>
      :activeFormIndex==4?
      <Education enableNext={(v)=>setEnableNext(v)}/>
      :activeFormIndex==5?
      <Skills enableNext={(v)=>setEnableNext(v)}/>
      :activeFormIndex==6?
      <Navigate to={'/my-resume/'+resumeId+'/view'} />
      :null}
    </div>
  )
}

export default FormSection
