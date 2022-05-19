import React, { useState } from "react";
import { crowdfunding } from "./abi/abi1";
import { project } from "./abi/abi2";
import Web3 from "web3";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const web3 = new Web3(Web3.givenProvider);


const contractAddress = "0x3c8056a05606073e93652B3EA90E3E68fb4C4aD2";
const crowdfundingContract = new web3.eth.Contract(crowdfunding, contractAddress);


function App() {

  const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [duration,setDuration] = useState(0);
  const [target,setTarget] = useState(0);
  const [projects,setProjects] = useState([]);

  const addProject = async(t) =>{
    t.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await crowdfundingContract.methods.startProject(title,desc,duration,target).estimateGas();
    const post = await crowdfundingContract.methods.startProject(title,desc,duration,target).send({
      from: account,
      gas,
    });
    post();
  };

  const getAllProjects = async(t)=>{
    t.preventDefault();
    const post = await crowdfundingContract.methods.returnAllProjects().call();
    setProjects(post);
  }


  return (
    <div className="main">
      <div className="card">
        <form className="form" onSubmit={addProject}>
          <label>
            Set Title:
            <br></br>
            <input
              className="input"
              type="text"
              name="name"
              onChange={(t) => setTitle(t.target.value)}
            />
          </label><br></br>
          <label>
            Set Description:
            <br></br>
            <input
              className="input"
              type="text"
              name="name"
              onChange={(t) => setDesc(t.target.value)}
            />
          </label><br></br>
          <label>
            Set Duration in days:
            <input
              className="input"
              type="number"
              name="name"
              onChange={(t) => setDuration(t.target.value)}
            />
          </label><br></br>
          <label>
            Set Target Amount in ETH:
            <input
              className="input"
              type="number"
              name="name"
              onChange={(t) => setTarget(t.target.value)}
            />
          </label><br></br>
          <button className="button" type="submit" value="Confirm">
            Confirm
          </button><br></br>
        </form>
        <br /><br></br><br></br>
        <button className="button" onClick={getAllProjects} type="button">
          All projects
        </button>
        {projects}
      </div>
    </div>
  );
 }
 
 export default App;
