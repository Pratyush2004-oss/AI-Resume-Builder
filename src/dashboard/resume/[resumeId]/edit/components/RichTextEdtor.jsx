import React, { useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
const RichTextEdtor = ({onRichTextEditorChange}) => {
    const [value, setValue] = useState();
    return (
        <div>
            <EditorProvider >
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value)
                    onRichTextEditorChange(e)
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline/>
                        <BtnStrikeThrough/>
                        <Separator/>
                        <BtnNumberedList/>
                        <BtnBulletList/>
                        <BtnLink/>
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEdtor