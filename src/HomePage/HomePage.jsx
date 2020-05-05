import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { ResultPage } from '../ResultPage';
import { UserPage } from '../UserPage';
import { constants } from "../constants/constants";
import Button from '@material-ui/core/Button';

import { useDispatch } from 'react-redux';
import { userActions } from '../actions';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

const HomePage = () => {

    const [search, setSearch] = useState(""); // search box state
    const [isDisabled, setIsDisabled] = useState(false); // disabled state of search box

    const dispatch = useDispatch();
    const classes = useStyles();

    // reset search box disabled state and enable searching
    const resetSearch = () => {
        localStorage.setItem("requestCount", 0);
        localStorage.removeItem("reqTime");
        setIsDisabled(false);
    };

    // handle search, controller for search string
    // and the number of request
    const handleSearch = e => {

        let searchStr = e.target.value;
        setSearch(searchStr);

        // get number of request User has made so far after login
        let currReqCount = parseInt(localStorage.getItem("requestCount"));

        // get Username, allow user to unlimited request if it is Luke
        let user = JSON.parse(localStorage.getItem("user"));

        if (currReqCount > constants.API_CALL_LIMIT &&
            constants.ALLOWED_USER !== user.nme) {
            // block user request, disable search box
            setIsDisabled(true);

        } else {
            // increase number of user api call count
            localStorage.setItem("requestCount", currReqCount + 1);

            // get planet details
            dispatch(userActions.searchPlanet(searchStr));

        }


    };
    return (
        <>
            {/* User card Component */}
            <UserPage />
            {/* end */}

            {/* search box */}
            <Grid container spacing={2}>

                {isDisabled && <Grid item xs={12} sm={12} >
                    <p>Search box disabled, Allowed Number of request exhausted. </p>
                    <Button
                        variant="contained"
                        onClick={resetSearch}>
                        Click to Reset
                        </Button>
                </Grid>}
                <Grid item xs={12} sm={12} >
                    <Paper component="form" className={classes.root}>
                        <InputBase
                            disabled={isDisabled}
                            className={classes.input}
                            placeholder="Search planets"
                            autoComplete="off"
                            value={search}
                            onChange={handleSearch}
                        />
                        <IconButton type="button" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
            {/* end  */}

            {/* Search Result Component */}
            <ResultPage />
        </>

    );
}

export { HomePage };