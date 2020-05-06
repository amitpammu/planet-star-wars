import React from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// This page is responsible to display User card and info
const UserPage = () => {
    const user = useSelector(state => state.authentication.user); // get user data
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <Box bgcolor="error.main" color="info.contrastText" p={4}>
                    <Typography variant="h4" component="h2">
                        Welcome, {user && user.name}
                    <Divider />
                        <Button variant="contained">
                            <Link color="textSecondary" to="/login">Logout</Link>
                        </Button>

                    </Typography>
                </Box>
            </Grid>

        </Grid>

    );
}

export { UserPage };