import React from 'react';

const ParagraphInput = ({ paragraph: { title, body }, onTitleChange, onBodyChange, index }) => {

    return (
        <div>
            <input id="paragraph-title" type="text" name={index} data-part='title' value={title} onChange={onTitleChange} />
            <textarea cols="30" rows="5" placeholder="Type here..." name={index} data-part='body'  value={body} onChange={onBodyChange} />
            <br />
        </div>
    )
}

export default ParagraphInput
