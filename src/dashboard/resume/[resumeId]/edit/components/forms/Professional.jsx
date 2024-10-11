import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEdtor from '../RichTextEdtor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'

const formFields = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummary: '',
  currentlyWorking: ''

}
const Professional = ({ enabledNext, resumeId }) => {
  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext)
  const [experienceList, setExperienceList] = useState([
    formFields
  ])

  const handlechange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  }

  const addNewExperience = () => {
    setExperienceList([...experienceList, formFields])
  }

  const RemoveExperience = () => {
    setExperienceList(experienceList => experienceList.slice(0, -1))
  }

  const handleRichTextEditor = (event, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = event.target.value;
    setExperienceList(newEntries);
    
  }
  useEffect(()=>{
    resumeInfo && setResumeInfo({
      ...resumeInfo,
      experience:experienceList
    })
  },[experienceList])
  return (
    <div>
      <div className='p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary'>
        <h2 className='text-xl font-bold'>Professional Experience</h2>
        <p>Add your previous job Experience</p>
        <div>
          {experienceList.map((item, idx) => (
            <div>
              <div className='grid grid-cols-2 gap-3 p-3 my-5 border rounded-lg'>
                <div>
                  <label className='text-xs'>Position Title</label>
                  <Input name='title' onChange={(e) => handlechange(idx, e)} />
                </div>
                <div>
                  <label className='text-xs'>Company Name</label>
                  <Input name='companyName' onChange={(e) => handlechange(idx, e)} />
                </div>
                <div>
                  <label className='text-xs'>City</label>
                  <Input name='city' onChange={(e) => handlechange(idx, e)} />
                </div>
                <div>
                  <label className='text-xs'>State</label>
                  <Input name='state' onChange={(e) => handlechange(idx, e)} />
                </div>
                <div>
                  <label className='text-xs'>Start Date</label>
                  <Input type='date' name='startDate' onChange={(e) => handlechange(idx, e)} />
                </div>
                <div>
                  <label className='text-xs'>End Date</label>
                  <Input type='date' name='endDate' onChange={(e) => handlechange(idx, e)} />
                </div>
                <div className='col-span-2'>
                  <label className='text-xs'>Work Summary</label>
                  <RichTextEdtor onRichTextEditorChange={(event)=>handleRichTextEditor(event, "workSummary", idx)} />
                </div>
              </div>
            </div>
          ))}
          <div className='flex justify-between'>
            <div className='flex gap-3'>
              <Button variant='outline' className='text-primary' onClick={addNewExperience}> + Add more Experience</Button>
              {
                experienceList.length > 1 &&
                <Button variant='destructive' onClick={RemoveExperience}> - Remove</Button>
              }
            </div>
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Professional