import React, { useEffect } from 'react';
import Loading from '../components/loading';

function LogoutPage() {
  useEffect(() => {
    localStorage.clear();
    document.location = '/';
  }, []);

  return (
    <Loading />
  );
}

export default LogoutPage;
