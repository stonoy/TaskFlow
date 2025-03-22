import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, handleDraggingTask } from "../feature/todoSlice";
import { useRef } from "react";

export function Task({header, body, createdAt, id, chartId, populateEditTask}){
    const dispatch = useDispatch()
    const {draggingTask} = useSelector(state => state.todo)

    

    return <div data-taskid={id} className={`${draggingTask?.id == id && "border-2 border-slate-500 opacity-100 dragging"} flex gap-2 shadow-md p-0.5 my-1`} draggable={true} onDragStart={(e) => dispatch(handleDraggingTask({type:"start", id}))}>
        <div className="w-3/4">
        <h1>{header}</h1>
        <p>{body}</p>
        </div>
        <div className="w-1/4 flex gap-1">
                    <MdModeEdit onClick={() => populateEditTask(id)}/>
                    <MdDelete onClick={() => dispatch(deleteTask({id}))} />
                </div>
    </div>
}