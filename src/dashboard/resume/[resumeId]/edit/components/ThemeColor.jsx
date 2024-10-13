import React, { useContext, useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { CheckCircle2, LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { db } from '../../../../../../config/index'
import { Resume } from '../../../../../../config/schema'
import { useUser } from '@clerk/clerk-react'
import { and, eq } from 'drizzle-orm'
import { toast } from 'react-toastify'

const ThemeColor = ({ resumeId }) => {
    const { user } = useUser();
    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#000000", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
    ]
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [theme, setTheme] = useState('');
    const [enable, setEnable] = useState(false);


    const onSave = async () => {
        try {
            const response = await db.update(Resume).set({
                themeColor: resumeInfo.themeColor
            }).where(and(eq(Resume.createdBy, user.primaryEmailAddress.emailAddress), eq(Resume.resumeId, resumeId)))
            if (response) {
                toast.success("Theme Changed");
                setEnable(false);
            }
        } catch (error) {
            toast.error('Error Applying Theme')
        }
    }

    useEffect(() => {
        setEnable(true)
        theme && setResumeInfo({
            ...resumeInfo,
            themeColor: theme
        })
    }, [theme])
    return resumeInfo && (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='gap-2' size='sm'><LayoutGrid className='size-4' />Theme</Button>
            </PopoverTrigger>
            <PopoverContent className='bg-gray-800'>
                <div className='flex items-center justify-between'>
                    <span className='my-3 text-sm font-bold text-white'>Select Theme Color</span>
                    <Button onClick={onSave} variant='ouline' className='items-center gap-1 text-white' size='sm' disabled={!enable}><CheckCircle2 className={` size-5 ${enable ? 'text-green-500' : 'text-white'}`} /> Set</Button>
                </div>
                <div className='grid grid-cols-5 gap-3 my-3'>
                    {
                        colors.map((color, idx) => (
                            <div key={idx} className={`transition-all rounded-full cursor-pointer hover:border-2 hover:scale-110 size-7 ${theme == color && 'border-white border-2'}`}
                                style={{
                                    backgroundColor: color
                                }}
                                onClick={() => setTheme(color)}
                            ></div>
                        ))
                    }
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ThemeColor