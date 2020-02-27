import React from 'react';
import  { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom'; 
import ContactData from './ContactData/ContactData';


 const Checkout = (props) => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

        let summary = <Redirect to="/" />



        if (props.ings) {
            const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
            summary =  
            <React.Fragment>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients={props.ings}
                    onCheckoutCancelled={checkoutCancelledHandler}
                    onCheckoutContinued={checkoutContinuedHandler} />
                <Route 
                    path={props.match.path + "/contact-data"} 
                    component={ContactData} />
            </React.Fragment>
        }

        return (
            <div>
                {summary}
               
            </div>
        )
    
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);