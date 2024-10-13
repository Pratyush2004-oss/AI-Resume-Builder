import { Button } from '@/components/ui/button'
import { Brain, Loader2 } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import React, { useContext, useEffect, useState } from 'react'
import { and, eq } from 'drizzle-orm';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import { db } from '../../../../../../../config/index';
import { Resume } from '../../../../../../../config/schema';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { AIChatSession } from '../../../../../../../config/AIModel';

const Summary = ({ enabledNext, resumeId }) => {

  const { user } = useUser();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState();
  const [summary, setSummary] = useState('');
  const prompt = `Job Title : ${resumeInfo.jobTitle}, Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format `;

  useEffect(() => {
    enabledNext(false)
    summary && setResumeInfo({
      ...resumeInfo,
      summary: summary
    })
  }, [summary])
  const generateSummaryFromAI = async () => {
    setAiLoading(true);
    try {
      const result = await AIChatSession.sendMessage(prompt);
      if (result.response.text()) {
        // console.log(JSON.parse(result.response.text()));
        setAiSummary(JSON.parse(result.response.text()));
        setAiLoading(false);
      }
    } catch (error) {
      toast.error("Error generating Summary from AI");
    }
    finally {
      setAiLoading(false);
    }
  }

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await db.update(Resume).set({
        summary: resumeInfo.summary,
      }).where(and(eq(Resume.createdBy, user.primaryEmailAddress.emailAddress), eq(Resume.resumeId, resumeId)))

      if (response) {
        toast("Summary Saved Successfully");
        setLoading(false);
        enabledNext(true);
      }
    } catch (error) {
      toast.error("Error saving the Summary");
    }
    finally {
      setLoading(false);
    }
  }

  return resumeInfo && (
    <div>
      <div className='p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary'>
        <h2 className='text-xl font-bold'>Summary</h2>
        <span>Add Summary for your Job Title</span>

        <div className='flex items-center justify-between my-3'>
          <label className='font-semibold'>Add Summary</label>
          <Button onClick={generateSummaryFromAI} className='border-primary text-primary' variant='outline' size='sm'> {aiLoading ? <Loader2 className='animate-spin' /> : <span className='flex items-center gap-1'> <Brain className='size-4' /> Generate from AI</span>}</Button>
        </div>

        <form className='my-7' onSubmit={onSave}>
          <Textarea defaultValue={resumeInfo.summary} className='mt-5' placeholder='Enter Summary' value={summary} required onChange={(e) => setSummary(e.target.value)} />
          <div className='flex justify-end mt-2'>
            <Button>{loading ? <Loader2 className='animate-spin ' /> : 'Save'}</Button>
          </div>
        </form>
      </div>

      {
        aiSummary &&
        <div className='p-2 my-5 text-justify rounded-lg shadow-lg'>
          <h1 className='text-lg font-bold'>Suggestions</h1>
          {aiSummary?.map((summary, idx) => (
            <div key={idx} className='p-2 my-2 border shadow-lg cursor-pointer' onClick={() => setSummary(summary.summary)}>
              <h2 className='my-1 font-bold'>Level : {summary.experience_level}</h2>
              <p >{summary.summary}</p>
            </div>
          ))}

        </div>
      }
    </div>
  )
}

export default Summary