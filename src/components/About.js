import React,{useContext,useEffect} from 'react';
import noteContext from '../context/Notes/noteContext';

export const About = () => {
  const a = useContext(noteContext);
  useEffect(()=>{
    a.update()
    // eslint-disable-next-line
  },[])
  return <div>
      <h1>this is about us {a.state.name} {a.state.class}</h1>
  </div>;
};
