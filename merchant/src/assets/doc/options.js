
export const deliveryStatusOptions = [
  { value: 'new', label: 'New', category: 'info', message: 'pickup requested by merchant.'},
  { value: 'accepted', label: 'Accepted', category: 'info', message: 'your request has been confirmed.'},
  { value: 'assigned-for-pickup', label: 'Assigned for Pickup', category: 'info', message: ''},
  { value: 'out-for-pickup', label: 'Out For Pickup', category: 'info', message: 'Our pickup man is on the way to pickup your packets'},
  { value: 'at-hub', label: 'At Hub', category: 'primary',  message: 'your packet is at our hub'},
  { value: 'assigned-for-delivery', label: 'Assigned for Delivery', category: 'primary', message: ''},
  { value: 'out-for-delivery', label: 'Out For Delivery', category: 'primary', message: 'Our delivery man is on the way to deliver the packet'},
  { value: 'delivery-done', label: 'Done', category: 'success', message: 'packet has been delivered'},
  { value: 'delivery-failed', label: 'Failed', category: 'danger', message: ''},
  { value: 'delivered', label: 'Delivered', category: 'success', message: 'packet has been delivered'},
  { value: 'on-hold-at-hub', label: 'On Hold at Hub', category: 'info', message: ''},
  { value: 'partial-return', label: 'Partial Return', category: 'success', message: ''},
  { value: 'pickup-canceled', label: 'Pickup Canceled', category: 'danger', message: 'Pickup request is canceled'},
  { value: 'return', label: 'return', category: 'danger', message: 'Packet will be returned to merchant and currently at hub'},
  { value: 'assigned-for-return', label: 'Assigned for Return', category: 'danger', message: ''},
  { value: 'out-for-return', label: 'Out for Reuturn', category: 'danger', message: 'Our delivery man is on the way to return the packet'},
  { value: 'returned', label: 'Returned', category: 'danger', message: 'packet has been returned to merchant'},
];

export const paymentStatus = [
  {value: 'pending', label: 'Pending', category: "info"}, 
  {value: 'due', label: 'Due', category: "danger"}, 
  {value: 'in-process', label: 'In Process', category: "info"},
  {value: 'paid', label: 'Paid', category: "success"},
  {value: 'void', label: 'void', category: "danger"},
]

export const booleanOptions=[
  {value: "true", label: "Yes"},
  {value: "false", label: "No"}
]

export const roleOptions=[
  {value: "admin", label: "Admin"},
  {value: "agent", label: "Agent"},
  {value: "super-admin", label: "Super Admin"}
]