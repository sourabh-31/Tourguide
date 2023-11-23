import React, {createContext, useContext, useState} from 'react';

const LocationContext = createContext();

export const useLocation = () => {
  return useContext(LocationContext);
};

export const LocationProvider = ({children}) => {
  const [xid, setXid] = useState(0);

  const [uLat, setULat] = useState(0);
  const [uLong, setULong] = useState(0);

  const [dLat, setDLat] = useState(uLat);
  const [dLong, setDLong] = useState(uLong);

  const [imageData, setImageData] = useState('');

  // console.log('xid has changed:', xid);

  // const updateLocation = newLocation => {
  //   setLocation(prevLocation => ({...prevLocation, ...newLocation}));
  // };

  // const updateXid = newXid => {
  //   setXid(newXid);
  // };

  return (
    <LocationContext.Provider
      value={{
        xid,
        setXid,
        uLat,
        setULat,
        uLong,
        setULong,
        dLat,
        setDLat,
        dLong,
        setDLong,
        imageData,
        setImageData,
      }}>
      {children}
    </LocationContext.Provider>
  );
};
