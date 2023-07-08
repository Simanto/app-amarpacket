import { 
    CLEAR_ALERT, 
    DISPLAY_ALERT,
    BEGIN,
    DONE,
    SUCCESS,
    LOGOUT,
    ERROR,
    ASYNC_REQ_BEGIN,
    GET_DATA_SUCESS,
    ASYNC_SUCCESS,
    CLEAR_VALUES,
    CLEAR_PACKET_VALUES,
    CLEAR_USER_VALUES,
    HANDLE_CHANGE,
    GET_PACKETS_BEGIN,
    GET_PACKETS_SUCCESS,
    GET_MERCHANT_PACKETS_SUCCESS,
    GET_PACKET_BEGIN,
    GET_PACKET_SUCCESS,
    SET_EDIT_PACKET,
    SET_AREA_BEGIN,
    SET_AREA,
    SET_AREA_SUCCESS,
    ADD_PACKET_BEGIN,
    ADD_PACKET_SUCCESS,
    EDIT_PACKET_BEGIN,
    EDIT_PACKET_SUCCESS,
    CLEAR_PACKET,
    GET_CUSTOMERS_BEGIN,
    GET_CUSTOMERS_SUCCESS,
    GET_ALL_MERCHANT_SUCCESS,
    SET_EDIT_MERCHANT,
    EDIT_MERCHANT_BEGIN,
    EDIT_MERCHANT_SUCCESS,
    GET_MERCHANT_BEGIN,
    GET_MERCHANT_SUCCESS,
    GET_USERS_BEGIN,
    GET_USERS_SUCCESS,
    ADD_USER_BEGIN,
    ADD_USER_SUCCESS,
    SET_EDIT_USER,
    EDIT_USER_BEGIN,
    EDIT_USER_SUCCESS,
    GET_AGENT_BEGIN,
    GET_AGENT_SUCCESS,
    EDIT_STATUS_BEGIN,
    EDIT_STATUS_SUCCESS,
    RESET_FILTER,
    CREATE_INVOICES_BEGIN,
    CREATE_INVOICES_SUCCESS,
    GET_INVOICES_BEGIN,
    GET_INVOICES_SUCCESS,
    SET_EDIT_INVOICE,
    UPDATE_INVOICE_BEGIN,
    UPDATE_INVOICE_SUCCESS,
    GET_INVOICE_BEGIN,
    GET_INVOICE_SUCCESS,
    GET_STATS_BEGIN,
    SET_STATS,
    GET_STATS_SUCCESS,
    FILTER_PACKET_BEGIN,
    FILTER_PACKET_DELIVERY,
    FILTER_PACKET_DELIVERED,
    FILTER_PACKET_RETURNED,
    SET_MERCHANT_PROFILE,
    CHANGE_PASSWORD_SUCCESS,
    DELETE_PACKET_BEGIN,
    DELETE_PACKET_SUCCESS,
    GET_ASSIGNED_DELIVERIES_BEGIN,
    GET_ASSIGNED_DELIVERIES_SUCCESS,
    CHANGE_PAGE,
} from "./actions";

