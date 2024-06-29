import { MoreVertical, Notebook } from 'lucide-react';
import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image from '../../assets/image1.jpg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GlobalApi from '../../../Service/GlobalApi';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'

function ResumeCardItem({ resume,refreshData }) {
  console.log('ResumeCardItem received resume:', resume);
  const navigation=useNavigate();
  const [openAlert,setOpenAlert]=useState(false);
  const [loading,setLoading]=useState(false);
 


  const onDelete=()=>{
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp=>{
      console.log(resp);
      toast('Resume Deleted!');
      refreshData()
      setLoading(false);
      setOpenAlert(false);
    },(error)=>{
      setLoading(false);
    })
  }
  return (
    <Link to={`/dashboard/resume/ $ {resume.documentId}/edit`}>
      <div className='p-14 bg-gradient-to-b
      from-pink-100 via-blue-200 to-purple-200
      flex items-center justify-center h-[280px] 
      border border-primary rounded-lg
      hover:scale-105 transition-all hover:shadow-md shadow-primary'>
        <img src={image} width={100} height={100} className='rounded-lg'/>
      </div>
      <div className='flex justify-between mt-2 px-4 bg-primary rounded-md text-white p-2 mt-0'>
      <h2 className='text-center my-1 text-white'>{resume.title || "Full Stact Resume"}</h2>
      <DropdownMenu>
          <DropdownMenuTrigger>
          <MoreVertical className='h-4 w-4 cursor-pointer'/>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
           
            <DropdownMenuItem  onClick={()=>navigation('/dashboard/resume/'+resume.documentId+"/edit")}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.documentId+"/view")}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.documentId+"/view")}>Download</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setOpenAlert(true)}>Delete</DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
        
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} 
            disabled={loading}>
              {loading? <Loader2Icon className='animate-spin'/>:'Delete'}
              </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      </div>
    </Link>
  );
}

export default ResumeCardItem;
