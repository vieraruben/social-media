import React, {useState, useEffect}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import {list} from '../user/api-user'
import {findPeople, follow} from '../user/api-user'
import { apiUrl } from '../../config'
import auth from './../auth/auth-helper'
import useChat from "../../useChat";

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

const Chat = () => {
  const abortController = new AbortController()
  const signal = abortController.signal
  const classes = useStyles();
  const [users, setUsers] = useState([])
  const [roomId, setRoomId] = useState("")
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState("");
  const [search, setSearch] = useState("")

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  useEffect(() => {
    

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        console.log("data " + JSON.stringify(data))
        console.log("auth.isAuthenticated().user._id " + auth.isAuthenticated().user._id)
        setUsers(data)
      }
    })
  }, [])

  return (
      <div className="container-fluid">
        <br />
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection} elevation={4}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key={auth.isAuthenticated().user._id}>
                        <ListItemIcon>
                          <Avatar alt={auth.isAuthenticated().user.name} src={`${apiUrl}/api/users/photo/${auth.isAuthenticated().user._id}`} />
                        </ListItemIcon>
                        <ListItemText primary={auth.isAuthenticated().user.name}></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth 
                      onChange={event => setSearch(event.target.value)}
                    />
                </Grid>
                <Divider />
                <List>
                  {users.filter(item => item.name.indexOf(search) != -1).map((item, i) => {
                    return <ListItem button key={`${item._id}`}>
                              <ListItemIcon>
                                  <Avatar alt={item.name} src={`${apiUrl}/api/users/photo/${item._id}`} />
                              </ListItemIcon>
                              <ListItemText primary={item.name}>{item.name}</ListItemText>
                              <ListItemText secondary="online" align="right"></ListItemText>
                          </ListItem>
                        })
                      }
                </List>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:31"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth
                          value={newMessage}
                          onChange={handleNewMessageChange}
                        />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}

export default Chat