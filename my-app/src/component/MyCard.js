import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, GridListTileBar, requirePropFactory, Typography } from '@material-ui/core';
import React, { Fragment, useState } from 'react'
import { getMatchDetail, getMatches } from '../api/Api';
import pict from '../img/vs3.png'

const MyCard=({match})=>{
    const [detail,setDetail]=useState({});
    const [open,setOpen]=useState(false);
    const handleClick=(id)=>{

        getMatchDetail(id)
        .then((data)=>{console.log("MATCH DATA ",data)
        setDetail(data);
        handleOpen();
    })
        .catch((error)=>console.group(error));
    };
    const getMatchCart=()=>{
        return (
            <Card style={{marginTop:20}}>
                <CardContent>
                    <Grid container justify="center" alignItems="center" spacing={4}>
                        <Grid item>
                            <Typography variant="h5">{match["team-1"]}</Typography>
                        </Grid>
                        <Grid item>
                          <img src={pict} width="85"/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">{match["team-2"]}</Typography>

                        </Grid>

                    </Grid>
                </CardContent>
                <CardActions>
                   <Grid container justify="center">
                   <Button onClick={()=>{
                       handleClick(match.unique_id);
                   }} item variant="contained" color="primary" >
                        Show Detail
                    </Button>
                    <Button  style={{marginLeft:9}} item variant="contained" color="primary">
                         Start Time {new Date(match.dateTimeGMT).toLocaleString()}
                    </Button>
                   </Grid>
                </CardActions>
            </Card>
        )
    };
    const handleClose=()=>{
        setOpen(false);
    };
    const handleOpen=()=>{
        setOpen(true);
    };


    const getDialog=()=>(
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">{"Match Detail .."}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography>
                        {detail.stat}
                    </Typography>
                    <Typography>
                        Match <span style={{fontStyle:"italic",fontWeight:"bold"}} >
                            {detail.matchStarted?"Started":"Still not Started"}{" "}
                        </span>
                    </Typography>
                    <Typography>
                        Match <span style={{fontStyle:"italic",fontWeight:"bold"}} >
                            {detail.score}
                        </span>
                    </Typography>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>Close</Button>
            </DialogActions>

        </Dialog>
    );
    return (
       <Fragment>
           {getMatchCart()}
           {getDialog()}
       </Fragment>
    );
};
export default MyCard;