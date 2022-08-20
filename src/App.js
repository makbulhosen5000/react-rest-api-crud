
import './App.css';
import React, { useEffect, useState } from 'react';
import UserForm from './Components/UserForm';

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
        setIsLoading(false);
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
   
    //for user delete
  const handleDelete =(id)=>{
    fetch(URL +  `/${id}`, {method:'DELETE'})
    .then((res)=>{
     if(!res.ok){
      throw Error("Could Not Delete");
     }else{
      return res.json()
     }
    })
    .then((data)=>{
      setUsers(data.users);
      setIsLoading(false);
    })
    .catch((err)=>{
      setError(err.message)
    })
    .finally(()=>{
      setError(false);
    })
  }
  const addUser=(user)=>{
    fetch(URL, {method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(user)
  })
    .then((res)=>{
     if(res.status===201){
      getAllUsers();
      throw Error("Could Not Created");
     }else{
      throw new Error("Could not Created new User");
     }
    })
    .then((data)=>{
      setUsers(data.users);
      setIsLoading(false);
    })
    .catch((err)=>{
      setError(err.message)
    })
  } 
  return (
    <div className="App">
            <h1> User Management App </h1>
            {isLoading && <h2>Loading....</h2>}
            {error &&  <h2>Error</h2>}
             
             <UserForm btnText="Add User" handleSubmitData={addUser} />

           <section>
           {users && users.map((user)=>{
              const {id,username,email} = user;
              return(
                <article key={id} className="card">
                  <p>{username}</p>
                  <p>{email}</p>
                  <button className='btn'>Add</button>
                  <button className='btn' onClick={()=>{handleDelete(id)}}>Delete</button>
                </article>
              )
            })}
           </section>
    </div>
  );
}

export default App;
