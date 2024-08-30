import React from "react";

const Transaction = ()=>{
    return(
        <div className="transaction">
          <div className="destination">
            <div className="from">
              <div></div>
              <p>54, Admila Rd, CA, USA</p>
            </div>
            <div className="to">
              <div></div>
              <p>10, Elila Rd, CA, USA</p>
            </div>
          </div>
          <div className="fee">
            <p>Fee:</p>
            <h3>$590</h3>
          </div>
          <div className="date">
            <p>Date:</p>
            <h3>11/12/2023</h3>
          </div>
          <div className="time">
            <p>Time:</p>
            <h3>10:23:14 pm</h3>
          </div>
        </div>
    )
}

export default Transaction;