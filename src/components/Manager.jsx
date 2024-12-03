import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        let passwordArray;
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, [])


    const showPassword = () => {
        // if (e.target.src.includes("eye_open")) {
        //     e.target.src = "icons/eye_close.png"
        //     e.target.parentNode.childNodes[0].type = "text"
        // } else {
        //     e.target.src = "icons/eye_open.png"
        //     e.target.parentNode.childNodes[0].type = "password"
        // }

        passwordRef.current.type = "text";
        console.log(ref.current.src);
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text";
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "password";
        }
    }

    const savePassword = () => {
        // alert("Save the password")
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form]);
            setform({ site: "", username: "", password: "" })
            toast('Password saved successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast('Error: Password not saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const deletePassword = (id) => {
        console.log("Deleting password with id ", id);

        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        console.log("Editing password with id ", id);

        setform(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="p-2 md:p-0 md:mycontainer min-h-[82.9vh]">
                <h1 className='text-4xl font-bold text text-center'>
                    <span className='text-green-500'>&lt;/</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='site' id='site' />
                    <div className='flex flex-col md:flex-row w-full justify-between gap-8'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='username' id='username' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-[3px] top-[3px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={28} className='p-1' src="icons/eye.png" alt="open_eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 rounded-full px-8 py-2 w-fit hover:bg-green-300 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password
                    </button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show </div>}
                    {/* {passwordArray.length !== 0 && <table className="table-auto md:w-full w-fit rounded-md overflow-hidden mb-8">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className="flex justify-center items-center">
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='sl-button size-7' onClick={() => { copyText(item.site) }}><sl-copy-button
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "5px", "paddingLeft": "3px" }}
                                                value={item.site}
                                                copy-label="Click to copy"
                                                success-label="You did it!"
                                                error-label="Whoops, your browser doesn't support this!"
                                            ></sl-copy-button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'><div className="flex justify-center items-center"><span>{item.username}</span>
                                        <div className='sl-button size-7' onClick={() => { copyText(item.username) }}><sl-copy-button
                                            style={{ "width": "25px", "height": "25px", "paddingTop": "5px", "paddingLeft": "3px" }}
                                            value={item.username}
                                            copy-label="Click to copy"
                                            success-label="You did it!"
                                            error-label="Whoops, your browser doesn't support this!"
                                        ></sl-copy-button>
                                        </div>
                                    </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex justify-center items-center'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='sl-button size-7' onClick={() => { copyText(item.password) }}><sl-copy-button
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "5px", "paddingLeft": "3px" }}
                                                value={item.password}
                                                copy-label="Click to copy"
                                                success-label="You did it!"
                                                error-label="Whoops, your browser doesn't support this!"
                                            ></sl-copy-button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-white text-center'>
                                        <div className='flex justify-center items-center gap-2'>
                                            <span onClick={()=>{editPassword(item.id)}}>
                                                <img width={28} className='p-1 cursor-pointer hover:scale-125' src="icons/edit-button.png" alt="Edit Button" />
                                            </span>
                                            <span onClick={()=>{deletePassword(item.id)}}>
                                                <img width={28} className='p-1 cursor-pointer hover:scale-125' src="icons/bin.png" alt="Edit Button" />
                                            </span>
                                        </div>
                                    </td> 
                                </tr>
                            })}
                        </tbody>
                    </table>} */}
                    {passwordArray.length !== 0 && <div className="overflow-x-auto">
                        <table className="table-auto w-full max-w-screen-lg mx-auto rounded-md overflow-hidden mb-8">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="py-2 px-4 text-sm md:text-base">Site</th>
                                    <th className="py-2 px-4 text-sm md:text-base">Username</th>
                                    <th className="py-2 px-4 text-sm md:text-base">Password</th>
                                    <th className="py-2 px-4 text-sm md:text-base">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item, index) => (
                                    <tr key={index} className="text-xs md:text-sm">
                                        <td className="py-2 px-4 border border-white text-center">
                                            <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                                                <a href={item.site} target="_blank" className="text-blue-500 underline">
                                                    {item.site}
                                                </a>
                                                <div
                                                    className="sl-button size-7"
                                                    onClick={() => copyText(item.site)}
                                                >
                                                    <sl-copy-button
                                                        style={{ width: "25px", height: "25px", paddingTop: "5px", paddingLeft: "3px" }}
                                                        value={item.site}
                                                        copy-label="Click to copy"
                                                        success-label="You did it!"
                                                        error-label="Whoops, your browser doesn't support this!"
                                                    ></sl-copy-button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border border-white text-center">
                                            <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                                                <span>{item.username}</span>
                                                <div
                                                    className="sl-button size-7"
                                                    onClick={() => copyText(item.username)}
                                                >
                                                    <sl-copy-button
                                                        style={{ width: "25px", height: "25px", paddingTop: "5px", paddingLeft: "3px" }}
                                                        value={item.username}
                                                        copy-label="Click to copy"
                                                        success-label="You did it!"
                                                        error-label="Whoops, your browser doesn't support this!"
                                                    ></sl-copy-button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border border-white text-center">
                                            <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                                                <span>{"*".repeat(item.password.length)}</span>
                                                <div
                                                    className="sl-button size-7"
                                                    onClick={() => copyText(item.password)}
                                                >
                                                    <sl-copy-button
                                                        style={{ width: "25px", height: "25px", paddingTop: "5px", paddingLeft: "3px" }}
                                                        value={item.password}
                                                        copy-label="Click to copy"
                                                        success-label="You did it!"
                                                        error-label="Whoops, your browser doesn't support this!"
                                                    ></sl-copy-button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border border-white text-center">
                                            <div className="flex justify-center items-center gap-2">
                                                <span onClick={() => editPassword(item.id)}>
                                                    <img
                                                        width={28}
                                                        className="p-1 cursor-pointer hover:scale-125"
                                                        src="icons/edit-button.png"
                                                        alt="Edit Button"
                                                    />
                                                </span>
                                                <span onClick={() => deletePassword(item.id)}>
                                                    <img
                                                        width={28}
                                                        className="p-1 cursor-pointer hover:scale-125"
                                                        src="icons/bin.png"
                                                        alt="Delete Button"
                                                    />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
