import React from 'react'
import styled from 'styled-components'

function ComplaintUpdate({complaint, updateComplaint}) {
  return (
    <div>
        <h2> Complaint Update </h2> 
        <pre>
        {JSON.stringify(complaint, null, 2)}
        </pre>
        <SECTION>
            <span> Complaint ID :</span> <span>{complaint.complaintID}  </span>
            <span> Station :</span> <span>{complaint.stationId} - {complaint.stationName} </span>
            <span>Operator Detials :</span> <span>{complaint.Operatorname} - {complaint.phone} </span>
        </SECTION>

        <button onClick={updateComplaint}> Update</button>
        
    </div>
  )
}

const SECTION = styled.section` 
    text-align: left;
    display: grid;
    grid-template-columns: 1fr 2fr;
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.1);

    border: 3px solid #ccc;    
    padding: 10px;

`

export default ComplaintUpdate