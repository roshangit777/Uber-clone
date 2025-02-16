import React from "react";

const Getloc = () => {
  function location(position) {
    console.log(position);
  }

  function gotError() {
    console.log("got some error");
  }
  const getLoc = () => {
    navigator.geolocation.getCurrentPosition(location, gotError);
  };
  return (
    <div>
      <h1>Get location</h1>
      <button onClick={getLoc}>click</button>
    </div>
  );
};

export default Getloc;
