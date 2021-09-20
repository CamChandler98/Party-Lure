import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { createNewPost } from '../../store/posts';

const EditPostForm = ({ closeModal }) => {

    const aTypeSlice = useSelector(state => state.activityTypes)
    const activitySlice = useSelector(state => state.activities)
    const rolesSlice = useSelector(state => state.roles)
    const postsSlice = useSelector(state => state.posts)

    const activityTypes = Object.values(aTypeSlice)
    const activities = Object.values(activitySlice)
    const roles = Object.values(rolesSlice)
    const posts = Object.values(postsSlice)


    const { id } = useParams();
    const post = posts?.find(post => post.id === +id)

    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState(1);
    const [role, setRole] = useState({ 'Role1': null, 'Role2': null, 'Role3': null, 'Role4': null });
    const [selectRole, setSelectRole] = useState('');
    const [activityType, setActivityType] = useState('');
    const [activity, setActivity] = useState('');

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);


    const editPost = async e => {
        e.preventDefault()
        const payload = {
            postId: post.id,
            userId: sessionUser.id,
            title: title,
            content: description,
            recruitLevel: +level,
            activityId: +activity,
            recruitRole: Object.values(role),
        }
        closeModal()
        await dispatch(createNewPost(payload))
    }

    const updateTitle = (e) => {
        setTitle(e.target.value);
    };

    const updateDescription = (e) => {
        setDescription(e.target.value);
    };

    const updateLevel = (e) => {
        setLevel(e.target.value);
    };

    const setActive = (e) => {
        let currentlyActive = document.querySelectorAll('.activeRole')
        currentlyActive.forEach(el => { el.classList.remove('activeRole'); })
        e.target.classList.add('activeRole')
    };

    const changeActive = (e) => {
        let active = document.querySelector('.activeRole')

        if (active.tagName === 'IMG') {
            active.classList.remove('activeRole')
            active = active.parentNode
            active.classList.add('activeRole')
        }
        active.children[0].src = `${e.target.dataset.url}`
        let roleCopy = { ...role }
        roleCopy[active.id] = e.target.value
        setRole({ ...roleCopy })
        setSelectRole(false)
    };
    const updateActivityType = (e) => {
        setActivityType(e.target.value);
    };

    const updateActivity = (e) => {
        setActivity(e.target.value);
    };

    return (
        <form className='create-post-form' onSubmit={editPost}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div className='form-group'>
                <label htmlFor='title'>Title: </label>
                <input className='form-control' name='title' type='text' placeholder='Set Title Name' value={title} onChange={updateTitle} />
            </div>

            <div className='form-group'>
                <label htmlFor='description'>Description: </label>
                <textarea className='text-control' name='description' type='textarea' placeholder='Enter description' value={description} onChange={updateDescription} />
            </div>
            <div className='form-group'>
                <label htmlFor='activityType'>Activity Type: </label>
                <select name='activityType' type='text' placeholder='Select Activity Type' value={activityType} onChange={updateActivityType}>
                    <option value='' disabled={true}>
                        Select a type
                    </option>
                    {activityTypes.map(activityType => {
                        return (
                            <option value={activityType.name} key={activityType.id}>
                                {activityType.name}
                            </option>
                        )
                    })}
                </select>
            </div>
            {activityType &&
                < div className='form-group' >
                    <label htmlFor='activities'>Activities: </label>
                    <select name='activities' type='text' placeholder='Select Activity' value={activity} onChange={updateActivity}>
                        <option value='' disabled={true}>
                            Select an activity
                        </option>
                        {activities.map(activity => {

                            if (activity.type === activityType) {
                                return (
                                    <option value={activity.id} key={activity.id}>
                                        {activity.name}
                                    </option>
                                )
                            } else {
                                return null
                            }
                        })}
                    </select>
                </div>
            }
            <div className='form-group'>
                <label htmlFor='level'>Level: </label>
                <input className='level-dropdown' name='level' type='number' placeholder='Set Required Level' value={level} onChange={updateLevel} min='1' max='50' />
            </div>

            <div className='form-group'>
                <label htmlFor='title'>Role: </label>
                <div className='role-picker'>
                    <div className='form-role-icon' onClick={(e) => { setActive(e); setSelectRole(true) }} id='Role1'>
                        <img src='https://elixrawsbucket.s3.amazonaws.com/empty-sqaure.png' alt="icon-1">
                        </img>
                    </div>
                    <div className='form-role-icon' onClick={(e) => { setActive(e); setSelectRole(true) }} id='Role2'>
                        <img src='https://elixrawsbucket.s3.amazonaws.com/empty-sqaure.png' alt="icon-2">
                        </img>
                    </div>

                    <div className='form-role-icon' onClick={(e) => { setActive(e); setSelectRole(true) }} id='Role3'>


                        <img src='https://elixrawsbucket.s3.amazonaws.com/empty-sqaure.png' alt="icon-3">

                        </img>
                    </div>

                </div>

                {selectRole &&
                    <ul className='role-selection'>
                        {
                            roles.map(role => {
                                return (
                                    <>
                                        <label className='role-label'>
                                            <input type='radio' value={role.id} key={role.id} name='roles' data-url={role.icon_url} onClick={changeActive} />
                                            {role.name}
                                            <img className='role-img' src={role.icon_url} alt="icon url"></img>
                                        </label>
                                    </>
                                )
                            })
                        }
                    </ul>
                }
                <button className="requestButtons" type='submit'>Submit Edit</button>
                <button className="requestButtons" onClick={closeModal}>
                    Cancel
                </button>
            </div>
        </form >
    );
};

export default EditPostForm;
