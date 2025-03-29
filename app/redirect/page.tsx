'use client';

import React from 'react'

const Redirect = () => {
  return (
    <script>
        let queryParams = new URLSearchParams(window.location.hash.substring(1));
        let accessToken = queryParams.get("access_token");
        window.location.replace(window.location.origin + "/overlay?" + "access_token=" + accessToken);
    </script>
  )
}

export default Redirect