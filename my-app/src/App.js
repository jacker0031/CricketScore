import logo from './logo.svg';
import './App.css';
import React , { useEffect,useState } from "react";
import Button from '@material-ui/core/Button'
import Navbar from './component/Navbar';
import MyCard from './component/MyCard';
import {getMatches} from "./api/Api";
import { Grid, Typography } from '@material-ui/core';

function App() {
  const [matches,setMatches]=useState([]);
  useEffect(() => {
   getMatches()
   .then((data)=>{
     setMatches(data.matches)
     console.log(matches);})
   .catch((error)=>alert("Could not Load data"));
  },[]);
   return (
    <div className="App">
      <Navbar></Navbar>
      <Typography variant="h3" style={{marginTop:20}}>Welcome to Cricket Score App</Typography>
        <Grid container>
          <Grid sm="2">
                
          </Grid>
          <Grid sm="8">
            {
               matches.map((match)=>(
                <MyCard key={match.unique_id} match={match} />
              ))
            }   
          </Grid>
        </Grid>
      

    </div>
  );
}

export default App;
