import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Loader2 } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { db } from '../../../../../../../config/index';
import { Resume } from '../../../../../../../config/schema';
import { and, eq } from 'drizzle-orm';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

const formFields = {
  name: '',
  rating: 0,
}

const Skills = ({ resumeId }) => {
  const [skillsList, setSkillsList] = useState([
    formFields
  ])
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const addNewSkill = () => {
    setSkillsList([...skillsList, {
      name: '',
      rating: 0
    }])
  }

  const RemoveSkill = () => {
    setSkillsList(skillsList => skillsList.slice(0, -1))
  }

  const handleChange = (idx, name, value) => {
    const newEnteries = skillsList.slice();
    newEnteries[idx][name] = value;
    setSkillsList(newEnteries);
  }

  const Save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await db.update(Resume).set({
        skills: JSON.stringify(resumeInfo.skills)
      }).where(and(eq(Resume.createdBy, user.primaryEmailAddress.emailAddress), eq(Resume.resumeId, resumeId)))

      if (response) {
        toast.success("Skills Updated Successfully");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error Updating Skills")
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    resumeInfo && setResumeInfo({
      ...resumeInfo,
      skills: skillsList
    })
  }, [skillsList])

  return (
    <div className='p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary'>
      <h2 className='text-xl font-bold'>Skills</h2>
      <p>Add Your top professional Skills</p>

      <div className='my-7'>
        {skillsList.map((item, idx) => (
          <div key={idx} className='flex items-stretch justify-between gap-3 p-3 my-3 border rounded-lg shadow-lg'>
            <div>
              <label className='text-xs font-semibold'>Name</label>
              <Input onChange={(e) => handleChange(idx, 'name', e.target.value)} />
            </div>
            <Rating style={{ maxWidth: 150 }} value={item.rating} onChange={(v) => handleChange(idx, 'rating', v)} />
          </div>
        ))}
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <Button variant='outline' className='text-primary' onClick={addNewSkill}> + Add more</Button>
          {
            skillsList.length > 1 &&
            <Button variant='destructive' onClick={RemoveSkill}> - Remove</Button>
          }
        </div>
        <Button onClick={Save}> {loading ? <Loader2 className='animate-spin text-primary' /> : 'Save'}</Button>
      </div>
    </div>
  )
}

export default Skills