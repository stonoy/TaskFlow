import React from 'react'

const InputHeader = ({taskInput, handleInput}) => {
  return (
    <div className='flex flex-col gap-2'>
        <label>Header</label>
        <input type='text' name='headerText' value={taskInput.headerText} onChange={handleInput} className='border-2 p-0.5 border-slate-400 rounded-md'/>
    </div>
  )
}

export default InputHeader