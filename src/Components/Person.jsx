import React, { useState, useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import { blue, pink } from '@mui/material/colors';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const Person = () => {
    const [usersArray, setUsersArray] = useState(null);
    const [addUser, setAddUser] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch(`https://randomuser.me/api/`)
            .then((response) => response.json())
            .then((data) => setUsersArray(data.results));
    }, []);

    useEffect(() => {
        fetch(`https://randomuser.me/api/`)
            .then((response) => response.json())
            .then((data) => setAddUser(data.results));
    }, [addUser]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteClick = (id) => {
        return (event) => {
            event.preventDefault();
            const removeItem = usersArray.filter((user) => {
                return user.id.value !== id;
            });

            setUsersArray(removeItem);
        };
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        if (usersArray.length <= 5) {
            setUsersArray((usersArray) => [...usersArray, addUser[0]]);
            setOpen(false);
        } else if (usersArray.length <= 6) {
            setOpen(true);
            setMessage('Max Users Reached');
        }
    };

    const sortUsersAlphabetically = (e) => {
        e.preventDefault();
        setUsersArray((user) => {
            return [...user].sort((a, b) =>
                a.name.first > b.name.first ? 1 : -1
            );
        });
    };

    const sortUsersByAge = (e) => {
        e.preventDefault();
        setUsersArray((user) => {
            return [...user].sort((a, b) => (a.dob.age > b.dob.age ? 1 : -1));
        });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Snackbar
                open={open}
                onClose={handleClose}
                autoHideDuration={6000}
                message={message}
            />
            <Button variant="contained" onClick={handleAddUser}>
                Add a User
            </Button>
            <Button variant="contained" onClick={sortUsersAlphabetically}>
                Sort Alphbetically
            </Button>
            <Button variant="contained" onClick={sortUsersByAge}>
                Sort By Age
            </Button>
            <Grid container spacing={2}>
                {usersArray &&
                    usersArray.map((user, i) => (
                        <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                            <Card>
                                <CardContent>
                                    <CardMedia
                                        component="img"
                                        image={user.picture.large}
                                        alt="user"
                                    />
                                    <Typography variant="h6" component="h1">
                                        {`${user.name.title} ${user.name.first} ${user.name.last}`}
                                    </Typography>
                                    <Typography>Age: {user.dob.age}</Typography>
                                    <Avatar
                                        sx={{
                                            bgcolor:
                                                user.gender === 'female'
                                                    ? pink[200]
                                                    : blue[200],
                                        }}
                                    >
                                        {user.gender === 'female' ? (
                                            <FemaleIcon />
                                        ) : (
                                            <MaleIcon />
                                        )}
                                    </Avatar>
                                    <Typography variant="body2">
                                        {`Location: ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`}
                                    </Typography>
                                    <Typography variant="body2">
                                        {`Email: ${user.email}`}
                                    </Typography>
                                    <Typography variant="body2">
                                        {`Phone: ${user.phone}`}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        onClick={handleDeleteClick(
                                            user.id.value
                                        )}
                                    >
                                        Delete
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export default Person;
