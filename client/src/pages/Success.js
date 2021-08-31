import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
// import { SET_SUBSCRIBED } from '../utils/mutations';


function Success() {
  // const [addOrder] = useMutation(SET_SUBSCRIBED);

  useEffect(() => {
    async function subscribe() {
      setTimeout(() => {
        window.location.assign('/Calendar');
      }, 3000);
    }

    subscribe();
  }, []);

  return (
    <div>
      <h1>Success!</h1>
      <h2>Thank you for your purchase!</h2>
      <h2>You will now be redirected to the home page</h2>
    </div>
  );
}

export default Success;
