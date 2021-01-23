import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Table } from 'semantic-ui-react'
import "./Profile.css";

const Profile = () => {
    const [data, setData] = useState({});
    const [userName, setUserName] = useState('');
    const [repos, setRepo] = useState([]);
    const onChangeHandler = (e) => {
        setUserName(e.target.value);
    }
    const submitHandler = async e => {
        e.preventDefault();

        const profile = await fetch(`https://api.github.com/users/${userName}`);
        const profileJSON = await profile.json();
        
        const repos = await fetch(profileJSON.repos_url);
        const repoJSON = await repos.json();
        if(profileJSON){
            setData(profileJSON);
            setRepo(repoJSON);
        }
        console.log(repos);
    }
    let profleImg = data.avatar_url;
    return(
        <>
        <div className='main-cantainer'>
            <div className='ui search sub-div'>
                <div className='ui icon input'>
                <i className='search icon'></i>
                <input className='prompt' type='text' value={userName} onChange={onChangeHandler} />
                </div>
                <button className='ui primary button' type='submit' onClick={submitHandler}>
                    <i className='github icon'></i>Search
                </button>
              </div>
              <table className="ui table">
              <thead>
                <tr className='tableRow'>
                  <th className='tableHead'>Name</th>
                  <th className='tableHead'>Avatar</th>
                  <th className='tableHead'>Location</th>
                  <th className='tableHead'>Bio</th>
                  <th className='tableHead'>Repositories</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className='spanData'>Name : </span>{data.name}</td>
                  <td>
                  <span className='spanData'>Avatar : </span>
                    {!data.avatar_url ? (
                      " "
                    ) : (
                      <img
                        className="ui small circular image"
                        src={data.avatar_url}
                        alt={data.avatar_url}
                      />
                    )}
                  </td>
                  <td><span className='spanData'>Location : </span>{data.location}</td>
                  <td><span className='spanData'>Bio : </span>{data.bio}</td>
                  <td>
                  <span className='spanData'>Repositories : </span>
                    {repos.map(repo => (
                      <div className="ui relaxed divided list" key={repo.name}>
                        <div className="item">
                          <i className="large github middle aligned icon"></i>
                          <div className="content">
                            <a href={repo.html_url} className="header" target="_blank">
                              {repo.name}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
        </>
    );
}

export default Profile;