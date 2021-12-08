import axios from 'axios'
import React, { useState, useEffect } from 'react'

function App() {

  const [objects, setObjects] = useState([]);
  const [newsampleName, setsampleName] = useState('');
  const [newcategory, setCategory] = useState('');
  const [newvisits, setVisits] = useState('');

  useEffect(() => {
    axios
      .get('/objects').then((response)=>{
        console.log(response.data);
        setObjects(response.data)
      })
  }, [])



  const createobject = (event) => {
      event.preventDefault();
      axios.post(
          '/objects',
          {
              sampleName:newsampleName,
              category:newcategory,
              visits:newvisits,
          }
      ).then(() => {
        axios
            .get('/objects')
            .then((response)=> {
              setObjects(response.data)
            })
      })
  }

  const handleNewVisits = (event) => {
      setVisits(event.target.value)
  }

  const handleNewCategory = (event) => {
      setCategory(event.target.value)
  }

  const handleNewSampleName = (event) => {
      setsampleName(event.target.value)
  }

  const deleteObject = (event) => {
      axios.delete('/objects/' + event.target.value).then(() =>{
        axios
          .get('/objects')
          .then((response) => {
            setObjects(response.data)
        })
      })
  }

  const updateObject = (event) => {
      event.preventDefault();
      const id = event.target.getAttribute('id');
      axios.put(
          '/objects/' + id,
          {
              sampleName:newsampleName,
              category:newcategory,
              visits:newvisits
          }
      ).then(()=>{
          axios
            .get('/objects/')
            .then((response)=> {
              setObjects(response.data)
            })
      })
  }

  changeupdateObjectsampleName = (event) => {
      this.setState(
          {
              updateObjectsampleName:event.target.value
          }
      )
  }

  changeupdateObjectcategory = (event) => {
      this.setState(
          {
              updateObjectcategory:event.target.value
          }
      )
  }

  changeupdateObjectvisits = (event) => {
      this.setState(
          {
              updateObjectvisits:event.target.value
          }
      )
  }

  return(
    <div>
        <h2>Create object</h2>
        <form onSubmit={createobject}>
            <input onChange={handleNewSampleName} type="text" placeholder="sampleName" /><br/>
            <input onChange={handleNewCategory} type="text" placeholder="category" /><br/>
            <input onChange={handleNewVisits} type="number" placeholder="visits" /><br/>
            <input type="submit" value="Create object" />
        </form>
        <h2>List of objects</h2>
        <ul>
            {
                objects
                .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
                .map(
                    (object, index) => {
                      console.log(object);
                      console.log(index)
                        return <li key={index}>

                            {object.sampleName}: {object.category} : {object.visits}

                            <button value={object.id} onClick={deleteObject}>DELETE</button>

                            <form id={object.id} onSubmit={updateObject}>
                                <input onChange={handleNewSampleName} type="text" placeholder="sampleName"/><br/>
                                <input onChange={handleNewCategory} type="text" placeholder="category"/><br/>
                                <input onChange={handleNewVisits} type="number" placeholder="visits" /><br/>
                                <input type="submit"  value="Update object"/>
                            </form>
                        </li>
                    }
                )
            }
        </ul>
    </div>
  )
}

export default SecondApp;
