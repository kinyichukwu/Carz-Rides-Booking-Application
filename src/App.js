import { Route, Routes } from "react-router-dom";
// toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// AOS
import AOS from "aos";
import "aos/dist/aos.css";
import { Home } from "./pages/Home";
import { Nav } from "./components/Nav";
import Signup from "./pages/Signup";
import SuccessfulRide from "./components/SuccessfulRide";
import BookOrder from "./components/book-order-pages/BookOrder";
import { RateCustomer } from "./pages/RateCustomer";
import Wallet from "./pages/Wallet";
import MyRides from "./pages/MyRides";
import Messages from "./pages/Messages";
import MessageSearch from "./pages/MessageSearch";
import AccountSettings from "./pages/AccountSettings";
import Profile from "./pages/Profile";
import { Support } from "./pages/Support";
import UserProvider from "./contexts/UserContext";
import SignIn from "./pages/Signin";
import DataProvider from "./contexts/DataContext";
import { ChatContextProvider } from "./contexts/ChatContext";
import MapProvider from "./contexts/MapContext";
import BookOrderProvider from "./contexts/BookOrderContext";
import { DriverContextProvider } from "./contexts/DriverContext";
import HomepageNotification from "./components/homepage-components/homepage-notification-component";
import "./style.css";

function App() {
  return (
    <>
      <UserProvider>
        <DataProvider>
          <MapProvider>
            <ChatContextProvider>
              <BookOrderProvider>
                <DriverContextProvider>
                  <Nav />
                  <HomepageNotification />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/ride-success" element={<SuccessfulRide />} />
                    <Route path="/book-order" element={<BookOrder />} />
                    <Route path="/messages/*" element={<Messages />} />
                    <Route path="/message-search" element={<MessageSearch />} />
                    <Route
                      path="/account-settings"
                      element={<AccountSettings />}
                    />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/my-rides" element={<MyRides />} />
                    <Route path="/rate-customer" element={<RateCustomer />} />
                    <Route path="/Wallet" element={<Wallet />} />
                  </Routes>
                </DriverContextProvider>
              </BookOrderProvider>
            </ChatContextProvider>
          </MapProvider>
        </DataProvider>
      </UserProvider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
