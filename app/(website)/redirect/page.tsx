'use client';

import React, { useEffect } from 'react'

const Redirect = () => {
  useEffect(() => {
      const queryParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = queryParams.get("access_token");
      window.location.replace(window.location.origin + "/overlay?" + "access_token=" + accessToken);
  }, [])
  return (
    <div></div>
  );
}

export default Redirect