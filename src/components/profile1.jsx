import React, { useEffect, useState } from 'react';
import useData from '../hooks/useData';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const [postData, setPostData] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedPostIndex, setEditedPostIndex] = useState(null);
  const navigate = useNavigate();
  let { users, setUsers, loginUser } = useData();

  const LoginFound = users.find((items) => items.userName === loginUser);


  const date = new Date();



  useEffect(() => {
    if (loginUser === '') {
      navigate('/');
    }
  }, [loginUser]);

  function handlePost() {
    LoginFound.posts.unshift(postData);
    navigate('/profile');
    setPostData('');
  }

  const profileChange = () => {
    const newURL = prompt('URL');
    if (newURL) {
      LoginFound.profilURL = newURL;
      navigate('/profile');
    }
  };

  function handleDelete(index) {
    const updatedPosts = [...LoginFound.posts];
    updatedPosts.splice(index, 1);
    LoginFound.posts = updatedPosts;
    navigate('/profile');
  }

  function handleEdit(index) {
    setEditMode(true);
    setEditedPostIndex(index);
    setPostData(LoginFound.posts[index]);
  }

  function saveEditedPost() {
    if (editedPostIndex !== null) {
      const updatedPosts = [...LoginFound.posts];
      updatedPosts[editedPostIndex] = postData;
      LoginFound.posts = updatedPosts;

      setEditMode(false);
      setEditedPostIndex(null);
      setPostData('');
      navigate('/profile');
    }
  }

  function handleRepost(postToRepost) {
    LoginFound.posts.unshift(postToRepost);
    navigate('/profile');
  }

    function getMonthName(monthIndex) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex];
  }

  return (
    <div className="container">
      {LoginFound ? (
        <>
          <div className="rightSide rounded">
            <img
              className="mt-3 d-block rounded-circle m-auto"
              src={LoginFound.profilURL}
              alt=""
              width={80}
              height={80}
            />
            <button
              className="mt-3 d-block m-auto btn btn-danger"
              onClick={profileChange}
            >
              Change
            </button>
            <h1 className="mt-3 text-center h4">{LoginFound.fullName}</h1>
          </div>

          <div className="midSection rounded">
            <div className="create post border border-2 border-dark rounded mt-3 px-4 py-2">
              <input
                value={postData}
                type="text"
                className="d-block m-auto p-2 w-100 mt-3"
                placeholder="Create Your Post"
                onChange={(e) => setPostData(e.target.value)}
              />
              <button
                className="btn btn-primary d-block w-100 mt-3"
                onClick={handlePost}
              >
                {editMode ? 'Update' : 'Post'}
              </button>
            </div>

            {LoginFound.posts.map((item, index) => (
              <div key={index} className="post border border-2 border-dark rounded mt-3 px-4 py-2"> {date.getDate()},{date.getMonth()},{date.getFullYear()}
                {!editMode || editedPostIndex !== index ? (
                  <div>
                    {item}
                    <ul className="ed">
                      <li className=" dropdown">
                        <a
                          className="nav-link "
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          ---
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <li>
                            <button className="dropdown-item" onClick={() => handleEdit(index)}>
                              Edit
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item" onClick={() => handleDelete(index)}>
                              Delete
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item" onClick={() => handleRepost(item)}>
                              Repost
                            </button>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      value={postData}
                      onChange={(e) => setPostData(e.target.value)}
                    />
                    <button onClick={saveEditedPost}>Save</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="leftSide rounded"></div>
        </>
      ) : (
        <h1>Unauthorized</h1>
      )}
    </div>
  );
}