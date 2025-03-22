import React from 'react'

const InputBody = ({taskInput, handleInput}) => {
  return (
    <div className='flex flex-col gap-2'>
        <label>Body</label>
        <input type='text'  name="bodyText" value={taskInput.bodyText} onChange={handleInput} className='border-2 p-0.5 border-slate-400 rounded-md'/>
    </div>
  )
}

export default InputBody