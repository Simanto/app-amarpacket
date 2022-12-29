import {
    Routes,
    Route,
} from "react-router-dom";

// Import Pages
import {ForgotPass, Login, Register, ResetPass} from "./auth/index.js";
import {Dashboard,Packets,Customers,Payments,Profile,SharedLayout, AddPacket, PacketView} from "./merchant/";
import {AdminMerchantEdit, AdminMerchantProfile, AdminMerchants,AdminPackets, AdminPayments, AdminUserAdd, AdminUsers, PaymentsSingle} from "./admin/";
import ProtectedRoutes from "./ProtectedRoutes.js";
import AgentLayout from "./AgentLayout.js";
import AgentDashboard from "./Agent/Dashboard.js";
import AgentPickup from "./Agent/Pickup.js";
import AgentDeliveries from "./Agent/Deliveries.js";
import AgentProfile from "./Agent/Profile.js";
import TestConnection from "./auth/TestConnection.js";
import Error from "./Error.js";

const PageRoutes = () => {
    return (
      // Routes
        <Routes>
          {/* Eror */}
          <Route path={"*"} element={<Error />}></Route>
          {/* Before Authertication */}
          <Route path={"/"} element={<Login />}> </Route>
          <Route path={"/create-account"} element={<Register />}> </Route>
          <Route path={"/forgot-password"} element={<ForgotPass />}> </Route>
          <Route path={"/reset-password"} element={<ResetPass />}> </Route>
          
          {/* // Test connection */}
          <Route path={"/test"} element={<TestConnection />}></Route>

          {/* After Aunthentication */}
          <Route path={"/"} element={
            <ProtectedRoutes>
              <SharedLayout />
            </ProtectedRoutes>
          }>
              {/* Main Pages */}
              <Route path={"dashboard"} element={<Dashboard />}> </Route>
              <Route path={"packets"} element={<Packets />}>
                
              </Route>
              <Route path={"customers"} element={<Customers />}> </Route>
              <Route path={"payments"} element={<Payments />}> </Route>
              <Route path={"payment/:id"} element={<PaymentsSingle />}></Route>

              {/* Profile pages */}
              <Route path={"profile"} element={<Profile />}> </Route>

              {/* Packet */}
              <Route path={"add-packet"} element={<AddPacket />}></Route>
              <Route path={"packets/:id"} element={<PacketView />}></Route>
              <Route path={"packets/edit/:id"} element={<AddPacket />}></Route>


              {/* Admin routes */}
              <Route path={"admin"}>
                <Route path={"dashboard"} element="Admin Dashboard">
                </Route>
                <Route path={"users"} element={<AdminUsers />}>
                </Route>

                <Route path={"user"}>
                  <Route path={"new"} element={<AdminUserAdd />}></Route>
                  <Route path={"edit/:id"} element={<AdminUserAdd />}></Route>
                </Route>

                <Route path={"merchants"} element={<AdminMerchants />}></Route>

                <Route path={"merchant"}>
                  <Route path={":id"} element={<AdminMerchantProfile />}></Route>
                  <Route path={"edit/:id"} element={<AdminMerchantEdit />}></Route>
                </Route>

                <Route path={"packets"} element={<AdminPackets />}></Route>
                <Route path={"payments"} element={<AdminPayments />}></Route>
                <Route path={"payment/:id"} element={<PaymentsSingle />}></Route>
              </Route>

          </Route>
              {/* Agent Routes */}
              <Route path={"agent"} element={
                <ProtectedRoutes>
                  <AgentLayout />
                </ProtectedRoutes>
              }>
                <Route path={"dashboard"} element={<AgentDashboard />} />
                <Route path={"pickup"} element={<AgentPickup />} />
                <Route path={"deliveries"} element={<AgentDeliveries />} />
                <Route path={"profile"} element={<AgentProfile />} />
              </Route>
        </Routes>
    );
}

export default PageRoutes