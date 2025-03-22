import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import InputHeader from "./InputHeader";
import InputBody from "./InputBody";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "./Task";
import { call, findTasksByChartId } from "../utils";
import { addTask, changeChartName, deleteChart, editTask, relocate } from "../feature/todoSlice";

export const Chart = ({id, name}) => {
    const [isEditChart, setIsEditChart] = useState(false)
    const [isEditTask, setIsEditTask] = useState({
        status : false,
        taskId: "",
        lastEditTaskId: ""
    })
    const {tasks, draggingTask} = useSelector(state => state.todo)
    const [taskInput, setTaskInput] = useState({
        headerText: "",
        bodyText : ""
    })
    const dispatch = useDispatch()
    
    
    

    const handleInput = (e) => {
        const {value, name} = e.target

        setTaskInput(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleAddTask = () => {
        dispatch(addTask({...taskInput, id}))

        setTaskInput({
            headerText: "",
            bodyText : ""
        })
    }

    const handleEditTask = () => {
        dispatch(editTask({...taskInput, id: isEditTask.lastEditTaskId}))

        setTaskInput({
            headerText: "",
            bodyText : ""
        })
        setIsEditTask({
            status : false,
            lastEditTaskId: ""
        })
    }

    const populateEditTask = (taskId) => {
        const {status, lastEditTaskId} = isEditTask

        if (status && lastEditTaskId == taskId){
            setTaskInput({
                headerText: "",
                bodyText : ""
            })
            setIsEditTask({
                status : false,
                lastEditTaskId: ""
            })
        } else {
            const {header, body} = tasks.find(task => task.id == taskId)

        setTaskInput({
            headerText: header,
            bodyText : body
        })

        
        setIsEditTask({
            status : true,
            lastEditTaskId: taskId
        })
        }

        
    }

    const handleTaskDrop = (e) => {
        const childrenTasks = [...e.currentTarget.children]

        // console.log(childrenTasks, draggingTask)
        
        const theJustLowerTaskEl = childrenTasks.reduce((acc, task) => {
            // get the stats of the task element
            const {y, height} = task.getBoundingClientRect()
            const distanceOfCgFromTop = y + height/2

            // distance from draggingTask Y point
            const dis = distanceOfCgFromTop - e.clientY

            if (dis > 0 && acc.distance > dis){
                acc.distance = dis
                acc.node = task
            }

            return acc
        }, {distance: Number.POSITIVE_INFINITY, node: null})

        // console.log(theJustLowerTaskEl.node.dataset.taskid)

        dispatch(relocate({taskId: theJustLowerTaskEl?.node?.dataset?.taskid, chartId: id}))
    }

    

    function handleChartName(e) {
        call(() => dispatch(changeChartName({id, name: e.target.value})))
    }

    return (
        <div className="flex flex-col gap-2 p-4 border-2 shadow-lg">
            <div className="flex gap-2 py-2 border-b-2">
                <div className="w-3/4">
                {
                    isEditChart ?
                    <input type="text" className="w-full border-2" defaultValue={name} onChange={handleChartName}/>
                    :
                    <h1 className="text-xl font-semibold text-slate-500 capitalize">{name}</h1>
                }
                </div>
                <div className="w-1/4 flex gap-1 text-xl text-gray-500">
                    <MdModeEdit onClick={() => setIsEditChart(prev => !prev)}/>
                    <MdDelete onClick={() => dispatch(deleteChart({id}))}/>
                </div>
            </div>
            {/* tasks */}
            <div onDragOver={(e) => e.preventDefault()} onDrop={handleTaskDrop} className="py-4">
            {
                findTasksByChartId(id, tasks).sort((a,b) => a.createdAt - b.createdAt).map(task => <Task key={task.id} {...task} populateEditTask={populateEditTask} />)
            }
            </div>
            <div className="flex flex-col">
                <InputHeader taskInput={taskInput} handleInput={handleInput}/>
                <InputBody taskInput={taskInput} handleInput={handleInput}/>
                {
                    isEditTask.status ? 
                    <button onClick={handleEditTask} className="mt-4 ml-auto py-1 px-2 bg-slate-500 text-white rounded-md">Edit</button>
                    :
                    <button onClick={handleAddTask} className="mt-4 ml-auto py-1 px-2 bg-slate-500 text-white rounded-md">Submit</button>
                }
            </div>
        </div>
    )
}