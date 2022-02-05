import React,{useContext,useEffect} from 'react';
import TempContext from '../context/Notes/tempContext';

export const About = () => {
  const a = useContext(TempContext)
  console.log(a);
  return <div>
      <h1>this is about page </h1>
  </div>;
};
