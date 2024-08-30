import React, { useEffect } from "react";
import Logo from "../../assets/rajlo-logo.svg";
import CBDC from "../../assets/CBDC.svg";
import { useBookOrder } from "../../contexts/BookOrderContext";
import { useUserData } from "../../contexts/DataContext";

const BookOrderDetails3 = ({ clickBack, clickForward }) => {
  const { transferType, locations, pickupDateTime, totalDistance, totalTime, drivers, driver } =
    useBookOrder();
  const { userInfo } = useUserData();

  return (
    <div className="order-details3-container">
      <div className="summary">
        <h2>Summary</h2>
        <div className="details">
          <div>
            <h3>SERVICE TYPE</h3>
            <p>Distance</p>
          </div>
          <div>
            <h3>TRANSFER TYPE</h3>
            <p>{transferType}</p>
          </div>
          <div>
            <h3>PICKUP LOCATION</h3>
            <p>
              {locations?.filter((loc) => loc.type === "pickup")[0]?.address}
            </p>
          </div>
          <div>
            <h3>PICKUP TIME, DATE</h3>
            <p>
              {pickupDateTime.time}, {pickupDateTime.date}
            </p>
          </div>
          <div>
            <span>
              <h3>Total Distance</h3>
              <p>{totalDistance}</p>
            </span>
            <span>
              <h3>Total Time</h3>
              <p>{totalTime}</p>
            </span>
          </div>
          <div>
            <h3>DRIVER</h3>
            <p>{drivers.filter((d)=>d.uid === driver)[0]?.fullName}</p>
          </div>
          <span className="price">
            <p>Total</p>
            <p>$0.00</p>
          </span>
          <span className="price">
            <p>
              To pay<i>(20% discount)</i>
            </p>
            <p>$0.00</p>
          </span>
        </div>
      </div>
      <div className="contact-details">
        <div className="heading">
          <h3>Contact Details</h3>
        </div>
        <div className="scan-user">
          <div className="user-info">
            <div>
              <p>First Name*</p>
              <h3>{userInfo?.fullName?.split(" ")[0]}</h3>
            </div>
            <div>
              <p>Last Name*</p>
              <h3>{!userInfo?.fullName?.split(" ")[1] ? "---" : userInfo?.fullName?.split(" ")[1]}</h3>
            </div>
            <div>
              <p>Email address*</p>
              <h3>{userInfo?.email}</h3>
            </div>
            <div>
              <p>Phone Number*</p>
              <h3>{userInfo.phoneNumber}</h3>
            </div>
          </div>
          <div className="scan">
            <img
              src="https://www.pngitem.com/pimgs/m/120-1202125_qr-code-png-transparent-background-qr-code-png.png"
              alt=""
            />
            <h3>Scan to Pay</h3>
          </div>
        </div>
        <p id="pay-with">Pay with</p>
        <div className="img-list">
          <img
            src="https://assets.stickpng.com/images/58482363cef1014c0b5e49c1.png"
            alt=""
          />
          <img
            src="https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-mastercard-logo-png-vector-download-19.png"
            alt=""
          />
          <img src={Logo} alt="" />
          <img src={CBDC} alt="" />
        </div>

        <p id="info">
          *your information cannot be tampered with by inputting your details
        </p>
      </div>
      <div className="buttons">
        <div onClick={() => clickBack()} className="back">
          <p> &#8592; Go back to last Step </p>
        </div>
        <div onClick={() => clickForward()} className="next">
          <p>Continue &#8594;</p>
        </div>
      </div>
    </div>
  );
};

export default BookOrderDetails3;
