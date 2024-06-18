import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import React from 'react';
import PostService from '../../services/PostService';
import UserService from '../../services/UserService';
import SocialService from '../../services/SocialService';
import UploadProgressBar from '../../components/UserHomePageComps/UploadProgressBar'
import CreatePostForm from '../../components/UserHomePageComps/CreatePostForm';
import PostsTable from '../../components/UserHomePageComps/PostsTable';
import UsersTable from '../../components/UserHomePageComps/UsersTable';
import PlatformsSelection from '../../components/UserHomePageComps/PlatformsSelection';
import SelectedOptions from '../../components/UserHomePageComps/SelectedOptions';
import Togglable from '../../components/ForAllComps/Togglable';
import LogSection from '../../components/UserHomePageComps/LogSection';
import Footer from '../../components/ForAllComps/Footer';
import BackToTopButton from '../../components/ButtonComps/BackToTopButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../components/styles/custom.css'


const UserHomePage = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [log, setLog] = useState([]);
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const platforms = ['Reddit', 'Twitter', 'Facebook'];
    const [newPost, setNewPost] = useState({title:"", content:""})

    const [progress, setProgress] = useState(0); // State for progress bar
    const [uploading, setUploading] = useState(false); // State to track if uploading is in progress
    
    const [createPostStatus, setCreatePostStatus] = useState(false)
    const [darkMode, setDarkMode] = useState(false);

    useEffect( () => {
        const loggedUserJSON = window.localStorage.getItem('loggedSocialNetworkUser')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            // console.log("user",user)
            setUser(user)
        }
    },[])

    
    const fetchPosts = () => {
        PostService
            .getAll()
            .then(listPosts => {
                setPosts(listPosts)
            })
    }

    const fetchUsers = () => {
        UserService
            .getAll()
            .then(listUsers => {
                setUsers(listUsers)
            })
    }
    useEffect(() => {
        fetchPosts()
    },[])

    useEffect(() => {
        fetchUsers()
    },[])

    const handleChoosePost = (post) => {
        const postIndex = selectedPosts.findIndex(p => p.id === post.id);
        if (postIndex > -1) {
            setSelectedPosts(selectedPosts.filter(p => p.id !== post.id));
        } else {
            setSelectedPosts([...selectedPosts, post]);
        }
    };

    const handleChooseUser = (user) => {
        if (user === selectedUser) setSelectedUser(null)
        else setSelectedUser(user)
    };

    const handleSubmit = async () => {
        const now = new Date().toLocaleString();
        const loggedUserJSON = window.localStorage.getItem('loggedSocialNetworkUser');
        const user = JSON.parse(loggedUserJSON);
        const apikey = user.apikey

        setUploading(true)
        try {
            for (let i = 0; i <= 99; i += 0.5) {
                await new Promise(resolve => setTimeout(resolve, 5));
                setProgress(i);
            }
            
            const selectedPosts2 = selectedPosts.map(post => ({
                id: post.id,
                title: post.title,
                content: `${post.title} - ${post.content}`
            }))
            const response = await SocialService.upload({ selectedPlatforms, selectedUser, selectedPosts2, apikey });
            console.log(response.data)
            const newLogEntries = response.data.flatMap(entry => {
                if (entry.status === "error") {
                    return {
                        message: entry.message, 
                        status: entry.status
                    }
                } 
                else if (entry.status === "success" && entry.action === "quota limit"){
                    return { 
                        status:entry.status, 
                        message: entry.message,
                        action: entry.action
                    }
                } 
                else {
                    return entry.postIds.map(data => ({
                        now: now,
                        status: data.status,
                        platform: data.platform,
                        postUrl: data.postUrl
                    }))
                }
            });
            setLog(prevLog => [...prevLog, ...newLogEntries]);
            console.log("log",log)
            setProgress(100)
        } catch (error) {
            console.error('Posting failed:', error);
            setLog(prevLog => [...prevLog, `${now} - Posting failed: ${error.message}`])
            setProgress(100)
        }
        setProgress(0);
        setUploading(false);
        handleCancel()
    };

    
    const handleCancel = () => {
        setSelectedPlatforms([])
        setSelectedUser(null)
        setSelectedPosts([])
    }

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedSocialNetworkUser')
        navigate(`/login`)
    }
    const handleTogglePlatform = (platform) => {
        const currentIndex = selectedPlatforms.indexOf(platform);
        const newChecked = [...selectedPlatforms];

        if (currentIndex === -1) {
            newChecked.push(platform);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setSelectedPlatforms(newChecked);
    };

    const handleCreatePost = (event) => {
        event.preventDefault();
        const postObject = newPost
        PostService
            .create(newPost)
            .then(returnedPost =>{
                setPosts(posts.concat(returnedPost))
            })
        setNewPost({ title: "", content: "" })
    }

    const handleDeletePost = (postId) =>{
        console.log('delete post',postId)
        PostService
            .remove(postId)
            .then(data => {
                console.log(data)
                fetchPosts()
            })
        
    }
    const handleEditPost = (post) => {
        const postId = post.id
        console.log('edit post',post)
        PostService
            .edit(postId, post)
            .then(updatedPost => {
                console.log(updatedPost)
                fetchPosts()
            })
    }



    return(
        <div className={darkMode ? 'dark-mode' : 'light-mode'}>
            <div className='container'>
                <p>
                    {user === null ? `nothing or logout` : `${user.name} logged in `}
                    <button onClick={handleLogout} className='btn btn-secondary'>Logout</button>
                </p>
            </div>

            {/* <button onClick={() =>{setDarkMode(!darkMode)}}>
                {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button> */}

            <div className='container'>
                <div className='row'>
                    {
                        createPostStatus === true ? (
                            <React.Fragment>
                                <div className="overlay"></div> 
                                <div className="edit-form-overlay">
                                    <CreatePostForm
                                        handleCreatePost={handleCreatePost}
                                        newPost={newPost}
                                        titleOnChange={({target})=> {setNewPost({...newPost, title: target.value})}}
                                        contentOnChange={({target})=> {setNewPost({...newPost, content: target.value})}}
                                        handleCancelCreate={()=> {setCreatePostStatus(false)}}
                                    />
                                </div>
                            </React.Fragment>
                        ) : null
                    }
                </div>

                <div className='row'>
                    <div className='col-lg-7'>
                        <PostsTable
                            posts={posts}
                            selectedPosts={selectedPosts}
                            handleChoosePost={handleChoosePost}
                            handleDeletePost={handleDeletePost}
                            handleEditPost={handleEditPost}
                        />
                    </div>
                    <div className='col-lg-5'>
                        <UsersTable
                            users={users}
                            selectedUser={selectedUser}
                            handleChooseUser={handleChooseUser}
                        />
                    </div>
                    <button onClick={()=>setCreatePostStatus(true)} className='btn btn-info' style={{width: '50%', marginLeft: '5%'}}>Create Post</button>
                </div>

                <div className='row' style={{marginTop:'50px'}}>
                    <div className='col-lg-12'>
                        <PlatformsSelection
                            platforms={platforms}
                            selectedPlatforms={selectedPlatforms}
                            handleTogglePlatform={handleTogglePlatform}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg-12'>
                        <SelectedOptions
                            selectedPosts={selectedPosts}
                            selectedUser={selectedUser}
                            selectedPlatforms={selectedPlatforms}
                            handleSubmit={handleSubmit}
                            handleCancel={handleCancel}
                        />
                        <UploadProgressBar uploading={uploading} progress={progress} />
                    </div>
                </div>

                <div className='row justify-content-center'>
                    <div className='col-lg-12'>
                        <LogSection log={log}/>
                        <div className='d-flex justify-content-center'>
                            <button onClick={() => {setLog([])}} className='btn btn-secondary' style={{width: '50%'}}>Clear Log</button>
                        </div>
                    </div>
                </div>

            </div>

            <BackToTopButton/>
            <Footer/>
        </div>
        
)}
export default UserHomePage