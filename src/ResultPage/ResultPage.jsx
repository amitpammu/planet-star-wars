import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useDispatch, useSelector } from 'react-redux';

/**
 * @description Responsible for displaying search result
 */
const ResultPage = () => {

    const data = useSelector(state => state.users.searchItems); // get search data

    return (
        <>
            <Grid container spacing={2}>
                {data && data.results &&
                    data.results.sort((a, b) => { // sorting by population

                        // remove malicious data
                        if (a.population == "unknown") a.population = 0;
                        if (b.population == "unknown") b.population = 0;

                        return parseInt(b.population) - parseInt(a.population);

                    }).map((value, index) => {
                        return (<Grid item xs={12} sm={12}>
                            {/* highlighting up larger population planet to  */}
                            <Box
                                bgcolor={index == 0 ? "success.main" : "text.disabled"}
                                key={value.name}
                                color={index == 0 ? "primary.contrastText" : "primary.contrastText"}
                                p={index == 0 ? 4 : 2}>
                                {
                                    index == 0 ? <Typography variant="h1=3" component="h2">
                                        {`${value.name} - Population (${value.population})`}
                                    </Typography> : `${value.name} - Population (${value.population})`
                                }


                            </Box>
                        </Grid>)
                    })}
            </Grid>
        </>

    );
}

export { ResultPage };