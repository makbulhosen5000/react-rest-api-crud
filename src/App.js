
import './App.css';
import React, { useEffect, useState } from 'react';

const URL = " https://rest-api-without-db.herokuapp.com/users";

function App() {
     const [users,setUsers] = useState(null);
     const [isLoading,setIsLoading] = useState(true);
     const [error,setError] = useState(null);
    

    const getAllUsers= () =>{
      fetch(URL)
      .then((res)=>{
       if(!res.ok){
        throw Error("Could Not Fetch");
       }else{
        return res.json()
       }
      })
      .then((data)=>{
        setUsers(data.users);
      })
      .catch((err)=>{
        setError(err.message)
      })
      .finally(()=>{
        setError(false);
      })
    }

     useEffect(()=>{
      getAllUsers();
     }, []);

  return (
    <div className="App">
            app
    </div>
  );
}

export default App;
