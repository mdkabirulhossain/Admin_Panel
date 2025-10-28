import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [form, setForm] = useState({
        title: '',
        date: ''
    });
    const [tasks, setTasks] = useState([]);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState('none');
    const [sort, setSort] = useState('');

    const onChangeHandler = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        console.log(form);

        if (editId) {
            setTasks(
                tasks.map(task => task.id === editId ? { ...task, ...form } : task)
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

    useEffect(() => {
        const saveTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(saveTasks)
    }, [])

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
    }, [tasks])


    //Show processing data only
    const handleProcessing = ()=>{
        setSort(sort === 'processing'? 'none' : 'processing')
    }
    //Show Status completed data only
    const handleDone = ()=>{
        setSort(sort === 'done'? 'none' : 'done')
    }
    //Sort By title
    const handleTitle = ()=>{
        setFilter(filter === 'title'? 'none' : 'title')
    }
    //Sort By date
    const handleDate = ()=>{
        setFilter(filter === 'date'? 'none' : 'date')
    }

    


    //filter funciton
    const handleFilter = (()=>{
        if(filter === 'title'){
            return [...tasks].sort((a, b)=> a.title.localeCompare(b.title))
        }
        else if (filter === 'date'){
            return [...tasks].sort((a, b)=>new Date(a.date) - new Date(b.date))
        }
        return tasks
    })()

    //Handle sort
    const handleSort = handleFilter.filter(task =>{
        if(sort === 'processing') {
            return task.status === false
        }else if(sort === 'done'){
            return task.status === true
        }else{
            return true
        }
    })

    //Handle Search by title and date
    const handleSearch = handleSort.filter(task => {
        const searchValue = search.toLowerCase();

        return(
            task.title.toLowerCase().includes(searchValue) ||
            task.date.includes(searchValue) 
        )
    })

    //HandleEdit
    const handleEdit = (task) => {
        setForm({
            title: task.title,
            date: task.date
        })
        setEditId(task.id)
    }
    //Handle Delete
    const handleDelete = id => {
        setTasks(
            tasks.filter(task => task.id !== id)
        )
    }

    //handle Status
    const handleStatus = id => {
        setTasks(
            tasks.map(task => task.id === id ? { ...task, status: !task.status } : task)
        )
    }


 

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
                    <p>{tasks.filter(task => task.status === false).length}</p>
                </div>
                <div className='text-center p-10 shadow-[0_3px_6px_rgba(0,0,0,0.2)]'>
                    <h1 className='font-bold uppercase'>Completed</h1>
                    <p>{tasks.filter(task => task.status === true).length}</p>
                </div>
            </div>

            {/* Add Task Form and also Search Filter option  */}
            <div>
                <div>
                    <form onSubmit={onSubmitHandler}>
                        <input type="text" onChange={onChangeHandler} name='title' value={form.title} placeholder='Please enter the title' className='w-full p-2 my-2 border-2 border-amber-700 outline-none rounded-2xl' required />
                        <div className='flex justify-between'>
                            <input type="date" onChange={onChangeHandler} name='date' value={form.date} className='p-2 border-2 border-amber-700 rounded-2xl outline-none' required />
                            <button type='submit' className='bg-amber-600 px-10 py-2 rounded-2xl cursor-pointer'>{editId ? "Updated" : "Add"}</button>
                        </div>
                    </form>
                </div>

                {/* Search and Filter  */}
                <div className='flex gap-10 my-20'>
                    <input type="text" placeholder='search...' value={search} onChange={e => setSearch(e.target.value)} className='p-1 rounded-2xl border-2 border-amber-700 outline-none' />
                    <button onClick={handleTitle}>sort by A-Z</button>
                    <button onClick={handleDate}>sort by date</button>
                    <button onClick={handleProcessing}>Processing</button>
                    <button onClick={handleDone}>Done</button>
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
                            handleSearch.map(task => (
                                <tr className='text-center' key={task.id}>
                                    <td className='py-4'>{task.title}</td>
                                    <td className='py-4'>{task.date}</td>
                                    <td className='py-4'><button onClick={() => handleEdit(task)} className='bg-amber-700 px-4 py-1 rounded-2xl'>Edit</button></td>
                                    <td className='py-4'><button onClick={() => handleDelete(task.id)} className='bg-red-700 px-4 py-1 rounded-2xl'>Delete</button></td>
                                    <td className='py-4'><button onClick={() => handleStatus(task.id)} className='bg-amber-700 px-4 py-1 rounded-2xl'>{task.status ? 'Done' : 'Processing'}</button></td>
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