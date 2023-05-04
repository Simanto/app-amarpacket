import React,{useReducer,useContext} from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import reducer from "./reducers";
import axios from "axios";
import { readString } from 'react-papaparse';
import ListArea from "../assets/doc/area.csv";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");


const initialState = {
    isLoading: false,
    isEditing: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    token: token,
    user: user ? JSON.parse(user) : null,
    data: [],
    areaList:[],
    allCustomer: [],
    
    merchant_name: "",
    merchant_email: "",
    merchant_isVerified: "",

    // Stats
    deleveries_out_for_delivery: "",
    deleveries_total_packets: "",
    deleveries_total_delivered: "",
    deleveries_total_returned: "",
    payments_out_for_delivery:"",
    payments_total_paid:"",
    payments_in_process:"",
    payments_due:"",
    last_invoices:"",

    // User Data
    allUser:"",
    userID:"",
    user_fullname:"",
    user_email:"",
    user_password:"",
    user_phone:"",
    user_designation:"",
    user_blood_group: "",
    user_employee_id: "",
    user_isActive: "",
    user_role:"",
    user_area: "",
    user_address:"",
    user_emergency_contact_name: "",
    user_emergency_contact_phone:"",
    user_emergency_contact_relation:"",
    user_emergency_contact_area:"",
    user_emergency_contact_address:"",

    // Merchant Data
    allMerchants:[],
    singleMerchant: "",
    merchantID: "",
    merchant_business_name:"",
    merchant_business_phone:"",
    merchant_product_type: "",
    merchant_base_charge: "" || 50,
    merchant_pickup_area:"",
    merchant_pickup_address:"",
    merchant_fb_page:"",
    merchant_bank_name:"",
    merchant_branch_name: "",
    merchant_account_holder_name: "",
    merchant_account_number:"",
    merchant_bikash_number:"",
    merchant_nagad_number:"",
    merchant_notes:"",

    // merchant password
    merchant_password:"",
    merchant_confirm_password:"",

    // Packet Data
    allPackets:[],
    packetsForDelivery:"",
    packetsDelivered:"",
    packetsReturned:"",
    singlePacket:"",
    editPacketID: "",
    packet_trackingID:"",
    packet_customerName: "",
    packet_customerPhone: "",
    packet_customerCity: "dhaka",
    packet_customerArea: "",
    packet_customerAddress: "",
    packet_merchantInvoice: "",
    packet_collectionAmount: "",
    packet_costPrice: "",
    packet_delivery_charge: "",
    packet_weight: "",
    packet_specialInstruction: "",
    packet_merchant:"",
    packet_merchant_phone:"",
    packet_pcikup_area:"",
    packet_pcikup_address:"",
    packet_status:"",
    packet_status_message:"",
    packet_status_category:"",
    packet_pickup_agentID:"",
    packet_delivery_agentID:"",

    // Agent
    allAgent:"",


    // Table Filter 
    // Packets
    filter_global_search:"",
    filter_packet_status:"",
    filter_packet_pickup_man:"",
    filter_packet_delivery_man:"",
    filter_packet_merchant:"",
    filter_start_date: "",
    filter_end_date: "",

    // Invoices
    invoices:"",
    invoice_packets:"",
    invoice_createdAt:"",
    invoiceID:"",
    invoice_status:"",
    invoice_trackingID:"",
    invoice_merchant_business_name:"",
    invoice_merchant_business_phone:"",
    invoice_merchant_business_address:"",
    invoice_total_payables:"",
}

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [cookie, setCookie, removeCookie] = useCookies(["access_token"]);
    
    // Setup Axios
    const axiosFetch = axios.create();

    axiosFetch.interceptors.request.use( 
        (config) => {
            // Set header
            config.headers.common["Authorization"] = `Bearer ${cookie}`
            return config;
      }, (error) => {
            return Promise.reject(error);
    });

    axiosFetch.interceptors.response.use( 
        (response) => {
            return response;
        }, (error) => {
            return Promise.reject(error);
    });

    const addToLocalStorage = (user,token) =>{
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    }

    const removeFromLocalStorage = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    // Test Connection
    const testConnection = async () =>{
        try {
            const res = await axiosFetch.get("/");
            return
        } catch (err) {
            dispatch({type: "ERROR", payload: {msg:err.response.data.message}});
        }
    }

    // Merchant Registration
    const registerMerchant = async (currentUser) =>{
        dispatch({type:"BEGIN"})
        try {
            const res = await axiosFetch.post("/api/v1/auth/merchant/register", currentUser);
            const token = res.data.token;
            const user =  res.data.user;

            dispatch({type: "SUCCESS", payload:{user, token}});

            // Set Cookie
            let expires = new Date()
            expires.setTime(expires.getTime() + (res.data.token.expires_in * 3000))
            setCookie("access_token", {token}, { path: "/",  expires})

            // Add data to localstorage
            addToLocalStorage(user,token);

            setTimeout(() => {
                dispatch({type:"CLEAR_ALERT"})
            }, 1000);

            return

        } catch (err) {
            dispatch({type: "ERROR", payload: {msg:err.response.data.message}});
        }
    }

    // Login Registration
    const login = async (currentUser) =>{
        dispatch({type:"BEGIN"})
        try {
            const res = await axiosFetch.post("/api/v1/auth/login", currentUser);
            const token = res.data.token;
            const user =  res.data.user;
            
            dispatch({type: "SUCCESS", payload: {user,token}});
            
            // Add data to localstorage
            addToLocalStorage(user,token);
           
            // Set Cookie
            setCookie("access_token", token, { path: "/"})

            setTimeout(() => {
                dispatch({type:"CLEAR_ALERT"})
            }, 1000);
            
            return

        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }
    }

    const logOut = () =>{
        dispatch({type:"LOGOUT"})
        removeFromLocalStorage();
        removeCookie("access_token", {path:'/'});
        dispatch({type:"CLEAR_VALUES"})
    }

    // Get Merchant Profile
    const getMerchant = async () =>{
        dispatch({type:"ASYNC_REQ_BEGIN"})
        try {
            const res = await axiosFetch.get("/api/v1/merchant/get");
            const {data} = res
            dispatch({type:"GET_DATA_SUCESS", payload: data});
            dispatch({type: "SET_MERCHANT_PROFILE"});
            setTimeout(() => {
                dispatch({type:"CLEAR_ALERT"})
            }, 1000);
            return
        } catch (err) {
            logOut();
        }
    }

    // Get Merchant Profile
    const getStaff = async () =>{
        dispatch({type:"ASYNC_REQ_BEGIN"})
        try {
            const res = await axiosFetch.get("/api/v1/admin/get");
            const {data} = res
            dispatch({type:"GET_DATA_SUCESS", payload: data});

            return
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }

    // Add or Update Payment Method Bank
    const addPaymentMethodBank = async () => {
        dispatch({type:"ASYNC_REQ_BEGIN"})
        const {
            merchant_bank_name,
            merchant_branch_name,
            merchant_account_holder_name,
            merchant_account_number
        } = state;
        try {
            await axiosFetch.put("/api/v1/merchant/add/bank",{
                merchant_bank_name,
                merchant_branch_name,
                merchant_account_holder_name,
                merchant_account_number
            });

            dispatch({type:"ASYNC_SUCCESS", payload: {msg:"Thank you, bank details has saved"}})

        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }


        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }

    const addPaymentMethodMFS = async () => {
        dispatch({type:"ASYNC_REQ_BEGIN"})
        const {merchant_bikash_number, merchant_nagad_number} = state;
        try {
            
            await axiosFetch.put("/api/v1/merchant/add/mfs", {
                merchant_bikash_number,
                merchant_nagad_number
            });

            dispatch({type:"ASYNC_SUCCESS", payload: {msg:"Thank you, payment details has been saved"}});

        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }
    // ************************************
    //              Packets
    // ************************************

    // Add New Pcket
    const addPakcet = async (newPacket) =>{
        dispatch({type:"ADD_PACKET_BEGIN"})
        const { 
            packet_customerName, 
            packet_customerPhone, 
            packet_customerCity, 
            packet_customerArea, 
            packet_customerAddress, 
            packet_merchantInvoice,
            packet_collectionAmount,
            packet_costPrice,
            packet_weight,
            packet_specialInstruction,
            packet_delivery_charge,
        } = state

        try {
            await axiosFetch.post("/api/v1/packets/new", {
                packet_customerName, 
                packet_customerPhone, 
                packet_customerCity, 
                packet_customerArea, 
                packet_customerAddress, 
                packet_merchantInvoice,
                packet_collectionAmount,
                packet_costPrice,
                packet_weight,
                packet_specialInstruction,
                packet_delivery_charge,
            });

            dispatch({type:"ADD_PACKET_SUCCESS"});
            
            setTimeout(() => {
                dispatch({type: "CLEAR_PACKET_VALUES"});
            }, 3000);

        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 3000);
    }

    // Get All Packet
    const getAllPacket = async () =>{

        dispatch({type:"GET_PACKETS_BEGIN"})
        
        try {
            const {data} = await axiosFetch.get("/api/v1/packets/all");

            dispatch({type:"GET_PACKETS_SUCCESS",payload: {data}})

        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }

    const packetOutForDelivery = async () =>{
        dispatch({type:"GET_PACKETS_BEGIN"})
        
        try {
            const {data} = await axiosFetch.get("/api/v1/packets/out-for-delivery");
            const {packets} = data[0];
            dispatch({type: "FILTER_PACKET_DELIVERY", payload: {packets}})

        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }
        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }

    const getPacketDelivered = async () =>{
        dispatch({type:"GET_PACKETS_BEGIN"})
        try {
            const {data} = await axiosFetch.get("/api/v1/packets/delivered");
            const {packets} = data[0];
            dispatch({type: "FILTER_PACKET_DELIVERED", payload: {packets}})
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }
        
        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }

    const getPacketReturned = async () =>{
        dispatch({type:"GET_PACKETS_BEGIN"})
        try {
            const {data} = await axiosFetch.get("/api/v1/packets/returned");
            const {packets} = data[0];
            dispatch({type: "FILTER_PACKET_RETURNED", payload: {packets}})
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }
    
    const getAllPacketAdmin = async () =>{

        dispatch({type:"GET_PACKETS_BEGIN"})
        
        try {
            const {data} = await axiosFetch.get("/api/v1/admin/packets/all");
            dispatch({type:"GET_PACKETS_SUCCESS",payload: {data}})
            
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }

    const deletePacket = async (id) =>{
        dispatch({type:"DELETE_PACKET_BEGIN"})
        try {
            const res =  await axios.delete(`/api/v1/admin/packet/delete/${id}`)
            const {data} = res
            dispatch({type:"DELETE_PACKET_SUCCESS", payload: {data}});

            getAllPacketAdmin();

        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }
        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 3000);
    }

    // Get Single Packet
    const getPacket = async (packetid) =>{

        dispatch({type:"CLEAR_PACKET"})
        dispatch({type:"GET_PACKET_BEGIN"})

        try {
            const {data} = await axiosFetch.get(`/api/v1/packets/${packetid}`)
            const packet = data[0];
            dispatch({type:"GET_PACKET_SUCCESS", payload: {packet}})
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }

    const setAreaList = () =>{

        dispatch({type:"SET_AREA_BEGIN"})

        const papaConfig = {
            complete: (results, file) => {
                const {data} = results;
                const options = data.map((area,index) => ({
                    "value" : index.toString(),
                    "label" : area.toString()
                }))
                dispatch({type:"SET_AREA", payload: {options}})
            },
            download: true,
            error: (error, file) => {
              console.log('Error while parsing:', error, file);
            },
        };

        readString(ListArea, papaConfig);

        dispatch({type:"SET_AREA_SUCCESS"})

    }

    const handleChange = ({name,value}) =>{
        dispatch({type: "HANDLE_CHANGE", payload: {name, value}})
    }

    const setEditPacket = (id) =>{
        dispatch({type: "CLEAR_PACKET_VALUES"})
        dispatch({type:"SET_EDIT_PACKET", payload: {id}})
    }

    const editPacket = async () =>{
        dispatch({type:"EDIT_PACKET_BEGIN"})

        const { 
            packet_customerName, 
            packet_customerPhone, 
            packet_customerCity, 
            packet_customerArea, 
            packet_customerAddress, 
            packet_merchantInvoice,
            packet_collectionAmount,
            packet_costPrice,
            packet_weight,
            packet_specialInstruction,
            packet_delivery_charge,
        } = state

        try {
            await axiosFetch.patch(`/api/v1/packets/edit/${state.editPacketID}`,{
                packet_customerName, 
                packet_customerPhone, 
                packet_customerCity, 
                packet_customerArea, 
                packet_customerAddress, 
                packet_merchantInvoice,
                packet_collectionAmount,
                packet_costPrice,
                packet_weight,
                packet_delivery_charge,
                packet_specialInstruction,
            })
            dispatch({type: "EDIT_PACKET_SUCCESS"})
            
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 3000);
    }

    const updatePacketStatus = async () =>{
        dispatch({type:"EDIT_STATUS_BEGIN"})
        const {
            editPacketID,
            packet_status,
            packet_status_category,
            packet_status_message,
            packet_pickup_agentID,
            packet_delivery_agentID
        } = state;

        try {
            const {data} = await axiosFetch.patch(`/api/v1/admin/status/update/${state.editPacketID}`,{
                editPacketID,
                packet_status,
                packet_status_category,
                packet_status_message,
                packet_pickup_agentID,
                packet_delivery_agentID
            })

            getAllPacketAdmin();

            dispatch({type:"EDIT_STATUS_SUCCESS", payload: {data}})

        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }

    const getAllCustomers = async ()=>{

        dispatch({type: "GET_CUSTOMERS_BEGIN"})

        try {
            const {data} = await axiosFetch.get("/api/v1/customer/all")
            dispatch({type:"GET_CUSTOMERS_SUCCESS", payload: {data}})
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }
    }

    const getAllMerchants = async () =>{
        dispatch({type: "ASYNC_REQ_BEGIN"})
        try {
            const {data} = await axiosFetch.get("/api/v1/admin/merchants");
            dispatch({type: "GET_ALL_MERCHANT_SUCCESS", payload: {data}});
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }

    const setMerchantID =(id) =>{
        dispatch({type: "CLEAR_VALUES"})
        dispatch({type:"SET_EDIT_MERCHANT", payload: {id}})
    }

    const getMerchantByID = async (id) =>{
        dispatch({type:"GET_MERCHANT_BEGIN"})
        try {
            dispatch({type: "CLEAR_VALUES"})
            const {data} = await axiosFetch.get(`/api/v1/admin/merchant/${id}`);
            dispatch({type:"GET_MERCHANT_SUCCESS", payload: {data}});
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

    }

    const getDeliveryStats = async (date) =>{
        dispatch({type: "GET_STATS_BEGIN"})
        try {
            const {data} = await axiosFetch.get("/api/v1/packets/stats")
            dispatch({type:"SET_STATS", payload:{data}});
            dispatch({type: "GET_STATS_SUCCESS"});
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }

    const UpdateMerchant = async () =>{

        dispatch({type:"EDIT_MERCHANT_BEGIN"})

        const {
            merchantID, 
            merchant_name,
            merchant_email,
            merchant_isVerified,
            merchant_business_name,
            merchant_business_phone,
            merchant_product_type,
            merchant_base_charge,
            merchant_pickup_area,
            merchant_pickup_address,
            merchant_fb_page,
            merchant_bank_name,
            merchant_branch_name,
            merchant_account_holder_name,
            merchant_account_number,
            merchant_bikash_number,
            merchant_nagad_number,
            merchant_notes,
        } = state

        try {
            await axiosFetch.patch(`/api/v1/admin/merchant/update/${merchantID}`,{
                merchant_name,
                merchant_email,
                merchant_isVerified,
                merchant_business_name,
                merchant_business_phone,
                merchant_product_type,
                merchant_base_charge,
                merchant_pickup_area,
                merchant_pickup_address,
                merchant_fb_page,
                merchant_bank_name,
                merchant_branch_name,
                merchant_account_holder_name,
                merchant_account_number,
                merchant_bikash_number,
                merchant_nagad_number,
                merchant_notes,
            });

            dispatch({type: "EDIT_MERCHANT_SUCCESS"})
            
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }

    const merchantChangePassword = async (passwords) =>{
        const {merchantID} = state
        try {
            
            await axiosFetch.patch(`/api/v1/merchant/changepassword/${merchantID}`, passwords);

            dispatch({type: "CHANGE_PASSWORD_SUCCESS"});

            setTimeout(() => {
                logOut();
            }, 3000);

        } catch (err) {

            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }

    const resetPassword = async (resetData) =>{
        try {
            const res = await axiosFetch.post("/api/v1/auth/reset-password", resetData )
            dispatch({type:"ASYNC_SUCCESS", payload: {msg: res.data}})
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }
        
        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 10000);
    }

    const adminAddUser = async () =>{
        dispatch({type:"ADD_USER_BEGIN"})

        const {
            user_fullname, 
            user_email,
            user_password,
            user_phone,
            user_designation,
            user_blood_group,
            user_employee_id,
            user_isActive,
            user_role,
            user_area,
            user_address,
            user_emergency_contact_name,
            user_emergency_contact_phone,
            user_emergency_contact_relation,
            user_emergency_contact_area,
            user_emergency_contact_address,
        } = state

        try {
            await axios.post('/api/v1/admin/user/add',{
                user_fullname,
                user_email,
                user_password,
                user_phone,
                user_designation,
                user_blood_group,
                user_employee_id,
                user_isActive,
                user_role,
                user_area,
                user_address,
                user_emergency_contact_name,
                user_emergency_contact_phone,
                user_emergency_contact_relation,
                user_emergency_contact_area,
                user_emergency_contact_address,
            })

            dispatch({type:"ADD_USER_SUCCESS"})
            dispatch({type:"CLEAR_VALUES"})

        } catch (err) {

            if(err.response.data.status === 403){
                logOut()
                dispatch({type:"ERROR", payload: {msg: "Seesion expired! Please login again."}})
                return
            }

            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }

    const adminAllUser = async () =>{
        dispatch({type:"GET_USERS_BEGIN"});
        try {
            const {data} = await axiosFetch.get("/api/v1/admin/user/all");
            dispatch({type:"GET_USERS_SUCCESS", payload:{data}});
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }

    const setEditUser = (id) =>{
        dispatch({type: "CLEAR_USER_VALUES"})
        dispatch({type:"SET_EDIT_USER", payload: {id}})
    }

    const editUser = async () =>{
        dispatch({type:"EDIT_USER_BEGIN"})
        const {
            userID,
            user_fullname,
            user_email,
            user_password,
            user_phone,
            user_designation,
            user_blood_group,
            user_employee_id,
            user_isActive,
            user_role,
            user_area,
            user_address,
            user_emergency_contact_name,
            user_emergency_contact_phone,
            user_emergency_contact_relation,
            user_emergency_contact_area,
            user_emergency_contact_address,
        } = state


        try {
            await axiosFetch.patch(`/api/v1/admin/user/edit/${state.userID}`,{
                user_fullname,
                user_email,
                user_password,
                user_phone,
                user_designation,
                user_blood_group,
                user_employee_id,
                user_isActive,
                user_role,
                user_area,
                user_address,
                user_emergency_contact_name,
                user_emergency_contact_phone,
                user_emergency_contact_relation,
                user_emergency_contact_area,
                user_emergency_contact_address,
            })
            
            dispatch({type:"EDIT_USER_SUCCESS"})

        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }

    const getAllAgent = async () =>{
        dispatch({type: "GET_AGENT_BEGIN"})
        try {
            const {data} = await axiosFetch.get("/api/v1/admin/agent/all");
            const options = data.map((agent) => ({
                "value" : agent.agentID.toString(),
                "label" : agent.agent_name.toString(),
                "phone" : agent.agent_phone.toString(),
            }))
            dispatch({type:"GET_AGENT_SUCCESS", payload:{options}})
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }

    const resetFilterValues = () =>{
        dispatch({type: "RESET_FILTER"})
    }

    const adminCreateInvoice = async () =>{
        dispatch({type:"CREATE_INVOICES_BEGIN"});
        try {
            await axiosFetch.get("/api/v1/admin/invoice/create");
            adminGetAllInvoice()
            dispatch({type:"CREATE_INVOICES_SUCCESS"})
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 3000);
    }

    const adminGetAllInvoice = async () =>{
        dispatch({type: "GET_INVOICES_BEGIN"});
        try {
            const {data} = await axiosFetch.get("/api/v1/admin/invoice/all");
            dispatch({type: "GET_INVOICES_SUCCESS", payload:{data}})
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 1000);
    }

    const setEditInvoice = (id) =>{
        dispatch({type: "CLEAR_VALUES"})
        dispatch({type:"SET_EDIT_INVOICE", payload: {id}})
    }

    const updateInvoice = async () =>{
        dispatch({type: "UPDATE_INVOICE_BEGIN"})
        const {
            invoiceID,
            invoice_status,
            invoice_trackingID,
        } = state

        try {
            await axiosFetch.patch(`/api/v1/admin/invoice/update/${invoiceID}`,{
                invoice_status,
                invoice_trackingID,
            })
            adminGetAllInvoice();
            dispatch({type: "UPDATE_INVOICE_SUCCESS"})
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 3000);
    }

    const admingGetInvoicePacketsByID = async () =>{
        const {invoiceID} = state;
        dispatch({type: "GET_INVOICE_BEGIN"})
        try {
            const {data} = await axiosFetch.get(`/api/v1/admin/invoice/packets/${invoiceID}`);
            dispatch({type: "GET_INVOICE_SUCCESS", payload: {data}});
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }

        setTimeout(() => {
            dispatch({type:"CLEAR_ALERT"})
        }, 3000);
    }


    const merchantGetAllInvoice = async () =>{
        dispatch({type: "GET_INVOICES_BEGIN"});
        try {
            const {data} = await axiosFetch.get("/api/v1/invoice/all");
            dispatch({type: "GET_INVOICES_SUCCESS", payload:{data}})
        } catch (err) {
            dispatch({type:"ERROR", payload: {msg:err.response.data.message}});
        }
    }


    return (
        <AppContext.Provider value={{
            ...state,
            // Test connection
            testConnection,
            
            // Auth
            registerMerchant,
            login,
            logOut,
            resetPassword,

            // Merchant
            getMerchant,
            addPaymentMethodBank,
            addPaymentMethodMFS,
            getDeliveryStats,
            merchantChangePassword,

            // Staff
            getStaff,

            // list
            setAreaList,
            
            // Packet
            addPakcet,
            getAllPacket,
            getAllPacketAdmin,
            getPacket,
            handleChange,
            setEditPacket,
            editPacket,
            packetOutForDelivery,
            getPacketDelivered,
            getPacketReturned,

            // Customer
            getAllCustomers,

            // Invoice
            merchantGetAllInvoice,

            // Admins
            getAllMerchants,
            setMerchantID,
            getMerchantByID,
            UpdateMerchant,
            adminAllUser,
            adminAddUser,
            setEditUser,
            editUser,
            getAllAgent,
            updatePacketStatus,
            resetFilterValues,
            adminCreateInvoice,
            adminGetAllInvoice,
            setEditInvoice,
            updateInvoice,
            admingGetInvoicePacketsByID,


            // Global
            deletePacket,
            
            // Results
            dispatch

        }}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () =>{
    return useContext(AppContext);
}

export {AppProvider, initialState, useAppContext}