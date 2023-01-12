import React from "react";

const ReadOnlyRow = (
  {exercise, handleEditClick, handleDeleteClick}) => {
  return (
    <tr>
      <td>{exercise.exerciseName}</td>
      <td>{exercise.set1}</td>
      <td>{exercise.set2}</td>
      <td>{exercise.set3}</td>
      <td>{exercise.set4}</td>
      <td>{exercise.set5}</td>
      <td>
        <button 
          type="button"
          onClick={(event) => handleEditClick(event, exercise)}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => handleDeleteClick(exercise.id)}
        >
          Delete
        </button>

      </td>
    </tr>
  )
}

export default ReadOnlyRow;