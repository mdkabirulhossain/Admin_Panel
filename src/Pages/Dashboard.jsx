import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [form, setForm] = useState({
        title: '',
        date: ''
    });
    const [tasks, setTasks] = useState([]);
    const [editId, setEditId] = useState(null);

    const onChangeHandler = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        console.log(form);

        if (editId) {
            setTasks(
                tasks.map(task => task.id === editId ? { ...task, ...form } : tasks)
            )

            setEditId(null)
        } else {
            setTasks([...tasks, { id: Date.now(), status: false, ...form }])
        }

        setForm({
            title: '',
            date: ''
        })
    }

    useEffect(()=>{
        const saveTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(saveTasks)
    }, [])

    useEffect(()=>{
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    return (
        <div>
            {/* Display Board */}
            <div className='flex justify-between my-10'>
                <div className='text-center p-10 shadow-[0_3px_6px_rgba(0,0,0,0.2)]'>
                    <h1 className='font-bold uppercase'>Total Tasks</h1>
                    <p>{tasks.length}</p>
                </div>
                <div className='text-center p-10 shadow-[0_3px_6px_rgba(0,0,0,0.2)]'>
                    <h1 className='font-bold uppercase'>Processing</h1>
                    <p>0</p>
                </div>
                <div className='text-center p-10 shadow-[0_3px_6px_rgba(0,0,0,0.2)]'>
                    <h1 className='font-bold uppercase'>Completed</h1>
                    <p>0</p>
                </div>
            </div>

            {/* Add Task Form and also Search Filter option  */}
            <div>
                <div>
                    <form onSubmit={onSubmitHandler}>
                        <input type="text" onChange={onChangeHandler} name='title' value={form.title} placeholder='Please enter the title' className='w-full p-2 my-2 border-2 border-amber-700 outline-none rounded-2xl' required />
                        <div className='flex justify-between'>
                            <input type="date" onChange={onChangeHandler} name='date' value={form.date} className='p-2 border-2 border-amber-700 rounded-2xl outline-none' required />
                            <button type='submit' className='bg-amber-600 px-10 py-2 rounded-2xl cursor-pointer'>Add</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* show data  */}
            <div className='my-16'>
                <table className='w-full'>
                    <thead>
                        <tr className='text-center'>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map(task =>(
                                <tr className='text-center' key={task.id}>
                                    <td className='py-4'>{task.title}</td>
                                    <td className='py-4'>{task.date}</td>
                                    <td className='py-4'><button>Edit</button></td>
                                    <td className='py-4'><button>Delete</button></td>
                                    <td className='py-4'>Processing</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;