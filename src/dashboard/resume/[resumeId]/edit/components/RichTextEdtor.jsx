import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { AIChatSession } from '../../../../../../config/AIModel';
import { Brain, Loader2 } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { toast } from 'react-toastify';
const RichTextEdtor = ({ onRichTextEditorChange, index, defaultValue }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [value, setValue] = useState(defaultValue);
    const [aiLoading, setAiLoading] = useState(false)

    const GenerateSummaryFromAI = async () => {
        setAiLoading(true)
        try {
            if (!resumeInfo.experience[index].title) {
                toast.error('Please Add Position Title');
                return;
            }
            const Prompt = `position titile: ${resumeInfo.experience[index].title} , Depends on position title give me 5-7 bullet points for my experience in resume without any fields (just bullet points) only in html tags`;

            const result = await AIChatSession.sendMessage(Prompt);
            const resp = result.response.text();
            setValue(resp.replace('[', '').replace(']', ''));
            setAiLoading(false);

        } catch (error) {
            toast.error("Error in getting Smmary")
        }
        finally {
            setAiLoading(false)
        }
    }

    return (
        <div>
            <div className='flex items-center justify-between px-2 my-2'>
                <label className='text-sm font-bold'>Work Summary</label>
                <Button variant='outline' size='sm' className='text-primary border-primary' disabled={aiLoading} onClick={GenerateSummaryFromAI}>{aiLoading ? <Loader2 className='text-primary animate-spin' /> : <span className='flex items-center gap-1'><Brain className='size-4' /> Generate from AI</span>}</Button>
            </div>
            <EditorProvider >
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value)
                    onRichTextEditorChange(e);
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEdtor