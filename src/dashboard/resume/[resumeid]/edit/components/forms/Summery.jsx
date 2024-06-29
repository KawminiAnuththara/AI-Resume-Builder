import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../../Service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from "../../../../../../../Service/AIModal";



const prompt="Job Title:{jobTitle} ,depends on job title give me summery for my resume within 4-5 lines in JSON format with field experience level and summery with experience level for Fresher,Mid-Level,Experienced"

function Summery({enabledNext}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [summery,setSummery]=useState();
    const [loading,setLoading]=useState(false);
    const params=useParams();
    const [aiGeneratedSummeryList,setAiGeneratedSummeryList]=useState()
    const [selectedExperienceLevel, setSelectedExperienceLevel] = useState("");

    useEffect(()=>{
        summery&&setResumeInfo({
            ...resumeInfo,
            summery:summery
        })
    },[summery])

    const GenerateSummeryfromAI=async()=>{
        setLoading(true)
        const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle)
        console.log(PROMPT);
        const result=await AIChatSession.sendMessage(PROMPT)
        console.log(JSON.parse(result.response.text()));
        setAiGeneratedSummeryList(JSON.parse[(result.response.text())])
        setLoading(false);
    }

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
          data:{
            summery:summery
          }
        };
        try {
          const response = await GlobalApi.UpdateResumeDetails(params?.resumeid, data);
          console.log(response);
          toast.success("Details updated");
        } catch (error) {
          toast.error("Failed to update details");
        } finally {
          setLoading(false);
          enabledNext(true); // Enable next button regardless of success or failure
        }
      };

      const handleExperienceLevelChange = (e) => {
        const selectedLevel = e.target.value;
        setSelectedExperienceLevel(selectedLevel);
        const selectedSummery = aiGeneratedSummeryList.find(item => item.experienceLevel === selectedLevel)?.Summery || "";
        setSummery(selectedSummery);
      };
      
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summery</h2>
      <p>Add Summery for your job title</p>

      <form className="mt-7" onSubmit={onSave}>
        <div className=" flex justify-between items-end">
          <label>Add Summery</label>
          <Button
            variant="outline"
            type="button"
            size="sm"
            onClick={()=>GenerateSummeryfromAI()}
            className="border-primary text-primary flex gap-2"
          >
            <Brain className="h-4 w-4"/>Generate from AI
          </Button>
        </div>
        <Textarea className="mt-5" required
        onChange={(e)=>setSummery(e.target.value)}
        />

        <div className=" mt-2 flex justify-end">
        <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>

        {aiGeneratedSummeryList&& <div className='my-5'>
            <h2 className='font-bold text-lg'>Suggestions</h2>
            {aiGeneratedSummeryList?.map((item,index)=>(
                <div key={index} 
                onClick={()=>setSummery(item?.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                    <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))}
        </div>}
      </form>

      
    </div>
  );
}

export default Summery;
