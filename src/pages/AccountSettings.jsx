import React, { useState } from "react";
import MessagesNav from "../components/MessagesNav";

function AccountSettings() {
  const [status, setStatus] = useState("");

  const toggleStatus = () => {
    const stat = document.querySelector("#status");
    if (!stat.checked) {
      setStatus("active");
      console.log(status);
    } else {
      setStatus("inactive");
      console.log(status);
    }
  };

  return (
    <div className="messagepage">
      <MessagesNav />

      <div className="mflex">
        <div className="account-settings">
          <div className="settings">
            <h1>Settings</h1>
            <div className="settings--sub">
              <h3>Dark Theme</h3>
              <div>
                <input
                  type="checkbox"
                  className="toggle"
                  id="status"
                  onClick={() => toggleStatus()}
                />
              </div>
            </div>
            <div className="settings--sub">
              <h3>Hide Username</h3>
              <div>
                <input
                  type="checkbox"
                  className="toggle"
                  id="status"
                  onClick={() => toggleStatus()}
                />
              </div>
            </div>
            <div className="settings--sub">
              <h3>Hide Phone Number</h3>
              <div>
                <input
                  type="checkbox"
                  className="toggle"
                  id="status"
                  onClick={() => toggleStatus()}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
