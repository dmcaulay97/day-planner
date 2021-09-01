import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const stripePromise = loadStripe('pk_test_51JTSRdFMEfANyIQPVemDAo7lKrsV8BFaIOzm2qTstEhs4MnoT0mnrG0Bvn202iatZkp0KKdf8Qsq2dcVyTGyJffm00y6RTtQxQ')

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    paper: {
        margin: theme.spacing(4, 'auto'),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

const Subscription = () => {
    const classes = useStyles();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        console.log(data);
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    const submitCheckout = (priceId) => {
        getCheckout({
            variables: { priceId }
        });
    }

    return (
        <Button
            onClick={() => submitCheckout("price_1JTT3rFMEfANyIQPR0Dsrcbs")}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
        >Subscribe</Button>
    )
}

export default Subscription;