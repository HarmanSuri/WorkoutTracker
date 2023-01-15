import React, {useEffect, useState, Fragment} from 'react';
import {nanoid} from 'nanoid';
import './App.css';
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';

function App() {

  const createExercise = ((newExercise) => {
    fetch(`/api/${nanoid()}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body:JSON.stringify(newExercise)
    }).then(
      response => response.json()
    ).then(getExercises())
  });

  const [exercises, setExercises] = useState([{}]);

  const getExercises = (() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setExercises(data)
      }
    )
  });

  useEffect(() => {
    getExercises()
  }, []);

  const [addFormData, setAddFormData] = useState({
    exerciseName: "",
    set1: "",
    set2: "",
    set3: "",
    set4: "",
    set5: ""
  });

  const [editFormData, setEditFormData] = useState({
    exerciseName: "",
    set1: "",
    set2: "",
    set3: "",
    set4: "",
    set5: ""
  });

  const [editExerciseId, setEditExerciseId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = {...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...editFormData};
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newExercise = {
      id: nanoid(),
      exerciseName: addFormData.exerciseName,
      set1: addFormData.set1,
      set2: addFormData.set2,
      set3: addFormData.set3,
      set4: addFormData.set4,
      set5: addFormData.set5
    };
    createExercise(newExercise);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedExercise = {
      id: editExerciseId,
      exerciseName: editFormData.exerciseName,
      set1: editFormData.set1,
      set2: editFormData.set2,
      set3: editFormData.set3,
      set4: editFormData.set4,
      set5: editFormData.set5
    };

    const newExercises = [...exercises];
    
    const index = exercises.findIndex((exercise) => exercise.id === editExerciseId);

    newExercises[index] = editedExercise;

    setExercises(newExercises);
    setEditExerciseId(null);
  };

  const handleEditClick = (event, exercise) => {
    event.preventDefault();
    setEditExerciseId(exercise.id);

    const formValues = {
      exerciseName: exercise.exerciseName,
      set1: exercise.set1,
      set2: exercise.set2,
      set3: exercise.set3,
      set4: exercise.set4,
      set5: exercise.set5
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditExerciseId(null);
  };
  
  const handleDeleteClick = (exerciseId) => {
    const newExercises = [...exercises];

    const index = exercises.findIndex((exercise) => exercise.id === exerciseId);

    newExercises.splice(index, 1);

    setExercises(newExercises)
  };

  return (
    <div className="App">
      <form onSubmit={handleEditFormSubmit}>
        <table border={1}>
          <thead>
            <tr>
              <th>Exercise Name</th>
              <th>Set 1</th>
              <th>Set 2</th>
              <th>Set 3</th>
              <th>Set 4</th>
              <th>Set 5</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              exercises.map((exercise)=> (
                <Fragment>
                  {editExerciseId === exercise.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      exercise={exercise}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment> 
              ))
            }
            
          </tbody>
        </table>
      </form>
      <h2>Add an Exercise</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="exerciseName"
          required="required"
          placeholder="Enter exercise name"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="set1"
          required="required"
          placeholder="Enter set one"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="set2"
          required="required"
          placeholder="Enter set two"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="set3"
          required="required"
          placeholder="Enter set three"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="set4"
          required="required"
          placeholder="Enter set four"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="set5"
          required="required"
          placeholder="Enter set five"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