const reducer = (state,action) => {

    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertType: "danger",
                alertText: "Please provide all the details.",
            }
        break;

        case CLEAR_ALERT:
            return{
                ...state,
                showAlert: false,
                alertType: "",
                alertText: "",
            }
    break;

        case BEGIN:
            return {
                ...state,
                isLoading: true,
            }
        break;
        
        case DONE:
            return {
                ...state,
                isLoading: false,
            }
        break;

        case SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                showAlert: true,
                alertType: "success",
                alertText: "Success. Redirecting, if not please refresh.",
                user: action.payload.user,
            }
        break;

        case LOGOUT:
            return{
                ...state,
                showAlert: false,
                alerttype: "",
                alertText: "",
                token: null,
                user: null,
                data: "",
            }
        break

        case ERROR:
            return{
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "danger",
                alertText: action.payload.msg
            }
        break;

        case ASYNC_REQ_BEGIN:
            return{
                ...state,
                isLoading: true,
                showAlert: false,
                alertType: "",
                alertText: "",
            }
        break;

        

        case GET_DATA_SUCESS:
            return{
                ...state,
                isLoading: false,
                data: action.payload,
            }
        break;

        case SET_MERCHANT_PROFILE:
            const {
                id,
                isVerified,
                name,
                business_name,
                phone,
                email,
                fb_page,
                base_charge,
                pickup_area,
                pickup_address,
                payment_bikash,
                payment_nagad,
                payment_bank,

            } = state.data
            return{
                ...state,
                isLoading: false,
                merchantID: id,
                merchant_isVerified: isVerified,
                merchant_name: name,
                merchant_email: email,
                merchant_business_name: business_name,
                merchant_business_phone: phone,
                merchant_base_charge: base_charge,
                merchant_pickup_area: pickup_area,
                merchant_pickup_address: pickup_address,
                merchant_fb_page:fb_page,
                merchant_bank_name: payment_bank.bank_name,
                merchant_branch_name: payment_bank.bank_name,
                merchant_account_holder_name: payment_bank.account_holder_name,
                merchant_account_number:payment_bank.account_number,
                merchant_bikash_number: payment_bikash,
                merchant_nagad_number: payment_nagad,
            }
        break;

        case ASYNC_SUCCESS:
            return{
                ...state,
                showAlert: true,
                alertType: "success",
                alertText: action.payload.msg,
            }
        break;

        case GET_PACKETS_BEGIN:
            return{
                ...state,
                isLoading: true,
                allPackets: [],
            }
        break;

        case GET_PACKETS_SUCCESS:
            return{
                ...state,
                isLoading: false,
                allPackets: action.payload.packets,
                totalPackets: action.payload.totalPackets,
                num0fpages: action.payload.totalPages,
            }
        break;

        
        case GET_MERCHANT_PACKETS_SUCCESS:
            return{
                ...state,
                isLoading: false,
                allPackets: action.payload.data,
            }
        break;


        case GET_CUSTOMERS_BEGIN:
            return{
                ...state,
                isLoading: true,
                showAlert: false,
            }
        break;

        case GET_CUSTOMERS_SUCCESS:
            return{
                ...state,
                isLoading: false,
                allCustomer: action.payload.data,
            }
        break;


        case GET_PACKET_BEGIN:
            return{
                ...state,
                isLoading: true,
                showAlert: false,
            }
        break;

        case GET_PACKET_SUCCESS:
            return{
                ...state,
                isLoading: false,
                singlePacket: action.payload.packet,
            }
        break;

        case CLEAR_PACKET:
            return{
                ...state,
                singlePacket: "",
            }
        break;

        case SET_AREA_BEGIN:
            return{
                ...state,
                isLoading: true,
                showAlert: false,
            }
        break;

        case SET_AREA:
            return{
                ...state,
                areaList: action.payload.options,
            }
        break;

        case SET_AREA_SUCCESS:
            return{
                ...state,
                isLoading: false,
            }
        break;

        case ADD_PACKET_BEGIN:
            return{
                ...state,
                isLoading: true,
                showAlert: false,
            }
        break;

        case ADD_PACKET_SUCCESS:
            return{
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertText: "Success! new packet added for pickup",
            }
        break;

        case HANDLE_CHANGE:
            return{
                ...state,
                page: 1,
                [action.payload.name]: action.payload.value ,
            }
        break;

        case FILTER_PACKET_BEGIN:
            return{
                ...state,
                isLoading: false,
                packetsForDelivery: "",
                packetsDelivered:"",
                packetsReturned:"",
            }
        break;

        case FILTER_PACKET_DELIVERY:
            return{
                ...state,
                isLoading: false,
                packetsForDelivery: action.payload.packets,
            }
        break;

        case FILTER_PACKET_DELIVERED:
            return{
                ...state,
                isLoading: false,
                packetsDelivered: action.payload.packets
            }
        break;

        case FILTER_PACKET_RETURNED:
            return{
                ...state,
                isLoading: false,
                packetsReturned: action.payload.packets
            }
        break;

        case SET_EDIT_PACKET:
            const packet = state.allPackets.find((packet)=> packet._id === action.payload.id);
            const {
                _id, 
                packet_trackingID, 
                packet_customerName, 
                packet_customerPhone, 
                packet_customerCity, 
                packet_customerArea, 
                packet_customerAddress, 
                packet_merchantInvoice,
                packet_merchant,
                packet_merchant_phone,
                packet_pcikup_area,
                packet_pcikup_address,
                packet_collectionAmount,
                packet_delivery_charge,
                packet_costPrice,
                packet_weight,
                packet_specialInstruction,
                packet_merchant_address,
                packet_base_charge,
                packet_status,
            } = packet;
            return{
                ...state,
                isEditing: true,
                editPacketID: _id, 
                packet_trackingID, 
                packet_customerName, 
                packet_customerPhone, 
                packet_customerCity, 
                packet_customerArea, 
                packet_customerAddress, 
                packet_merchantInvoice, 
                packet_collectionAmount,
                packet_delivery_charge,
                packet_costPrice,
                packet_weight,
                packet_specialInstruction,
                packet_merchant,
                packet_merchant_phone,
                packet_pcikup_area,
                packet_pcikup_address,
                packet_merchant_address,
                packet_base_charge,
                packet_status,
            }
        break;
            

        case CLEAR_VALUES:

            const initialState  = {
                idEditing: false,
                
                // Packet Data
                editPacketID: "",
                packet_trackingID:"",
                packet_customerName: "",
                packet_customerPhone: "",
                packet_customerCity: "dhaka",
                packet_customerArea: "",
                packet_customerAddress: "",
                packet_merchantInvoice: "",
                packet_merchant:"",
                packet_merchant_phone:"",
                packet_pcikup_area:"",
                packet_pcikup_address:"",
                packet_collectionAmount: "",
                packet_delivery_charge:"",
                packet_costPrice: "",
                packet_weight: "",
                packet_specialInstruction: "",
                packet_status:"",
                packet_status_message:"",
                packet_status_category:"",

                // Merchant Data
                createdAt: "",
                merchantID: "", 
                merchant_name: "",
                merchant_email: "",
                merchant_isVerified: "",
                merchant_business_name: "",
                merchant_business_phone: "",
                merchant_product_type: "",
                merchant_base_charge: "",
                merchant_pickup_area: "",
                merchant_pickup_address: "",
                merchant_fb_page: "",
                merchant_bank_name: "",
                merchant_branch_name: "",
                merchant_account_holder_name: "",
                merchant_account_number: "",
                merchant_bikash_number: "",
                merchant_nagad_number: "",
                merchant_notes: "",


                

                // Invoice
                invoice_createdAt:"",
                invoiceID:"",
                invoice_status:"",
                invoice_trackingID:"",
                invoice_merchant_business_name:"",
                invoice_merchant_business_phone:"",
                invoice_merchant_business_address:"",
                invoice_total_payables:"",
            };
            return{
                ...state,
                ...initialState,
            }
        break;

        case CLEAR_PACKET_VALUES:
            const clearPacket = {
                idEditing: false,
                editPacketID: "",
                packet_trackingID:"",
                packet_customerName: "",
                packet_customerPhone: "",
                packet_customerCity: "dhaka",
                packet_customerArea: "",
                packet_customerAddress: "",
                packet_merchantInvoice: "",
                packet_merchant:"",
                packet_merchant_phone:"",
                packet_pcikup_area:"",
                packet_pcikup_address:"",
                packet_collectionAmount: "",
                packet_delivery_charge:"",
                packet_costPrice: "",
                packet_weight: "",
                packet_specialInstruction: "",
                packet_status:"",
                packet_status_message:"",
                packet_status_category:"",
            }
            return{
                ...state,
                ...clearPacket
            }
        break;

        case CLEAR_USER_VALUES:
            const clearUser = {
                idEditing: false,
                user_fullname:"",
                user_email:"",
                user_password:"",
                user_phone:"",
                user_designation:"",
                user_blood_group:"",
                user_employee_id:"",
                user_isActive:"",
                user_role:"",
                user_area: "",
                user_address:"",
                user_emergency_contact_name:"",
                user_emergency_contact_phone:"",
                user_emergency_contact_relation:"",
                user_emergency_contact_area:"",
                user_emergency_contact_address:"",
            }
            return{
                ...state,
                ...clearUser
            }
        break;

        case EDIT_PACKET_BEGIN:
            return{
                ...state,
                isLoading: true,
                showAlert: false
            }
        break;

        case EDIT_PACKET_SUCCESS:
            return{
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertText: "Packet Updated!",
            }
        break;


        case EDIT_STATUS_BEGIN:
            return{
                ...state,
                isLoading: true,
                showAlert: false
            }
        break;

        case EDIT_STATUS_SUCCESS:
            return{
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertText: action.payload.data
            }
        break;


        case GET_ALL_MERCHANT_SUCCESS:
            return{
                ...state,
                isLoading: false,
                allMerchants: action.payload.data
            }
        break;

        case SET_EDIT_MERCHANT:
            const merchant = state.allMerchants.find((merchant)=> merchant._id === action.payload.id);
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
            } = merchant

            return{
                ...state,
                isEditing: true,
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
            }
        break;


        case EDIT_MERCHANT_BEGIN:
            return{
                ...state,
                isLoading: true,
                showAlert: false,
            }
        break;

        case EDIT_MERCHANT_SUCCESS:
            return{
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertText: "Merchant Deatils Updated!",
            }
        break;
            
        case GET_MERCHANT_BEGIN:
            return{
                ...state,
                isLoading: true,
                showAlert: false,
            }
        break;
        
        case GET_MERCHANT_SUCCESS:
            return{
                ...state,
                isLoading: false,
                showAlert: false,
                singleMerchant: action.payload.data,
            }
        break;
        
        case GET_USERS_BEGIN:
            return{
                ...state,
                isLoading: true,
                showAlert: false
            }
        break;

        case GET_USERS_SUCCESS:
            return{
                ...state,
                isLoading: false,
                allUser: action.payload.data
            }
        break;
        
        case ADD_USER_BEGIN:
            return{
                ...state,
                isEditing: false,
                isLoading: true,
                showAlert: false
            }
        break;

        case ADD_USER_SUCCESS:
            return{
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertText: "User has been added!",
            }
        break;


        case SET_EDIT_USER:
            const getUser = state.allUser.find((user)=> user._id === action.payload.id);
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
            } = getUser

            return{
                ...state,
                isEditing: true,
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
            }
        break;

        case EDIT_USER_BEGIN:
            return{
                ...state,
                isEditing: true,
                isLoading: true,
                showAlert: false
            }
        break;

        case EDIT_USER_SUCCESS:
            return{
                ...state,
                isEditing: true,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertText: "User Deatils Updated!",
            }
        break;

        case GET_AGENT_BEGIN:
            return{
                ...state,
                isLoading: true
            }
        break;

        case GET_AGENT_SUCCESS:
            return{
                ...state,
                isLoading: false,
                allAgent: action.payload.options
            }
        break;

        case RESET_FILTER:
            return{
                ...state,
                filter_global_search: "",
                filter_packet_status: "",
                filter_packet_pickup_man: null,
                filter_packet_delivery_man: null,
                filter_packet_merchant: "",
            }
        break;

        case CREATE_INVOICES_BEGIN:
            return{
                ...state,
                isLoading: true,
                showAlert: false,
            }
        break;

        case CREATE_INVOICES_SUCCESS:
            return{
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertText: "Invoice Created!",
            }
        break;

        case GET_INVOICES_BEGIN:
            return{
                ...state,
                isLoading: true,
                showAlert: false,
            }
        break;

        case GET_INVOICES_SUCCESS:
            return{
                ...state,
                isLoading: false,
                invoices: action.payload.data,
            }
        break;
        
        case SET_EDIT_INVOICE:
            const getInvoice = state.invoices.find((invoice)=> invoice._id === action.payload.id);
            const {
                invoice_createdAt,
                invoiceID,
                invoice_status,
                invoice_trackingID,
                invoice_merchant_business_name,
                invoice_merchant_business_phone,
                invoice_merchant_business_address,
                invoice_total_payables,
            } = getInvoice;
            return{
                ...state,
                invoice_createdAt,
                invoiceID,
                invoice_status,
                invoice_trackingID,
                invoice_merchant_business_name,
                invoice_merchant_business_phone,
                invoice_merchant_business_address,
                invoice_total_payables,
            }
        break;

        case UPDATE_INVOICE_BEGIN:
            return{
                ...state,
                isLoading: true,
                showAlert: false
            }
        break;

        case UPDATE_INVOICE_SUCCESS:
            return{
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertText: "Invoice Updated!",
            }
        break;

        case GET_INVOICE_BEGIN:
            return{
                ...state,
                isLoading: true,
                showAlert: false
            }
        break;

        case GET_INVOICE_SUCCESS:
            return{
                ...state,
                isLoading: false,
                showAlert: false,
                invoice_packets: action.payload.data,
            }
        break;

        case GET_STATS_BEGIN:
            return{
                ...state,
                isLoading: true,
                showAlert: false
            }
        break;

        case SET_STATS:
            const data = action.payload.data
            return{
                ...state,
                isLoading: true,
                showAlert: false,
                deleveries_out_for_delivery: data.deliveries.out_for_delivery,
                deleveries_total_packets: data.deliveries.total_packets,
                deleveries_total_delivered: data.deliveries.total_delivered,
                deleveries_total_returned: data.deliveries.total_returned,
                payments_out_for_delivery: data.payments.out_for_delivery,
                payments_total_paid: data.payments.total_paid,
                payments_in_process: data.payments.in_process,
                payments_due: data.payments.due,
                last_invoices: data.invoices,
            }
        break;

        case GET_STATS_SUCCESS:
            return{
                ...state,
                isLoading: false,
                showAlert: false
            }
        break;

        case CHANGE_PASSWORD_SUCCESS:
            return{
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: "success",
                alertText: "Success! Password has been changed. You will be logged out",
            }
        break;


        case DELETE_PACKET_BEGIN:
            return{
                ...state,
                isLoading: true
            }
        break;

        case DELETE_PACKET_SUCCESS:
            return{
                ...state,
                showAlert: true,
                alertType: "success",
                alertText: action.payload.data,
            }
        break;

        case GET_ASSIGNED_DELIVERIES_BEGIN:
            return{
                ...state,
                isLoading: true,
            }
        break;

        case GET_ASSIGNED_DELIVERIES_SUCCESS:
            return{
                ...state,
                isLoading: false,
                allPackets: action.payload.packets
            }
        break;

        case CHANGE_PAGE:
            return{
                ...state,
                page: action.payload.page
            }
        break;
            
        // Default case
        default:
        break;
    }

    throw new Error(`no such action : ${action.type}`)
}

export default reducer
