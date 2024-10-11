import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Summary from './forms/Summary'
import Professional from './forms/Professional'
import Education from './forms/Education'
import Skills from './forms/Skills'

const FormSection = ({ resumeId }) => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false)
  return (
    <div>

      <div className='flex items-center justify-between'>
        <Button className='gap-2' size='sm'><LayoutGrid className='size-4' />Theme</Button>
        <div>{activeFormIndex}/5</div>
        <div className='flex items-center gap-2'>
          {
            activeFormIndex > 1 &&
            <Button className='gap-2' variant='outline' size='sm' onClick={() => setActiveFormIndex(activeFormIndex - 1)}> <ArrowLeft className='size-4' /></Button>
          }
          {
            activeFormIndex < 5 &&
            <Button disabled={!enableNext} className='gap-2' variant='outline' size='sm' onClick={() => setActiveFormIndex(activeFormIndex + 1)}>Next <ArrowRight className='size-4' /></Button>
          }
          {
            activeFormIndex === 5 &&
            <Button className='gap-2' size='sm'>Finish</Button>
          }

        </div>
      </div>
      {/* Personal Details */}
      {activeFormIndex === 1 &&
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} resumeId={resumeId} />
      }

      {/* Summary */}
      {
        activeFormIndex === 2 &&
        <Summary enabledNext={(v) => setEnableNext(v)} resumeId={resumeId}  />
      }

      {/* Education */}
      {
        activeFormIndex === 3 &&
        <Professional enabledNext={(v) => setEnableNext(v)} resumeId={resumeId}  />
      }


      {/* Professional */}
      {
        activeFormIndex === 4 &&
        <Education enabledNext={(v) => setEnableNext(v)} resumeId={resumeId} />
      }


      {/* Skills */}
      {
        activeFormIndex === 5 &&
        <Skills resumeId={resumeId} />
      }


    </div>
  )
}

export default FormSection