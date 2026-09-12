/**
 * AutoCare CRM - Core JavaScript Application
 * Features:
 * - 1-Click English / Gujarati Language Switching
 * - 100% Editable Fields & Metric Stats with LocalStorage Persistence
 * - Vehicle Type Option (Two Wheeler 🏍️ / Four Wheeler 🚗 / Commercial 🚚)
 * - Multi-View Routing System for Sidebar & "View All" Links with "← Back to Dashboard"
 * - Genuine Excel (.xlsx) & CSV Import & Export using SheetJS
 * - Calling List Management, Direct WhatsApp & Phone Call
 * - Search & Live Filtering
 */

// --- Default Data with Vehicle Types matching the provided screenshot ---
// --- Default Data with Clean Starting State for Live Deployment ---
const DEFAULT_DATA = {
  admin: {
    name: 'Momai Admin',
    role: 'Admin',
    initials: 'MA',
    welcomeName: 'Admin',
    phone: '+91 99250 23570'
  },
  employees: [
    { id: 'emp1', name: 'Momai Admin', role: 'Admin', username: 'admin', password: 'admin123', phone: '+91 99250 23570', email: 'momaienterprise1111@gmail.com' }
  ],
  activeEmployeeId: 'emp1',
  slogans: {
    tagline: 'Keep Your Customers On The Road',
    taglineSub: 'We Handle The Reminders!',
    footer: 'Customers Today. Safer Journeys Tomorrow.'
  },
  metrics: {
    totalCustomers: '0',
    totalCustomersSub: '0 this month',
    todayFollowups: '0',
    expiredDocs: '0',
    next7Days: '0',
    next30Days: '0'
  },
  docStatus: {
    insuranceExpiring: 0,
    insuranceExpired: 0,
    fitnessExpiring: 0,
    fitnessExpired: 0,
    pucExpiring: 0,
    pucExpired: 0,
    newLicenceExpiring: 0,
    newLicenceExpired: 0,
    renewalLicenceExpiring: 0,
    renewalLicenceExpired: 0,
    rcTransferExpiring: 0,
    rcTransferExpired: 0,
    vehiclePassingExpiring: 0,
    vehiclePassingExpired: 0
  },
  documentTypes: [
    { id: 'insurance', name: 'Insurance', icon: '🛡️', color: 'blue' },
    { id: 'fitness', name: 'Fitness', icon: '🚗', color: 'green' },
    { id: 'puc', name: 'PUC', icon: '🌱', color: 'purple' },
    { id: 'new-licence', name: 'New Driving Licence', icon: '🪪', color: 'amber' },
    { id: 'renewal-licence', name: 'Renewal Licence', icon: '🔄', color: 'orange' },
    { id: 'rc-transfer', name: 'RC Transfer', icon: '🔁', color: 'indigo' },
    { id: 'vehicle-passing', name: 'Vehicle Passing', icon: '📋', color: 'teal' }
  ],
  callingList: [],
  next7DaysList: [],
  expiredDocsList: [],
  activities: []
};

// --- Bilingual Translation Dictionary ---
const TRANSLATIONS = {
  en: {
    brandName: 'Momai Enterprise',
    brandTagline: 'Drive Secure. We Remind.',
    navDashboard: 'Dashboard',
    navCustomers: 'Customers',
    navAllCustomers: 'All Customers',
    navAddCustomer: '+ Add Customer',
    navFollowups: 'Follow-ups',
    navDocuments: 'Documents',
    navInsurance: 'Insurance',
    navFitness: 'Fitness',
    navPuc: 'PUC',
    navExpired: 'Expired',
    navReminders: 'Reminders',
    navReports: 'Reports',
    navSettings: 'Settings',
    needHelp: 'Need Help?',
    contactSupport: 'Contact Support',
    searchPlaceholder: 'Search by customer name or vehicle number...',
    searchBtn: 'Search',
    editModeOn: 'Edit Mode: ON',
    editModeOff: 'Edit Mode: OFF',
    welcomeBack: 'Welcome Back, ',
    welcomeSubtitle: "Here's your business update for today.",
    taglineHeader: '"Keep Your Customers On The Road"',
    taglineHeaderSub: 'We Handle The Reminders!',
    metricTotalCustomers: 'Total Customers',
    metricTodayFollowups: "Today's Follow-ups",
    metricExpiredDocs: 'Expired Documents',
    metricNext7Days: 'Next 7 Days Expiry',
    metricNext30Days: 'Next 30 Days Expiry',
    viewList: 'View List →',
    actionRequired: 'Action Required →',
    viewAll: 'View All →',
    callingListTitle: "Today's Calling List",
    colNumber: '#',
    colCustomerName: 'Customer Name',
    colVehicle: 'Vehicle',
    colVehicleNo: 'Vehicle No.',
    colDocument: 'Document',
    colExpiryDate: 'Expiry Date',
    colDaysLeft: 'Days Left',
    colStatus: 'Status',
    colActions: 'Actions',
    colExpiredOn: 'Expired On',
    documentStatusTitle: 'Document Status',
    docInsurance: 'Insurance',
    docFitness: 'Fitness',
    docPuc: 'PUC',
    docNewDrivingLicence: 'New Driving Licence',
    docRenewalLicence: 'Renewal Licence',
    docRcTransfer: 'RC Transfer',
    docVehiclePassing: 'Vehicle Passing',
    expiringLabel: 'Expiring',
    expiredLabel: 'Expired',
    quickActionsTitle: 'Quick Actions',
    btnAddNewCustomer: '+ Add New Customer',
    btnSendBulkReminder: 'Send Bulk Reminder',
    btnImportCustomers: 'Import Customers (Excel)',
    recentActivitiesTitle: 'Recent Activities',
    next7DaysTitle: 'Next 7 Days Expiry',
    expiredDocsTitle: 'Expired Documents',
    allRightsReserved: '© 2026 Momai Enterprise CRM. All rights reserved.',
    footerSlogan: 'Customers Today. Safer Journeys Tomorrow.',
    statusDueSoon: 'Due Soon',
    statusExpiryToday: 'Expiry Today',
    statusUpcoming: 'Upcoming',
    statusExpired: 'Expired',
    addCustomerModalTitle: 'Add New Customer',
    editCustomerModalTitle: 'Edit Customer Details',
    bulkReminderModalTitle: 'Send Bulk Reminder',
    importModalTitle: 'Import / Export Customer Data',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    send: 'Send Now',
    customerNameLabel: 'Customer Name',
    mobileNumberLabel: 'Mobile Phone Number',
    vehicleNumberLabel: 'Vehicle Registration No.',
    documentTypeLabel: 'Document Type',
    expiryDateLabel: 'Expiry Date',
    statusLabel: 'Status',
    channelLabel: 'Reminder Channel',
    targetAudienceLabel: 'Target Audience',
    previewMessageLabel: 'Message Preview',
    exportCsvBtn: 'Export to Excel / CSV',
    importCsvBtn: 'Upload CSV File',
    resetDefaultBtn: 'Reset to Default Data',
    toastSaved: 'Changes saved successfully!',
    toastDeleted: 'Customer removed!',
    toastActivityAdded: 'Activity logged successfully!',
    toastReminderSent: 'Bulk reminder dispatched!',
    whatsappPrompt: 'Opening WhatsApp Web for customer...',
    // New translations for 2W/4W and Views
    backToDashboard: '← Back to Dashboard',
    vehicleTypeLabel: 'Vehicle Type',
    vType2W: 'Two Wheeler',
    vType4W: 'Four Wheeler',
    vTypeComm: 'Commercial',
    filterAll: 'All Vehicles',
    filterAllDocs: 'All Documents',
    customersViewSubtitle: 'Manage your full vehicle and customer database with Two-Wheeler / Four-Wheeler filters.',
    documentsViewSubtitle: 'Track all vehicle Insurance, Fitness, PUC, and Expired certificates.',
    callingViewSubtitle: 'Call, WhatsApp, and record document renewal follow-ups for all due vehicles.',
    next7DaysSubtitle: 'Vehicles with documents expiring within the next week.',
    expiredDocsSubtitle: 'Action required: Vehicles with expired documents requiring immediate renewal.',
    remindersSubtitle: 'Automated and manual WhatsApp/SMS reminders log and templates.',
    reportsSubtitle: 'Complete performance overview by Two-Wheeler vs Four-Wheeler and document renewals.',
    // Employee and Status translations
    statusRenewed: 'Renewed',
    employeeModalTitle: 'Employee & Staff Management',
    switchActiveProfileTitle: 'Select Active Profile / Staff Member:',
    addNewEmployeeTitle: 'Add New Staff / Telecaller Member',
    empNameLabel: 'Staff Name',
    empRoleLabel: 'Role',
    empPhoneLabel: 'Phone Number',
    empEmailLabel: 'Email / ID',
    btnAddEmployeeBtn: '+ Add Staff Member',
    assignedStaffLabel: 'Assigned Staff / Telecaller',
    activeProfileTag: '✓ Active Profile',
    btnSwitchProfile: 'Switch to this Profile',
    calcHintText: '📅 Auto-calculates Days Left & Status instantly',
    // Login, Logout & Entry Tracking translations
    loginSubtitle: 'Please sign in to access your CRM portal',
    loginUserIdLabel: 'User ID / Username',
    loginPasswordLabel: 'Password',
    btnLoginText: 'Log In',
    quickLoginTitle: '⚡ Quick Test Logins:',
    btnLogout: 'Logout',
    colEntryBy: 'Entry By',
    staffFilterLabel: 'Staff:',
    allStaffOption: 'All Staff (Master View)',
    empUsernameLabel: 'Login User ID',
    empPasswordLabel: 'Password',
    toastLoggedIn: 'Logged in successfully as',
    toastLoggedOut: 'Logged out successfully',
    invalidLogin: 'Invalid User ID or Password',
    // New Advanced Features Translations
    colRemarks: 'Remarks',
    callModalTitle: 'Call Customer / ગ્રાહકને કૉલ કરો',
    btnDialNow: '📞 Dial Call Now',
    btnCopyPhone: '📋 Copy Mobile Number',
    lblCustRemarks: 'Calling Notes & Remarks',
    quickRemarkModalTitle: 'Calling Notes & Remarks',
    quickPresetsTitle: '⚡ Quick Note Presets:',
    lblRemarkNote: 'Note:',
    saveRemarkBtn: 'Save Note',
    waModalTitle: 'Send WhatsApp Reminder',
    waSelectTemplateTitle: 'Select Message Template:',
    tpl15Days: '15 Days Notice',
    tpl15DaysDesc: 'Expiring soon reminder with contact details',
    tplToday: 'Today / Urgent Expiry',
    tplTodayDesc: 'Urgent reminder: document expires today',
    tplPenalty: 'Traffic Fine Warning',
    tplPenaltyDesc: 'Notice on ₹2,000-₹10,000 RTO police penalty',
    tplSuccess: 'Renewal Confirmation',
    tplSuccessDesc: 'Thank you message with renewal confirmation',
    waMessagePreviewLabel: 'Message Preview (Editable):',
    btnCopyMsg: 'Copy Message',
    btnSendWhatsApp: 'Open & Send in WhatsApp Web',
    receiptModalTitle: 'Print Renewal Receipt Voucher',
    receiptBannerText: 'OFFICIAL VEHICLE DOCUMENT RENEWAL RECEIPT',
    receiptCustomerInfo: 'Customer Details',
    receiptVehicleInfo: 'Vehicle Details',
    recTotalPaid: 'TOTAL AMOUNT RECEIVED:',
    recAuthSign: 'Authorized Signatory',
    btnPrintReceipt: 'Print Receipt',
    staffPerfTitle: 'Staff WhatsApp / SMS & Performance Summary',
    staffPerfSub: '(Live Team Tracking)',
    thStaffMember: 'Staff Member',
    thAssigned: 'Assigned',
    thCallsCompleted: 'WhatsApp / SMS Done',
    thRenewed: 'Renewed',
    thConversionRate: 'Progress',
    thStatus: 'Status',
    manageDocTypes: 'Manage Document Types',
    manageDocTypesModalTitle: 'Document Types Management',
    forgotPasswordLink: 'Forgot Password?',
    forgotPasswordModalTitle: 'Reset Password',
    forgotStep1Desc: 'Enter your Admin User ID or registered Email ID. A 6-digit verification code will be sent to your email to securely reset your password.',
    forgotIdentifierLabel: 'User ID or Email',
    btnSendOtpText: 'Send Verification Code to Email',
    forgotOtpLabel: 'Enter 6-Digit Code',
    forgotNewPassLabel: 'New Password',
    forgotConfirmPassLabel: 'Confirm Password',
    btnResetPassText: 'Change Password & Sign In',
    forgotSuccessTitle: 'Password Reset Successfully!',
    forgotSuccessDesc: 'Your new password is now saved. Please log in with your updated password.',
    editProfileModalTitle: 'Edit Staff Profile'
  },
  gu: {
    brandName: 'મોમાઈ એન્ટરપ્રાઈઝ',
    brandTagline: 'સુરક્ષિત ડ્રાઇવ કરો. યાદ અમે રાખીશું.',
    navDashboard: 'ડેશબોર્ડ',
    navCustomers: 'ગ્રાહકો',
    navAllCustomers: 'બધા ગ્રાહકો',
    navAddCustomer: '+ ગ્રાહક ઉમેરો',
    navFollowups: 'ફોલો-અપ્સ',
    navDocuments: 'દસ્તાવેજો',
    navInsurance: 'વીમો (Insurance)',
    navFitness: 'ફિટનેસ (Fitness)',
    navPuc: 'પીયુસી (PUC)',
    navExpired: 'મુદત પૂરી થયેલ',
    navReminders: 'રિમાઇન્ડર્સ',
    navReports: 'રિપોર્ટ્સ',
    navSettings: 'સેટિંગ્સ',
    needHelp: 'મદદ જોઈએ છે?',
    contactSupport: 'સંપર્ક સપોર્ટ',
    searchPlaceholder: 'ગ્રાહકનું નામ અથવા વાહન નંબર શોધો...',
    searchBtn: 'શોધો',
    editModeOn: 'એડિટ મોડ: ચાલુ',
    editModeOff: 'એડિટ મોડ: બંધ',
    welcomeBack: 'સ્વાગત છે, ',
    welcomeSubtitle: 'અહીં આજનું તમારું વ્યાપાર અપડેટ છે.',
    taglineHeader: '"તમારા ગ્રાહકોને રસ્તા પર રાખો"',
    taglineHeaderSub: 'રિમાઇન્ડર અમે સંભાળીશું!',
    metricTotalCustomers: 'કુલ ગ્રાહકો',
    metricTodayFollowups: 'આજના ફોલો-અપ્સ',
    metricExpiredDocs: 'મુદત પૂરી દસ્તાવેજ',
    metricNext7Days: 'આગામી ૭ દિવસમાં એક્સપાયરી',
    metricNext30Days: 'આગામી ૩૦ દિવસમાં એક્સપાયરી',
    viewList: 'યાદી જુઓ →',
    actionRequired: 'ધ્યાન જરૂરી →',
    viewAll: 'બધા જુઓ →',
    callingListTitle: "આજનું કૉલિંગ લિસ્ટ",
    colNumber: '#',
    colCustomerName: 'ગ્રાહકનું નામ',
    colVehicle: 'વાહન',
    colVehicleNo: 'વાહન નંબર',
    colDocument: 'દસ્તાવેજ',
    colExpiryDate: 'એક્સપાયરી તારીખ',
    colDaysLeft: 'બાકી દિવસો',
    colStatus: 'સ્થિતિ',
    colActions: 'ક્રિયાઓ',
    colExpiredOn: 'સમાપ્તિ તારીખ',
    documentStatusTitle: 'દસ્તાવેજ સ્થિતિ',
    docInsurance: 'વીમો',
    docFitness: 'ફિટનેસ',
    docPuc: 'પીયુસી',
    docNewDrivingLicence: 'નવું ડ્રાઇવિંગ લાયસન્સ',
    docRenewalLicence: 'ડ્રાઇવિંગ લાયસન્સ રિન્યુઅલ',
    docRcTransfer: 'આરસી ટ્રાન્સફર',
    docVehiclePassing: 'વાહન પાસિંગ',
    expiringLabel: 'બાકી',
    expiredLabel: 'પૂરા થયેલ',
    quickActionsTitle: 'ઝડપી ક્રિયાઓ',
    btnAddNewCustomer: '+ નવો ગ્રાહક ઉમેરો',
    btnSendBulkReminder: 'બલ્ક રિમાઇન્ડર મોકલો',
    btnImportCustomers: 'ગ્રાહકો આયાત કરો (Excel)',
    recentActivitiesTitle: 'તાજેતરની પ્રવૃત્તિઓ',
    next7DaysTitle: 'આગામી ૭ દિવસમાં એક્સપાયરી',
    expiredDocsTitle: 'મુદત પૂરી થયેલ દસ્તાવેજ',
    allRightsReserved: '© 2026 મોમાઈ એન્ટરપ્રાઈઝ CRM. સર્વાધિકાર સુરક્ષિત.',
    footerSlogan: 'આજના ગ્રાહકો. આવતીકાલની સુરક્ષિત મુસાફરી.',
    statusDueSoon: 'નજીક છે',
    statusExpiryToday: 'આજે સમાપ્ત',
    statusUpcoming: 'આગામી',
    statusExpired: 'મુદત પૂરી',
    addCustomerModalTitle: 'નવો ગ્રાહક ઉમેરો',
    editCustomerModalTitle: 'ગ્રાહકની વિગતો સુધારો',
    bulkReminderModalTitle: 'બલ્ક રિમાઇન્ડર મોકલો',
    importModalTitle: 'ગ્રાહક ડેટા આયાત / નિકાસ',
    saveChanges: 'ફેરફારો સાચવો',
    cancel: 'રદ કરો',
    send: 'મોકલો',
    customerNameLabel: 'ગ્રાહકનું નામ',
    mobileNumberLabel: 'મોબાઇલ નંબર',
    vehicleNumberLabel: 'વાહન રજિસ્ટ્રેશન નંબર',
    documentTypeLabel: 'દસ્તાવેજનો પ્રકાર',
    expiryDateLabel: 'એક્સપાયરી તારીખ',
    statusLabel: 'સ્થિતિ',
    channelLabel: 'રિમાઇન્ડર માધ્યમ',
    targetAudienceLabel: 'કોને મોકલવું?',
    previewMessageLabel: 'મેસેજ પ્રિવ્યૂ',
    exportCsvBtn: 'Excel / CSV ડાઉનલોડ કરો',
    importCsvBtn: 'CSV ફાઇલ અપલોડ કરો',
    resetDefaultBtn: 'મૂળ ડેટા પાછો લાવો',
    toastSaved: 'ફેરફારો સફળતાપૂર્વક સાચવ્યા!',
    toastDeleted: 'ગ્રાહક દૂર કરવામાં આવ્યો!',
    toastActivityAdded: 'પ્રવૃત્તિ નોંધાઈ ગઈ!',
    toastReminderSent: 'બલ્ક રિમાઇન્ડર સફળતાપૂર્વક મોકલાયા!',
    whatsappPrompt: 'ગ્રાહક માટે WhatsApp ખોલી રહ્યું છે...',
    // New translations for 2W/4W and Views
    backToDashboard: '← ડેશબોર્ડ પર પાછા જાઓ',
    vehicleTypeLabel: 'વાહનનો પ્રકાર',
    vType2W: 'ટુ-વ્હીલર (2W)',
    vType4W: 'ફોર-વ્હીલર (4W)',
    vTypeComm: 'કોમર્શિયલ',
    filterAll: 'બધા વાહનો',
    filterAllDocs: 'બધા દસ્તાવેજો',
    customersViewSubtitle: 'ટુ-વ્હીલર અને ફોર-વ્હીલર ફિલ્ટર્સ સાથે ગ્રાહકોનો સંપૂર્ણ ડેટાબેઝ.',
    documentsViewSubtitle: 'તમામ વાહનોના વીમા, ફિટનેસ, પીયુસી અને મુદત પૂરી થયેલ દસ્તાવેજોનું સંચાલન.',
    callingViewSubtitle: 'બધા વાહનો માટે કૉલ, WhatsApp અને દસ્તાવેજ રિન્યુઅલ ફોલો-અપ.',
    next7DaysSubtitle: 'આગામી સપ્તાહમાં સમાપ્ત થતા વાહન દસ્તાવેજોની યાદી.',
    expiredDocsSubtitle: 'તાત્કાલિક ધ્યાન જરૂરી: મુદત પૂરી થયેલ દસ્તાવેજો વાળા વાહનો.',
    remindersSubtitle: 'ઓટોમેટેડ અને મેન્યુઅલ WhatsApp/SMS રિમાઇન્ડર લૉગ.',
    reportsSubtitle: 'ટુ-વ્હીલર અને ફોર-વ્હીલર વાહનોના આંકડા અને રિન્યુઅલ રિપોર્ટ્સ.',
    // Employee and Status translations
    statusRenewed: 'નવીકરણ થયેલ',
    employeeModalTitle: 'કર્મચારી અને સ્ટાફ પ્રોફાઇલ સંચાલન',
    switchActiveProfileTitle: 'સક્રિય કર્મચારી પ્રોફાઇલ પસંદ કરો:',
    addNewEmployeeTitle: 'નવા સ્ટાફ / ટેલિકોલર ઉમેરો',
    empNameLabel: 'કર્મચારીનું નામ',
    empRoleLabel: 'હોદ્દો / ભૂમિકા',
    empPhoneLabel: 'મોબાઇલ નંબર',
    empEmailLabel: 'ઈમેલ / આઈડી',
    btnAddEmployeeBtn: '+ નવો કર્મચારી ઉમેરો',
    assignedStaffLabel: 'સોંપેલ સ્ટાફ / ટેલિકોલર',
    activeProfileTag: '✓ સક્રિય પ્રોફાઇલ',
    btnSwitchProfile: 'આ પ્રોફાઇલ પસંદ કરો',
    calcHintText: '📅 આપોઆપ બાકી દિવસો અને સ્થિતિ ગણશે',
    // Login, Logout & Entry Tracking translations
    loginSubtitle: 'કૃપા કરીને તમારા CRM પોર્ટલમાં પ્રવેશવા સાઇન ઇન કરો',
    loginUserIdLabel: 'વપરાશકર્તા ID / યુઝરનેમ',
    loginPasswordLabel: 'પાસવર્ડ',
    btnLoginText: 'લૉગિન કરો',
    quickLoginTitle: '⚡ ઝડપી ટેસ્ટ લૉગિન:',
    btnLogout: 'લૉગઆઉટ',
    colEntryBy: 'દાખલ કરનાર',
    staffFilterLabel: 'સ્ટાફ:',
    allStaffOption: 'બધા સ્ટાફ (માસ્ટર વ્યુ)',
    empUsernameLabel: 'લૉગિન યુઝર ID',
    empPasswordLabel: 'પાસવર્ડ',
    toastLoggedIn: 'સફળતાપૂર્વક લૉગિન થયા:',
    toastLoggedOut: 'સફળતાપૂર્વક લૉગઆઉટ થયા',
    invalidLogin: 'અમાન્ય વપરાશકર્તા ID અથવા પાસવર્ડ',
    // New Advanced Features Translations
    colRemarks: 'નોંધ (Remarks)',
    callModalTitle: 'ગ્રાહકને કૉલ કરો',
    btnDialNow: '📞 કૉલ લગાવો',
    btnCopyPhone: '📋 નંબર કોપી કરો',
    lblCustRemarks: 'વાતચીતની નોંધ (Remarks)',
    quickRemarkModalTitle: 'કોલિંગ વાતચીતની નોંધ',
    quickPresetsTitle: '⚡ ઝડપી નોંધના વિકલ્પો:',
    lblRemarkNote: 'નોંધ:',
    saveRemarkBtn: 'નોંધ સાચવો',
    waModalTitle: 'વૉટ્સએપ રિમાઇન્ડર મોકલો',
    waSelectTemplateTitle: 'મેસેજ ટેમ્પલેટ પસંદ કરો:',
    tpl15Days: '15 દિવસ અગાઉ નોટિસ',
    tpl15DaysDesc: 'મુદત પૂરી થવા વિશે અગાઉથી જાણ',
    tplToday: 'આજે છેલ્લી તારીખ / તાત્કાલિક',
    tplTodayDesc: 'આજે જ દસ્તાવેજ સમાપ્ત થાય છે',
    tplPenalty: 'ટ્રાફિક પોલીસ દંડ ચેતવણી',
    tplPenaltyDesc: 'રૂ. 2,000 થી 10,000 સુધીના દંડથી બચો',
    tplSuccess: 'નવીકરણ સફળતાપૂર્વક થયેલ',
    tplSuccessDesc: 'રિન્યુઅલ કન્ફર્મેશન અને આભાર સંદેશ',
    waMessagePreviewLabel: 'મેસેજ પ્રીવ્યુ (બદલી શકાય છે):',
    btnCopyMsg: 'મેસેજ કોપી કરો',
    btnSendWhatsApp: 'વૉટ્સએપ પર મોકલો',
    receiptModalTitle: 'રિન્યુઅલ રસીદ પ્રિન્ટ કરો',
    receiptBannerText: 'અધિકૃત વાહન દસ્તાવેજ નવીકરણ રસીદ',
    receiptCustomerInfo: 'ગ્રાહકની વિગત',
    receiptVehicleInfo: 'વાહનની વિગત',
    recTotalPaid: 'કુલ પ્રાપ્ત થયેલ રકમ:',
    recAuthSign: 'અધિકૃત સહી',
    btnPrintReceipt: 'પ્રિન્ટ કરો',
    staffPerfTitle: 'સ્ટાફ WhatsApp / SMS અને કામગીરી સમરી',
    staffPerfSub: '(ટીમ ટ્રેકિંગ)',
    thStaffMember: 'સ્ટાફ સભ્ય',
    thAssigned: 'સોંપેલ',
    thCallsCompleted: 'WhatsApp / SMS મોકલ્યા',
    thRenewed: 'રિન્યુ થયેલ',
    thConversionRate: 'પ્રગતિ',
    thStatus: 'સ્થિતિ',
    manageDocTypes: 'દસ્તાવેજ પ્રકારો મેનેજ કરો',
    manageDocTypesModalTitle: 'દસ્તાવેજ પ્રકારો વ્યવસ્થાપન',
    forgotPasswordLink: 'પાસવર્ડ ભૂલી ગયા?',
    forgotPasswordModalTitle: 'પાસવર્ડ રીસેટ કરો',
    forgotStep1Desc: 'તમારું એડમિન યુઝર ID અથવા રજિસ્ટર્ડ ઇમેઇલ દાખલ કરો. તમારા ઇમેઇલ પર 6-અંકનો વેરિફિકેશન કોડ મોકલવામાં આવશે.',
    forgotIdentifierLabel: 'વપરાશકર્તા ID અથવા ઇમેઇલ',
    btnSendOtpText: 'ઇમેઇલ પર વેરિફિકેશન કોડ મોકલો',
    forgotOtpLabel: '6-અંકનો કોડ દાખલ કરો',
    forgotNewPassLabel: 'નવો પાસવર્ડ',
    forgotConfirmPassLabel: 'પાસવર્ડ પુષ્ટિ કરો',
    btnResetPassText: 'પાસવર્ડ બદલો અને લૉગિન કરો',
    forgotSuccessTitle: 'પાસવર્ડ સફળતાપૂર્વક બદલાઈ ગયો છે!',
    forgotSuccessDesc: 'તમારો નવો પાસવર્ડ સક્રિય થઈ ગયો છે. હવે નવા પાસવર્ડથી લૉગિન કરો.',
    editProfileModalTitle: 'કર્મચારી પ્રોફાઇલ સંપાદિત કરો'
  }
};

// --- Application Core Class ---
class AutoCareCRM {
  constructor() {
    this.localDataVersion = 0;
    this.isSyncing = false;
    this.currentLang = localStorage.getItem('autocare_lang') || 'en';
    this.editMode = false;
    this.currentView = 'dashboard';
    this.data = this.loadData();
    this.editingCustomerId = null;

    // Active filters
    this.custVFilter = 'all';
    this.docVFilter = 'all';
    this.docActiveTab = 'all';
    this.callingVFilter = 'all';
    this.masterStaffFilter = 'all';

    // Session Management
    this.currentSession = this.loadSession();

    this.initElements();
    this.bindEvents();
    this.bindRouting();
    this.render();
    this.syncCloudData();
    this.initRealtimeSync();
    this.checkAuth();
  }

  async syncCloudData(options = {}) {
    if (this.isSyncing) return;
    this.isSyncing = true;
    try {
      let serverPayload = null;
      let cloudVer = 0;

      // 1. Primary Cloud Store: High-Speed Firebase RTDB
      try {
        const res = await fetch('https://momaienterprise-crm-live-default-rtdb.firebaseio.com/crm_database.json?t=' + Date.now(), { cache: 'no-store' });
        if (res.ok) {
          const raw = await res.json();
          if (raw && (raw.data || raw.callingList)) {
            serverPayload = raw.data || raw;
            cloudVer = raw.version || serverPayload._version || 0;
          }
        }
      } catch (e) {}

      // 2. Fallback to Cloudflare Worker / API endpoint
      if (!serverPayload || !serverPayload.callingList || serverPayload.callingList.length === 0) {
        try {
          const res = await fetch('/api/data?t=' + Date.now(), { cache: 'no-store' });
          if (res.ok) {
            const raw = await res.json();
            if (raw && (raw.data || raw.callingList)) {
              serverPayload = raw.data || raw;
              cloudVer = raw.version || serverPayload._version || 0;
            }
          }
        } catch (e) {}
      }

      // 3. Fallback to Pantry Key-Value Cloud
      if (!serverPayload || !serverPayload.callingList || serverPayload.callingList.length === 0) {
        try {
          const res = await fetch('https://getpantry.cloud/apiv1/pantry/0726d15b-9999-4d64-9b2f-momai9925000/basket/crm_data?t=' + Date.now(), { cache: 'no-store' });
          if (res.ok) {
            const raw = await res.json();
            if (raw && (raw.data || raw.callingList)) {
              serverPayload = raw.data || raw;
              cloudVer = raw.version || serverPayload._version || 0;
            }
          }
        } catch (e) {}
      }

      const localListCount = (this.data && this.data.callingList) ? this.data.callingList.length : 0;

      // Case A: Cloud has data and local is newer or empty or different -> Pull from Cloud
      if (serverPayload && (Array.isArray(serverPayload.callingList) || Array.isArray(serverPayload.employees))) {
        if (!serverPayload.callingList) serverPayload.callingList = [];
        if (!serverPayload.employees) serverPayload.employees = JSON.parse(JSON.stringify(DEFAULT_DATA.employees));

        const cloudCount = serverPayload.callingList.length;
        const isNewer = cloudVer && (!this.localDataVersion || cloudVer > this.localDataVersion);
        const isLocalEmpty = localListCount === 0 && cloudCount > 0;
        const isCallingDiff = JSON.stringify(serverPayload.callingList) !== JSON.stringify(this.data.callingList || []);
        const isEmpDiff = JSON.stringify(serverPayload.employees || []) !== JSON.stringify(this.data.employees || []);
        const currentSavedAdminPass = localStorage.getItem('momai_crm_admin_pass');
        const adminEmp = serverPayload.employees.find(e => e.role === 'Admin' || e.username === 'admin');
        const isAdminPassDiff = Boolean(adminEmp && adminEmp.password && currentSavedAdminPass && adminEmp.password !== currentSavedAdminPass);

        if (isNewer || isLocalEmpty || isCallingDiff || isEmpDiff || isAdminPassDiff || options.force) {
          if (cloudVer) this.localDataVersion = cloudVer;

          this.data = serverPayload;
          localStorage.setItem('momai_crm_data_v2', JSON.stringify(serverPayload));
          if (cloudVer) localStorage.setItem('momai_crm_version', String(cloudVer));

          // Sync Admin password locally if updated in Cloud
          if (adminEmp && adminEmp.password) {
            localStorage.setItem('momai_crm_admin_pass', adminEmp.password);
          }

          const activeEl = document.activeElement;
          const isUserTyping = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT');

          if (!isUserTyping || options.force) {
            this.render();
          } else {
            this.renderCallingList();
            this.renderFullCustomersTable();
            this.renderDocumentsTable();
            this.renderNext7DaysList();
            this.renderExpiredDocsList();
          }

          if (options.showToast && (cloudCount !== localListCount || options.forceToast)) {
            const diff = cloudCount - localListCount;
            const diffText = diff > 0 ? ` (+${diff} new)` : '';
            this.showToast(this.currentLang === 'gu'
              ? `🔄 લાઇવ સિંક: અન્ય લેપટોપ પરથી ડેટા અપડેટ થયો!${diffText}`
              : `🔄 Live Cloud Sync: Data updated from another laptop!${diffText}`, 'info');
          }
        }
      } 
      // Case B: Local has customer data (e.g. Laptop 1), but Cloud is empty -> Push local to Cloud!
      else if (localListCount > 0 && (!serverPayload || !serverPayload.callingList || serverPayload.callingList.length === 0)) {
        this.saveData({ skipBroadcast: true });
      }

      this.updateSyncBadge('online');
    } catch (err) {
      console.warn('Sync cloud warning:', err);
      this.updateSyncBadge(navigator.onLine ? 'online' : 'offline');
    } finally {
      this.isSyncing = false;
    }
  }

  initRealtimeSync() {
    // 1. BroadcastChannel for instant same-browser cross-tab sync
    if (window.BroadcastChannel) {
      try {
        this.broadcastChannel = new BroadcastChannel('momai_crm_sync');
        this.broadcastChannel.onmessage = (e) => {
          if (e.data && e.data.type === 'DATA_UPDATED') {
            const saved = localStorage.getItem('momai_crm_data_v2');
            if (saved) {
              try {
                this.data = JSON.parse(saved);
                this.render();
              } catch (err) {}
            }
          }
        };
      } catch (e) {}
    }

    // 2. Real-time Multi-Device Cloud Poller (every 3 seconds)
    if (this.syncHeartbeatInterval) {
      clearInterval(this.syncHeartbeatInterval);
    }
    this.syncHeartbeatInterval = setInterval(() => {
      this.syncCloudData();
    }, 3000);

    // 3. Instant sync on tab focus or visibility change
    window.addEventListener('focus', () => {
      this.syncCloudData({ force: false });
    });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.syncCloudData({ force: false });
      }
    });

    // 4. Network Status Event Listeners
    window.addEventListener('online', () => {
      this.updateSyncBadge('online');
      this.syncCloudData({ force: true });
    });
    window.addEventListener('offline', () => this.updateSyncBadge('offline'));

    // 5. Clicking sync badge manually forces an instant cloud sync
    const syncIndicator = document.getElementById('syncStatusIndicator');
    if (syncIndicator) {
      syncIndicator.addEventListener('click', () => {
        this.updateSyncBadge('syncing');
        this.syncCloudData({ showToast: true, forceToast: true, force: true });
      });
    }
  }

  updateSyncBadge(state) {
    const indicator = document.getElementById('syncStatusIndicator');
    const textEl = document.getElementById('syncStatusText');
    const dotEl = document.getElementById('syncStatusDot');
    if (!indicator) return;

    if (state === 'syncing') {
      indicator.className = 'sync-status-indicator syncing';
      if (textEl) textEl.textContent = this.currentLang === 'gu' ? 'સિંક...' : 'Syncing...';
      if (dotEl) dotEl.className = 'sync-dot';
      setTimeout(() => {
        this.updateSyncBadge(navigator.onLine ? 'online' : 'offline');
      }, 1200);
    } else if (state === 'offline' || !navigator.onLine) {
      indicator.className = 'sync-status-indicator offline';
      if (textEl) textEl.textContent = this.currentLang === 'gu' ? 'ઑફલાઇન' : 'Offline';
      if (dotEl) dotEl.className = 'sync-dot';
    } else {
      indicator.className = 'sync-status-indicator';
      if (textEl) textEl.textContent = this.currentLang === 'gu' ? 'લાઇવ સિંક ચાલુ' : 'Auto-Sync On';
      if (dotEl) dotEl.className = 'sync-dot pulse';
    }
  }

  loadData() {
    const saved = localStorage.getItem('momai_crm_data_v2');
    const savedVer = localStorage.getItem('momai_crm_version');
    if (savedVer) {
      this.localDataVersion = Number(savedVer) || 0;
    }
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.admin) {
          parsed.admin.phone = '+91 99250 23570';
        }
        if (!parsed.documentTypes || !Array.isArray(parsed.documentTypes) || parsed.documentTypes.length === 0) {
          parsed.documentTypes = JSON.parse(JSON.stringify(DEFAULT_DATA.documentTypes));
        }
        if (!parsed.employees || !Array.isArray(parsed.employees) || parsed.employees.length === 0) {
          parsed.employees = JSON.parse(JSON.stringify(DEFAULT_DATA.employees));
          parsed.activeEmployeeId = 'emp1';
        }
        if (!parsed.activeEmployeeId) {
          parsed.activeEmployeeId = parsed.employees[0].id;
        }
        // Ensure credentials exist
        parsed.employees.forEach(emp => {
          if (!emp.username) {
            if (emp.role === 'Admin') emp.username = 'admin';
            else emp.username = emp.name.toLowerCase().split(' ')[0];
          }
          if (!emp.password) {
            emp.password = emp.role === 'Admin' ? 'admin123' : '1234';
          }
        });
        // Ensure audit trail fields exist
        if (parsed.callingList && Array.isArray(parsed.callingList)) {
          parsed.callingList.forEach(c => {
            if (!c.createdBy) {
              const emp = (parsed.employees || []).find(e => e.id === c.assignedStaff);
              c.createdBy = emp ? emp.name : 'Momai Admin';
              c.createdById = emp ? emp.id : 'emp1';
              c.createdAt = '12 Sep 2026, 11:30 AM';
            }
          });
        }
        return parsed;
      } catch (e) {
        console.error('Error loading data from localStorage', e);
      }
    }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  saveData(options = {}) {
    const version = Date.now();
    this.localDataVersion = version;

    // 1. Instant save to local browser storage
    localStorage.setItem('momai_crm_data_v2', JSON.stringify(this.data));
    localStorage.setItem('momai_crm_version', String(version));

    // 2. Broadcast to other tabs on same machine
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({ type: 'DATA_UPDATED', version: version });
      } catch (e) {}
    }

    const activeEmp = this.getActiveEmployee();
    const payload = {
      data: this.data,
      version: version,
      deletedId: options.deletedId || null,
      deletedIds: options.deletedIds || null,
      lastModifiedBy: (activeEmp && activeEmp.name) ? activeEmp.name : 'Admin',
      lastModifiedAt: new Date().toISOString()
    };

    // 3. Multi-Laptop Cloud Sync Push (Firebase Realtime Database)
    try {
      fetch('https://momaienterprise-crm-live-default-rtdb.firebaseio.com/crm_database.json', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (e) {}

    // 4. Also push to Pantry Backup
    try {
      fetch('https://getpantry.cloud/apiv1/pantry/0726d15b-9999-4d64-9b2f-momai9925000/basket/crm_data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (e) {}

    // 5. Also push to Cloudflare Worker / local server API
    if (window.location.protocol.startsWith('http')) {
      try {
        fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      } catch (e) {}
    }
  }

  initElements() {
    // Top Bar elements
    this.langToggleBtn = document.getElementById('langToggleBtn');
    this.langEnPill = document.getElementById('langEnPill');
    this.langGuPill = document.getElementById('langGuPill');
    this.editModeToggleBtn = document.getElementById('editModeToggleBtn');
    this.editModeText = document.getElementById('editModeText');
    this.searchInput = document.getElementById('searchInput');
    this.searchBtn = document.getElementById('searchBtn');

    // Document Types management elements
    this.btnManageDocTypes = document.getElementById('btnManageDocTypes');
    this.btnSidebarManageDocs = document.getElementById('btnSidebarManageDocs');
    this.modalManageDocTypes = document.getElementById('modalManageDocTypes');
    this.formAddDocType = document.getElementById('formAddDocType');
    this.inputNewDocName = document.getElementById('inputNewDocName');
    this.docTypesManageList = document.getElementById('docTypesManageList');
    this.sidebarDocSubmenu = document.getElementById('sidebarDocSubmenu');
    this.docFilterTabsContainer = document.getElementById('docFilterTabsContainer');
    this.reportsDocBreakdownContainer = document.getElementById('reportsDocBreakdownContainer');
    this.selectCustDoc = document.getElementById('selectCustDoc');

    // Modals
    this.customerModal = document.getElementById('customerModal');
    this.customerForm = document.getElementById('customerForm');
    this.bulkModal = document.getElementById('bulkModal');
    this.importModal = document.getElementById('importModal');

    // Table bodies
    this.callingListTableBody = document.getElementById('callingListTableBody');
    this.callingListFullTableBody = document.getElementById('callingListFullTableBody');
    this.next7DaysTableBody = document.getElementById('next7DaysTableBody');
    this.next7DaysFullTableBody = document.getElementById('next7DaysFullTableBody');
    this.expiredDocsTableBody = document.getElementById('expiredDocsTableBody');
    this.expiredDocsFullTableBody = document.getElementById('expiredDocsFullTableBody');
    this.fullCustomersTableBody = document.getElementById('fullCustomersTableBody');
    this.documentsTableBody = document.getElementById('documentsTableBody');
    this.recentActivitiesList = document.getElementById('recentActivitiesList');
    this.remindersFullList = document.getElementById('remindersFullList');
    this.activitiesFullList = document.getElementById('activitiesFullList');

    // Vehicle Type Form Card buttons
    this.vTypeCards = document.querySelectorAll('.v-type-card');
    this.inputCustVehicleType = document.getElementById('inputCustVehicleType');

    // Employee & Date elements
    this.btnOpenEmployeeModal = document.getElementById('btnOpenEmployeeModal');
    this.employeeModal = document.getElementById('employeeModal');
    this.employeeCardsContainer = document.getElementById('employeeCardsContainer');
    this.newEmployeeForm = document.getElementById('newEmployeeForm');
    this.activeEmpNavName = document.getElementById('activeEmpNavName');
    this.selectCustStaff = document.getElementById('selectCustStaff');
    this.inputCustExpiry = document.getElementById('inputCustExpiry');
    this.inputCustDays = document.getElementById('inputCustDays');
    this.selectCustStatus = document.getElementById('selectCustStatus');
    this.calcHintText = document.getElementById('calcHintText');

    // Login, Logout & Master Staff Filter Elements
    this.btnSidebarStaffAccounts = document.getElementById('btnSidebarStaffAccounts');
    this.sidebarStaffCountBadge = document.getElementById('sidebarStaffCountBadge');
    this.loginOverlay = document.getElementById('loginOverlay');
    this.loginForm = document.getElementById('loginForm');
    this.loginUsername = document.getElementById('loginUsername');
    this.loginPassword = document.getElementById('loginPassword');
    this.loginErrorMsg = document.getElementById('loginErrorMsg');
    this.loginErrorText = document.getElementById('loginErrorText');
    this.btnLogout = document.getElementById('btnLogout');
    this.selectMasterStaffFilter = document.getElementById('selectMasterStaffFilter');
    this.masterStaffFilterContainer = document.getElementById('masterStaffFilterContainer');

    // Forgot Password & Verification Elements
    this.btnOpenForgotPassword = document.getElementById('btnOpenForgotPassword');
    this.modalForgotPassword = document.getElementById('modalForgotPassword');
    this.btnCloseForgotModal = document.getElementById('btnCloseForgotModal');
    this.btnCancelForgotModal = document.getElementById('btnCancelForgotModal');
    this.forgotStep1 = document.getElementById('forgotStep1');
    this.forgotStep2 = document.getElementById('forgotStep2');
    this.forgotStep3 = document.getElementById('forgotStep3');
    this.forgotIdentifier = document.getElementById('forgotIdentifier');
    this.btnSendOtp = document.getElementById('btnSendOtp');
    this.forgotSentEmail = document.getElementById('forgotSentEmail');
    this.forgotDemoOtpAlert = document.getElementById('forgotDemoOtpAlert');
    this.forgotDemoOtpVal = document.getElementById('forgotDemoOtpVal');
    this.forgotOtpInput = document.getElementById('forgotOtpInput');
    this.forgotNewPass = document.getElementById('forgotNewPass');
    this.forgotConfirmPass = document.getElementById('forgotConfirmPass');
    this.btnSubmitResetPassword = document.getElementById('btnSubmitResetPassword');
    this.btnResendOtp = document.getElementById('btnResendOtp');
    this.btnForgotBackToLogin = document.getElementById('btnForgotBackToLogin');
    this.forgotActiveIdentifier = '';
  }

  bindEvents() {
    // 1-Click Language Switch
    this.langToggleBtn.addEventListener('click', () => {
      this.toggleLanguage();
    });

    // Edit Mode Switch (safe check if present)
    if (this.editModeToggleBtn) {
      this.editModeToggleBtn.addEventListener('click', () => {
        this.toggleEditMode();
      });
    }

    // Document Types Management Modal
    if (this.btnManageDocTypes) {
      this.btnManageDocTypes.addEventListener('click', () => {
        this.openManageDocTypesModal();
      });
    }
    if (this.btnSidebarManageDocs) {
      this.btnSidebarManageDocs.addEventListener('click', (e) => {
        e.preventDefault();
        this.openManageDocTypesModal();
      });
    }
    if (this.formAddDocType) {
      this.formAddDocType.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddDocumentType();
      });
    }

    // Search input & clickable button
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.filterAllViews(e.target.value);
      });
      this.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.filterAllViews(this.searchInput.value);
        }
      });
    }

    if (this.searchBtn) {
      this.searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const val = this.searchInput ? this.searchInput.value : '';
        this.filterAllViews(val);
        if (val.trim()) {
          this.showToast(this.currentLang === 'gu' ? `શોધ પરિણામો: "${val}"` : `Search results for: "${val}"`, 'info');
        }
      });
    }

    // Brand logo click -> returns to dashboard
    document.getElementById('btnBrandLogo').addEventListener('click', () => {
      this.navigateTo('dashboard');
    });

    // Back to Dashboard buttons (all secondary views)
    document.querySelectorAll('[data-action="back-dashboard"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.navigateTo('dashboard');
      });
    });

    // Vehicle Type Selector in Add/Edit Modal
    this.vTypeCards.forEach(card => {
      card.addEventListener('click', () => {
        this.vTypeCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.inputCustVehicleType.value = card.getAttribute('data-vtype');
      });
    });

    // Quick Action Buttons
    document.getElementById('btnQuickAddCustomer').addEventListener('click', () => {
      this.openCustomerModal();
    });
    document.getElementById('btnTableAddCustomer').addEventListener('click', () => {
      this.openCustomerModal();
    });
    document.getElementById('btnCustPageAdd').addEventListener('click', () => {
      this.openCustomerModal();
    });
    document.getElementById('btnSidebarAddCustomer').addEventListener('click', (e) => {
      e.preventDefault();
      this.openCustomerModal();
    });
    const btnBulkReminder = document.getElementById('btnBulkReminder');
    if (btnBulkReminder) {
      btnBulkReminder.addEventListener('click', () => {
        this.openBulkModal();
      });
    }
    const btnCallingBulk = document.getElementById('btnCallingBulk');
    if (btnCallingBulk) {
      btnCallingBulk.addEventListener('click', () => {
        this.openBulkModal();
      });
    }
    const btnRemindersNewBulk = document.getElementById('btnRemindersNewBulk');
    if (btnRemindersNewBulk) {
      btnRemindersNewBulk.addEventListener('click', () => {
        this.openBulkModal();
      });
    }
    const btnImportExcel = document.getElementById('btnImportExcel');
    if (btnImportExcel) {
      btnImportExcel.addEventListener('click', () => {
        this.openImportModal();
      });
    }
    const btnNavSettings = document.getElementById('btnNavSettings');
    if (btnNavSettings) {
      btnNavSettings.addEventListener('click', (e) => {
        e.preventDefault();
        this.openImportModal();
      });
    }

    // Close Modals (Buttons, Backdrop click, and Escape key)
    document.querySelectorAll('.modal-close-btn, .modal-cancel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeModals();
      });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeModals();
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModals();
      }
    });

    // Customer Form Submit
    this.customerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveCustomerForm();
    });

    // Bulk Reminder Send
    document.getElementById('btnSendBulkConfirm').addEventListener('click', () => {
      this.handleSendBulk();
    });

    // Excel (.xlsx) & CSV Export
    document.getElementById('btnExportExcelFile').addEventListener('click', () => {
      this.exportCustomersToExcel();
    });
    document.getElementById('btnExportCustExcel').addEventListener('click', () => {
      this.exportCustomersToExcel();
    });
    document.getElementById('btnExportReportsExcel').addEventListener('click', () => {
      this.exportCustomersToExcel();
    });
    document.getElementById('btnExportCsv').addEventListener('click', () => {
      this.exportCustomersToCSV();
    });

    // Download Sample Excel Template
    document.getElementById('btnDownloadSampleExcel').addEventListener('click', () => {
      this.downloadSampleExcelTemplate();
    });

    // Full JSON Backup & Restore
    document.getElementById('btnDownloadBackup').addEventListener('click', () => {
      this.downloadFullBackup();
    });
    document.getElementById('btnRestoreBackupTrigger').addEventListener('click', () => {
      document.getElementById('backupFileInput').click();
    });
    document.getElementById('backupFileInput').addEventListener('change', (e) => {
      this.restoreFromBackup(e.target.files[0]);
    });

    // Import Excel/CSV File
    document.getElementById('excelFileInput').addEventListener('change', (e) => {
      this.handleFileUpload(e.target.files[0]);
    });

    // Reset Defaults
    document.getElementById('btnResetDefaults').addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all data back to defaults? / શું તમે મૂળ ડેટા પાછો લાવવા માંગો છો?')) {
        this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
        this.saveData();
        this.render();
        this.showToast(this.t('toastSaved'), 'success');
        this.closeModals();
      }
    });

    // Employee Profile & Staff Management
    if (this.btnSidebarStaffAccounts) {
      this.btnSidebarStaffAccounts.addEventListener('click', (e) => {
        e.preventDefault();
        this.openEmployeeModal();
      });
    }

    if (this.btnOpenEmployeeModal) {
      this.btnOpenEmployeeModal.addEventListener('click', () => {
        this.openEmployeeModal();
      });
    }

    const userProfileBadge = document.getElementById('userProfileBadge');
    if (userProfileBadge) {
      userProfileBadge.addEventListener('click', () => {
        this.openEmployeeModal();
      });
    }

    if (this.newEmployeeForm) {
      this.newEmployeeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveNewEmployee();
      });
    }

    // Real-time Expiry Date Calendar calculation
    if (this.inputCustExpiry) {
      this.inputCustExpiry.addEventListener('input', () => {
        this.handleExpiryDateCalculation();
      });
      this.inputCustExpiry.addEventListener('change', () => {
        this.handleExpiryDateCalculation();
      });
    }

    document.getElementById('supportPhoneText').addEventListener('click', (e) => {
      e.preventDefault();
      const newPhone = prompt('Enter Support Contact Number:', this.data.admin.phone);
      if (newPhone) {
        this.data.admin.phone = newPhone.trim();
        this.saveData();
        this.render();
        this.showToast(this.t('toastSaved'), 'success');
      }
    });

    // Quick Remark Presets
    document.querySelectorAll('.quick-remark-presets .preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const preset = chip.getAttribute('data-preset');
        const input = document.getElementById('inputQuickRemarkText');
        if (input) input.value = preset;
      });
    });

    const btnSaveQuickRemark = document.getElementById('btnSaveQuickRemark');
    if (btnSaveQuickRemark) {
      btnSaveQuickRemark.addEventListener('click', () => {
        this.saveQuickRemark();
      });
    }

    const inputQuickRemarkText = document.getElementById('inputQuickRemarkText');
    if (inputQuickRemarkText) {
      inputQuickRemarkText.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.saveQuickRemark();
        }
      });
    }

    // Call Modal Copy Button
    const btnCopyCallPhone = document.getElementById('btnCopyCallPhone');
    if (btnCopyCallPhone) {
      btnCopyCallPhone.addEventListener('click', () => {
        const phone = this.activeCallCustomer ? (this.activeCallCustomer.phone || '') : '';
        if (phone && navigator.clipboard) {
          navigator.clipboard.writeText(phone).then(() => {
            this.showToast('Mobile number copied! / નંબર કોપી થયો!', 'success');
          });
        }
      });
    }

    // Global Delegated Click Handler for all Table Actions (Call, WhatsApp, Remarks, Print, etc.)
    document.addEventListener('click', (e) => {
      const actionEl = e.target.closest('[data-action]');
      if (actionEl) {
        const action = actionEl.getAttribute('data-action');
        const id = actionEl.getAttribute('data-id');
        if (action && id) {
          e.preventDefault();
          e.stopPropagation();
          this.handleRowAction(action, id, e);
        }
      }
    });

    // WhatsApp Template Buttons
    document.querySelectorAll('.wa-tpl-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.wa-tpl-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tplType = btn.getAttribute('data-tpl');
        this.renderWhatsAppTemplateText(tplType);
      });
    });

    const waTextarea = document.getElementById('waMessageTextarea');
    if (waTextarea) {
      waTextarea.addEventListener('input', () => {
        const countSpan = document.getElementById('waCharCount');
        if (countSpan) countSpan.textContent = `${waTextarea.value.length} chars`;
      });
    }

    const btnCopyWaMessage = document.getElementById('btnCopyWaMessage');
    if (btnCopyWaMessage) {
      btnCopyWaMessage.addEventListener('click', () => {
        const text = waTextarea ? waTextarea.value : '';
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => {
            this.showToast('Message copied! / મેસેજ કોપી થયો!', 'success');
          });
        }
      });
    }

    const btnSendWaModal = document.getElementById('btnSendWaModal');
    if (btnSendWaModal) {
      btnSendWaModal.addEventListener('click', () => {
        this.sendWhatsAppFromModal('web');
      });
    }

    const btnSendWaAppModal = document.getElementById('btnSendWaAppModal');
    if (btnSendWaAppModal) {
      btnSendWaAppModal.addEventListener('click', () => {
        this.sendWhatsAppFromModal('app');
      });
    }

    const btnSendWaWebModal = document.getElementById('btnSendWaWebModal');
    if (btnSendWaWebModal) {
      btnSendWaWebModal.addEventListener('click', () => {
        this.sendWhatsAppFromModal('web');
      });
    }

    // Print Receipt Voucher Button
    const btnPrintVoucherBtn = document.getElementById('btnPrintVoucherBtn');
    if (btnPrintVoucherBtn) {
      btnPrintVoucherBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Metric cards click-to-edit
    document.querySelectorAll('[data-metric-key]').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.metric-link')) return; // Ignore link clicks
        const key = el.getAttribute('data-metric-key');
        const currentVal = this.data.metrics[key];
        const newVal = prompt(`Edit metric (${key}):`, currentVal);
        if (newVal !== null && newVal.trim() !== '') {
          this.data.metrics[key] = newVal.trim();
          this.saveData();
          this.render();
          this.showToast(this.t('toastSaved'), 'success');
        }
      });
    });

    // Vehicle Filter buttons (All / 2W / 4W / Commercial)
    document.querySelectorAll('.v-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const table = btn.getAttribute('data-vtable');
        const filter = btn.getAttribute('data-vfilter');

        // Toggle active button in group
        btn.parentElement.querySelectorAll('.v-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (table === 'customers') {
          this.custVFilter = filter;
          this.renderFullCustomersTable();
        } else if (table === 'documents') {
          this.docVFilter = filter;
          this.renderDocumentsTable();
        } else if (table === 'calling') {
          this.callingVFilter = filter;
          this.renderCallingListFullTable();
        }
      });
    });

    // Document Sub-tabs (All, Insurance, Fitness, PUC, Expired)
    document.querySelectorAll('.doc-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.doc-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.docActiveTab = btn.getAttribute('data-tab-name');
        this.renderDocumentsTable();
      });
    });

    // View triggers (Links like "View All →", "View List →", or sidebar items)
    document.querySelectorAll('[data-view-trigger]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = el.getAttribute('data-view-trigger');
        const docTab = el.getAttribute('data-doc-tab');
        if (docTab) {
          this.setDocTab(docTab);
        }
        this.navigateTo(targetView);
      });
    });

    // Sidebar Dropdown Nav Groups (Toggle Sub-menu on Header or Chevron click)
    document.querySelectorAll('.nav-group').forEach(group => {
      const header = group.querySelector('.nav-group-header');
      const chevron = group.querySelector('.chevron');
      if (chevron) {
        chevron.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          group.classList.toggle('open');
        });
      }
      if (header) {
        header.addEventListener('click', (e) => {
          if (!e.target.closest('.chevron')) {
            group.classList.toggle('open');
          }
        });
      }
    });

    document.querySelectorAll('[data-view-target]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = el.getAttribute('data-view-target');
        const docTab = el.getAttribute('data-doc-tab');
        if (docTab) {
          this.setDocTab(docTab);
        }
        this.navigateTo(targetView);
      });
    });

    // Login Form Submit
    if (this.loginForm) {
      this.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLoginSubmit();
      });
    }

    // Forgot Password & Reset Modal Events
    if (this.btnOpenForgotPassword) {
      this.btnOpenForgotPassword.addEventListener('click', (e) => {
        e.preventDefault();
        this.openForgotPasswordModal();
      });
    }

    if (this.btnCloseForgotModal) {
      this.btnCloseForgotModal.addEventListener('click', () => {
        this.closeForgotPasswordModal();
      });
    }

    if (this.btnCancelForgotModal) {
      this.btnCancelForgotModal.addEventListener('click', () => {
        this.closeForgotPasswordModal();
      });
    }

    if (this.btnSendOtp) {
      this.btnSendOtp.addEventListener('click', () => {
        this.sendForgotPasswordOtp();
      });
    }

    if (this.btnResendOtp) {
      this.btnResendOtp.addEventListener('click', () => {
        this.sendForgotPasswordOtp();
      });
    }

    if (this.btnSubmitResetPassword) {
      this.btnSubmitResetPassword.addEventListener('click', () => {
        this.submitPasswordReset();
      });
    }

    if (this.btnForgotBackToLogin) {
      this.btnForgotBackToLogin.addEventListener('click', () => {
        this.closeForgotPasswordModal();
        if (this.loginUsername && this.forgotActiveIdentifier) {
          this.loginUsername.value = this.forgotActiveIdentifier;
        }
        if (this.loginPassword) {
          this.loginPassword.value = '';
          this.loginPassword.focus();
        }
      });
    }

    // Edit Profile Modal Events
    const formEditProfile = document.getElementById('formEditProfile');
    if (formEditProfile) {
      formEditProfile.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEditProfileSubmit();
      });
    }

    const btnCloseEditProfileModal = document.getElementById('btnCloseEditProfileModal');
    if (btnCloseEditProfileModal) {
      btnCloseEditProfileModal.addEventListener('click', () => {
        this.closeEditProfileModal();
      });
    }

    const btnCancelEditProfileModal = document.getElementById('btnCancelEditProfileModal');
    if (btnCancelEditProfileModal) {
      btnCancelEditProfileModal.addEventListener('click', () => {
        this.closeEditProfileModal();
      });
    }

    // Quick Login Demo Chips
    document.querySelectorAll('.demo-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const u = btn.getAttribute('data-demo-user');
        const p = btn.getAttribute('data-demo-pass');
        if (this.loginUsername) this.loginUsername.value = u;
        if (this.loginPassword) this.loginPassword.value = p;
        this.handleLoginSubmit();
      });
    });

    // Logout Button
    if (this.btnLogout) {
      this.btnLogout.addEventListener('click', () => {
        this.logout();
      });
    }

    // Master Staff Filter Change
    if (this.selectMasterStaffFilter) {
      this.selectMasterStaffFilter.addEventListener('change', (e) => {
        this.masterStaffFilter = e.target.value;
        this.renderCallingList(this.getFilteredCallingList());
        this.renderFullCustomersTable();
        this.renderCallingListFullTable();
      });
    }
  }

  bindRouting() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      this.handleHashRoute(hash);
    });

    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
      this.handleHashRoute(initialHash);
    }
  }

  handleHashRoute(hash) {
    if (!hash || hash === 'dashboard') {
      this.navigateTo('dashboard', false);
    } else if (hash.startsWith('reset-password')) {
      const hashQuery = hash.includes('?') ? hash.split('?')[1] : '';
      const params = new URLSearchParams(hashQuery);
      const user = params.get('user') || 'admin';
      const token = params.get('token') || '';
      const otp = params.get('otp') || '';
      this.openPasswordResetDirect(user, token, otp);
    } else if (hash === 'customers' || hash === 'all-customers') {
      this.navigateTo('customers', false);
    } else if (hash.startsWith('documents')) {
      if (hash.includes('insurance')) this.setDocTab('insurance');
      else if (hash.includes('fitness')) this.setDocTab('fitness');
      else if (hash.includes('puc')) this.setDocTab('puc');
      else if (hash.includes('expired')) this.setDocTab('expired');
      this.navigateTo('documents', false);
    } else if (hash === 'calling-list' || hash === 'view-all-calling') {
      this.navigateTo('calling-list', false);
    } else if (hash === 'next-7-days' || hash === 'view-all-7days') {
      this.navigateTo('next-7-days', false);
    } else if (hash === 'expired-docs' || hash === 'view-all-expired') {
      this.navigateTo('expired-docs', false);
    } else if (hash === 'followups' || hash === 'follow-ups') {
      this.navigateTo('followups', false);
    } else if (hash === 'reminders') {
      this.navigateTo('reminders', false);
    } else if (hash === 'reports') {
      this.navigateTo('reports', false);
    } else if (hash === 'activities') {
      this.navigateTo('activities', false);
    }
  }

  setDocTab(tabName) {
    this.docActiveTab = tabName;
    document.querySelectorAll('.doc-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-tab-name') === tabName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  navigateTo(viewName, updateHash = true) {
    this.currentView = viewName;

    // View Mapping
    const viewMap = {
      'dashboard': 'viewDashboard',
      'customers': 'viewCustomers',
      'documents': 'viewDocuments',
      'calling-list': 'viewCallingList',
      'followups': 'viewCallingList',
      'next-7-days': 'viewNext7Days',
      'expired-docs': 'viewExpiredDocs',
      'reminders': 'viewReminders',
      'reports': 'viewReports',
      'activities': 'viewActivities'
    };

    const targetSectionId = viewMap[viewName] || 'viewDashboard';

    // Hide all view sections, show target section
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const targetSection = document.getElementById(targetSectionId);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Update sidebar navigation active states
    document.querySelectorAll('.nav-item, .nav-sub-item').forEach(item => {
      item.classList.remove('active');
    });

    if (viewName === 'dashboard') {
      document.getElementById('navItemDashboard').classList.add('active');
    } else if (viewName === 'customers') {
      document.getElementById('navSubAllCustomers').classList.add('active');
    } else if (viewName === 'followups') {
      document.getElementById('navSubFollowups').classList.add('active');
    } else if (viewName === 'reminders') {
      document.getElementById('navItemReminders').classList.add('active');
    } else if (viewName === 'reports') {
      document.getElementById('navItemReports').classList.add('active');
    }

    if (updateHash) {
      window.location.hash = viewName;
    }

    // Scroll to top
    document.querySelector('.main-wrapper').scrollTop = 0;

    // Refresh rendering of the target view
    this.renderViewData(viewName);
  }

  renderViewData(viewName) {
    if (viewName === 'customers') {
      this.renderFullCustomersTable();
    } else if (viewName === 'documents') {
      this.renderDocumentsTable();
    } else if (viewName === 'calling-list' || viewName === 'followups') {
      this.renderCallingListFullTable();
    } else if (viewName === 'next-7-days') {
      this.renderNext7DaysFullTable();
    } else if (viewName === 'expired-docs') {
      this.renderExpiredDocsFullTable();
    } else if (viewName === 'reminders') {
      this.renderRemindersFullList();
    } else if (viewName === 'reports') {
      this.renderReportsStats();
    } else if (viewName === 'activities') {
      this.renderActivitiesFullList();
    }
  }

  t(key) {
    return TRANSLATIONS[this.currentLang][key] || TRANSLATIONS['en'][key] || key;
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'gu' : 'en';
    localStorage.setItem('autocare_lang', this.currentLang);
    this.render();
    this.showToast(this.currentLang === 'gu' ? 'ભાષા ગુજરાતીમાં બદલાઈ ગઈ છે!' : 'Language switched to English!', 'success');
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    document.body.classList.toggle('edit-mode-active', this.editMode);
    if (this.editModeToggleBtn) this.editModeToggleBtn.classList.toggle('active', this.editMode);
    if (this.editModeText) this.editModeText.textContent = this.editMode ? this.t('editModeOn') : this.t('editModeOff');
    this.showToast(this.editMode ? 'Edit mode enabled! Click any item to modify.' : 'Edit mode disabled.', 'success');
  }

  getVehicleBadgeHtml(type) {
    const t = (type || '4-wheeler').toLowerCase();
    if (t.includes('2') || t.includes('bike') || t.includes('two')) {
      return `<span class="vehicle-badge badge-2w" title="Two Wheeler">🏍️ 2W</span>`;
    }
    if (t.includes('comm') || t.includes('heavy') || t.includes('truck')) {
      return `<span class="vehicle-badge badge-comm" title="Commercial">🚚 COM</span>`;
    }
    return `<span class="vehicle-badge badge-4w" title="Four Wheeler">🚗 4W</span>`;
  }

  render() {
    // 1. Language pill update
    if (this.currentLang === 'gu') {
      this.langGuPill.classList.add('active');
      this.langEnPill.classList.remove('active');
    } else {
      this.langEnPill.classList.add('active');
      this.langGuPill.classList.remove('active');
    }

    // 2. Translate all static data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });

    // 3. Update placeholders & texts
    if (this.searchInput) this.searchInput.placeholder = this.t('searchPlaceholder');
    if (this.editModeText) this.editModeText.textContent = this.editMode ? this.t('editModeOn') : this.t('editModeOff');

    // 4. Update Profile & Active Employee info
    const activeEmp = this.getActiveEmployee();
    const isAdmin = this.isCurrentUserAdmin();

    if (this.activeEmpNavName) {
      this.activeEmpNavName.textContent = `${activeEmp.name} (${activeEmp.role})`;
    }
    const empInitials = activeEmp.initials || activeEmp.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || 'EM';
    const adminInitialsEl = document.getElementById('adminInitials');
    if (adminInitialsEl) adminInitialsEl.textContent = empInitials;
    const adminNameEl = document.getElementById('adminName');
    if (adminNameEl) adminNameEl.textContent = activeEmp.name;
    const adminRoleEl = document.getElementById('adminRole');
    if (adminRoleEl) adminRoleEl.textContent = activeEmp.role;
    const welcomeHeadingEl = document.getElementById('welcomeHeading');
    if (welcomeHeadingEl) welcomeHeadingEl.textContent = `${this.t('welcomeBack')}${activeEmp.name.split(' ')[0]}!`;
    const supportPhoneTextEl = document.getElementById('supportPhoneText');
    if (supportPhoneTextEl) {
      supportPhoneTextEl.textContent = this.data.admin.phone;
      supportPhoneTextEl.href = `tel:${this.data.admin.phone.replace(/\s+/g, '')}`;
    }

    // Admin-specific controls visibility
    if (this.btnOpenEmployeeModal) {
      this.btnOpenEmployeeModal.style.display = isAdmin ? 'flex' : 'none';
    }
    if (this.masterStaffFilterContainer) {
      this.masterStaffFilterContainer.style.display = isAdmin ? 'flex' : 'none';
      if (isAdmin) {
        this.renderMasterStaffFilter();
      }
    }
    const btnResetDefaults = document.getElementById('btnResetDefaults');
    if (btnResetDefaults) {
      btnResetDefaults.style.display = isAdmin ? 'inline-block' : 'none';
    }

    // 5. Update Dynamic Metrics & docStatus from live customer data
    this.updateMetricsFromData();

    // Update Metrics Cards
    const valTotalCustomers = document.getElementById('valTotalCustomers');
    if (valTotalCustomers) valTotalCustomers.textContent = this.data.metrics.totalCustomers || '0';
    const subTotalCustomers = document.getElementById('subTotalCustomers');
    if (subTotalCustomers) subTotalCustomers.textContent = this.data.metrics.totalCustomersSub || '0 this month';
    const valTodayFollowups = document.getElementById('valTodayFollowups');
    if (valTodayFollowups) valTodayFollowups.textContent = this.data.metrics.todayFollowups || '0';
    const valExpiredDocs = document.getElementById('valExpiredDocs');
    if (valExpiredDocs) valExpiredDocs.textContent = this.data.metrics.expiredDocs || '0';
    const valNext7Days = document.getElementById('valNext7Days');
    if (valNext7Days) valNext7Days.textContent = this.data.metrics.next7Days || '0';
    const valNext30Days = document.getElementById('valNext30Days');
    if (valNext30Days) valNext30Days.textContent = this.data.metrics.next30Days || '0';

    // 6. Update Document Status widget counts
    const setSafeText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };
    const ds = this.data.docStatus || {};
    setSafeText('countInsuranceExpiring', `${ds.insuranceExpiring !== undefined ? ds.insuranceExpiring : 0} ${this.t('expiringLabel')}`);
    setSafeText('countInsuranceExpired', `${ds.insuranceExpired !== undefined ? ds.insuranceExpired : 0} ${this.t('expiredLabel')}`);
    setSafeText('countFitnessExpiring', `${ds.fitnessExpiring !== undefined ? ds.fitnessExpiring : 0} ${this.t('expiringLabel')}`);
    setSafeText('countFitnessExpired', `${ds.fitnessExpired !== undefined ? ds.fitnessExpired : 0} ${this.t('expiredLabel')}`);
    setSafeText('countPucExpiring', `${ds.pucExpiring !== undefined ? ds.pucExpiring : 0} ${this.t('expiringLabel')}`);
    setSafeText('countPucExpired', `${ds.pucExpired !== undefined ? ds.pucExpired : 0} ${this.t('expiredLabel')}`);
    setSafeText('countNewLicenceExpiring', `${ds.newLicenceExpiring !== undefined ? ds.newLicenceExpiring : 0} ${this.currentLang === 'gu' ? 'સક્રિય' : 'Active'}`);
    setSafeText('countNewLicenceExpired', `${ds.newLicenceExpired !== undefined ? ds.newLicenceExpired : 0} ${this.t('expiredLabel')}`);
    setSafeText('countRenewalLicenceExpiring', `${ds.renewalLicenceExpiring !== undefined ? ds.renewalLicenceExpiring : 0} ${this.t('expiringLabel')}`);
    setSafeText('countRenewalLicenceExpired', `${ds.renewalLicenceExpired !== undefined ? ds.renewalLicenceExpired : 0} ${this.t('expiredLabel')}`);
    setSafeText('countRcTransferExpiring', `${ds.rcTransferExpiring !== undefined ? ds.rcTransferExpiring : 0} ${this.currentLang === 'gu' ? 'ચાલુ' : 'In Progress'}`);
    setSafeText('countRcTransferExpired', `${ds.rcTransferExpired !== undefined ? ds.rcTransferExpired : 0} ${this.currentLang === 'gu' ? 'બાકી' : 'Pending'}`);
    setSafeText('countVehiclePassingExpiring', `${ds.vehiclePassingExpiring !== undefined ? ds.vehiclePassingExpiring : 0} ${this.t('expiringLabel')}`);
    setSafeText('countVehiclePassingExpired', `${ds.vehiclePassingExpired !== undefined ? ds.vehiclePassingExpired : 0} ${this.t('expiredLabel')}`);

    // 7. Update Dynamic Document Types across all UI components
    this.renderDynamicDocumentTypes();

    // Update Calling List Count in Card Title & Badges
    const filteredCalling = this.getFilteredCallingList();
    const callingListCountEl = document.getElementById('callingListCount');
    if (callingListCountEl) callingListCountEl.textContent = `(${filteredCalling.length} ${this.t('navCustomers')})`;
    const next7Items = this.getNext7DaysList();
    const expiredItems = this.getExpiredDocsList();
    const next7DaysCountEl = document.getElementById('next7DaysCount');
    if (next7DaysCountEl) next7DaysCountEl.textContent = `(${next7Items.length})`;
    const expiredDocsCountEl = document.getElementById('expiredDocsCount');
    if (expiredDocsCountEl) expiredDocsCountEl.textContent = `(${expiredItems.length})`;
    const custTotalCountBadgeEl = document.getElementById('custTotalCountBadge');
    if (custTotalCountBadgeEl) custTotalCountBadgeEl.textContent = `(${filteredCalling.length})`;

    // 8. Render Dynamic Tables & Lists
    this.renderCallingList(filteredCalling);
    this.renderNext7DaysList();
    this.renderExpiredDocsList();
    this.renderActivities();
    this.renderReportsStats();

    // Render current active view
    this.renderViewData(this.currentView);
  }

  updateMetricsFromData() {
    if (!this.data.callingList) return;
    const list = this.data.callingList;

    let todayCount = 0;
    let expiredCount = 0;
    let next7Count = 0;
    let next30Count = 0;

    const docCounts = {
      insuranceExpiring: 0,
      insuranceExpired: 0,
      fitnessExpiring: 0,
      fitnessExpired: 0,
      pucExpiring: 0,
      pucExpired: 0,
      newLicenceExpiring: 0,
      newLicenceExpired: 0,
      renewalLicenceExpiring: 0,
      renewalLicenceExpired: 0,
      rcTransferExpiring: 0,
      rcTransferExpired: 0,
      vehiclePassingExpiring: 0,
      vehiclePassingExpired: 0
    };

    list.forEach(c => {
      const days = this.getDaysRemainingNumber(c);
      const isExp = (c.status || '').toLowerCase().includes('expired') || days < 0;
      const isToday = (c.status || '').toLowerCase().includes('today') || days === 0;

      if (isToday) todayCount++;
      if (isExp) expiredCount++;
      if (!isExp && days >= 0 && days <= 7) next7Count++;
      if (!isExp && days >= 0 && days <= 30) next30Count++;

      const d = (c.doc || '').toLowerCase();
      let keyPrefix = '';
      if (d.includes('insurance')) keyPrefix = 'insurance';
      else if (d.includes('fitness')) keyPrefix = 'fitness';
      else if (d.includes('puc')) keyPrefix = 'puc';
      else if (d.includes('new driving') || d.includes('new licence') || d.includes('new license')) keyPrefix = 'newLicence';
      else if (d.includes('renewal')) keyPrefix = 'renewalLicence';
      else if (d.includes('rc transfer') || d.includes('transfer')) keyPrefix = 'rcTransfer';
      else if (d.includes('vehicle passing') || d.includes('passing')) keyPrefix = 'vehiclePassing';

      if (keyPrefix) {
        if (isExp) docCounts[keyPrefix + 'Expired'] = (docCounts[keyPrefix + 'Expired'] || 0) + 1;
        else docCounts[keyPrefix + 'Expiring'] = (docCounts[keyPrefix + 'Expiring'] || 0) + 1;
      }
    });

    if (!this.editMode) {
      this.data.metrics = {
        totalCustomers: String(list.length),
        totalCustomersSub: `${list.length} this month`,
        todayFollowups: String(todayCount),
        expiredDocs: String(expiredCount),
        next7Days: String(next7Count),
        next30Days: String(next30Count)
      };
      this.data.docStatus = { ...docCounts };
    }
  }

  getStatusBadgeClass(status) {
    const s = (status || '').toLowerCase();
    if (s.includes('renew')) return 'status-renewed';
    if (s.includes('today')) return 'status-expiry-today';
    if (s.includes('due') || s.includes('soon')) return 'status-due-soon';
    if (s.includes('upcoming')) return 'status-upcoming';
    return 'status-expired';
  }

  getTranslatedStatus(status) {
    const s = (status || '').toLowerCase();
    if (s.includes('renew')) return this.t('statusRenewed');
    if (s.includes('today')) return this.t('statusExpiryToday');
    if (s.includes('due') || s.includes('soon')) return this.t('statusDueSoon');
    if (s.includes('upcoming')) return this.t('statusUpcoming');
    if (s.includes('expired')) return this.t('statusExpired');
    return status;
  }

  getTranslatedDoc(doc) {
    const d = (doc || '').toLowerCase();
    if (d.includes('new driving') || d.includes('new licence') || d.includes('new license')) return this.t('docNewDrivingLicence');
    if (d.includes('renewal licence') || d.includes('renewal license') || (d.includes('licen') && d.includes('renew'))) return this.t('docRenewalLicence');
    if (d.includes('rc transfer') || d.includes('rc trasfer') || d.includes('transfer')) return this.t('docRcTransfer');
    if (d.includes('vehicle passing') || d.includes('passing')) return this.t('docVehiclePassing');
    if (d.includes('insurance')) return this.t('docInsurance');
    if (d.includes('fitness')) return this.t('docFitness');
    if (d.includes('puc')) return this.t('docPuc');
    return doc;
  }

  getEntryByBadgeHtml(c) {
    let creator = c.createdBy;
    if (!creator) {
      creator = c.assignedStaff ? this.getEmployeeName(c.assignedStaff) : 'Sabir Ajmeri';
    }
    const shortName = (creator || 'Staff').split(' ')[0];
    const tooltip = `Created by: ${creator || 'Staff'}${c.createdAt ? ' on ' + c.createdAt : ''}${c.lastModifiedBy ? ' • Modified by: ' + c.lastModifiedBy + (c.lastModifiedAt ? ' on ' + c.lastModifiedAt : '') : ''}`;
    return `<span class="entry-by-badge" title="${this.escapeHtml(tooltip)}"><span class="badge-icon">👤</span> ${this.escapeHtml(shortName)}</span>`;
  }

  // --- Render Dashboard Calling List (Table in Card) ---
  renderCallingList(list) {
    this.callingListTableBody.innerHTML = '';
    const rawRecords = list !== undefined ? list : this.getFilteredCallingList();
    const records = this.sortCallingList(rawRecords);
    if (!records || records.length === 0) {
      this.callingListTableBody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding: 24px; color: #94a3b8;">No matching records found</td></tr>`;
      return;
    }

    records.forEach((c, index) => {
      const tr = document.createElement('tr');
      if (c.contacted || c.status === 'Renewed') {
        tr.classList.add('row-contacted');
      }
      const badgeClass = this.getStatusBadgeClass(c.status);
      const translatedStatus = this.getTranslatedStatus(c.status);
      const translatedDoc = this.getTranslatedDoc(c.doc);
      const daysClass = c.daysType === 'red' || c.daysLeft.toLowerCase().includes('today') ? 'col-days-red' : 'col-days-normal';
      const vBadge = this.getVehicleBadgeHtml(c.vehicleType);
      const entryBadge = this.getEntryByBadgeHtml(c);
      const remarksHtml = c.remarks
        ? `<span class="cust-remark-chip" data-action="quick-remark" data-id="${c.id}" title="${this.escapeHtml(c.remarks)}">💬 ${this.escapeHtml(c.remarks)}</span>`
        : `<button class="btn-add-remark" data-action="quick-remark" data-id="${c.id}" title="Add follow-up note / નોંધ ઉમેરો">+ Note</button>`;

      tr.innerHTML = `
        <td class="col-num">${index + 1}</td>
        <td class="col-customer editable-field" data-id="${c.id}" data-field="name" title="Double-click to edit">${this.escapeHtml(c.name)}</td>
        <td>${vBadge}<span class="col-vehicle editable-field" data-id="${c.id}" data-field="vehicle" title="Double-click to edit">${this.escapeHtml(c.vehicle)}</span></td>
        <td class="editable-field" data-id="${c.id}" data-field="doc" title="Double-click to edit">${this.escapeHtml(translatedDoc)}</td>
        <td class="editable-field" data-id="${c.id}" data-field="expiry" title="Double-click to edit">${this.escapeHtml(c.expiry)}</td>
        <td class="${daysClass} editable-field" data-id="${c.id}" data-field="daysLeft" title="Double-click to edit">${this.escapeHtml(c.daysLeft)}</td>
        <td>
          <span class="status-pill clickable ${badgeClass}" data-status-id="${c.id}" title="Click to change status / સ્થિતિ બદલવા માટે ક્લિક કરો">
            <span class="status-dot"></span>
            ${translatedStatus}
          </span>
        </td>
        <td>${entryBadge}</td>
        <td>${remarksHtml}</td>
        <td>
          <div class="action-buttons-group">
            <button type="button" class="action-icon-btn btn-whatsapp" title="WhatsApp Reminder" data-action="whatsapp" data-id="${c.id}">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.78 14.07c-.24.68-1.39 1.3-1.92 1.38-.5.08-1.14.12-3.66-.92-3.23-1.34-5.3-4.63-5.46-4.85-.16-.22-1.3-1.74-1.3-3.32 0-1.58.82-2.36 1.12-2.68.29-.32.65-.4 0.86-.4.22 0 .43 0 .62.01.2.01.47-.08.73.56.27.68.92 2.36.99 2.53.08.17.13.37.02.59-.11.22-.16.35-.32.55-.16.19-.34.42-.48.57-.16.16-.33.34-.14.67.19.32.84 1.39 1.8 2.25 1.24 1.1 2.29 1.45 2.62 1.61.32.16.51.14.7-.08.19-.22.81-.95 1.03-1.27.22-.32.43-.27.73-.16.29.11 1.87.88 2.19 1.04.32.16.54.24.62.38.08.14.08.82-.16 1.5z"/></svg>
            </button>
            <button class="action-icon-btn btn-edit-row" title="Edit Customer" data-action="edit" data-id="${c.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
            <button class="action-icon-btn btn-delete-row" title="Delete Customer" data-action="delete" data-id="${c.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </td>
      `;

      this.bindRowActions(tr);
      this.callingListTableBody.appendChild(tr);
    });
  }

  // --- Render Full Customers View Table ---
  renderFullCustomersTable(customList = null) {
    this.fullCustomersTableBody.innerHTML = '';
    let list = customList !== null ? customList : this.getFilteredCallingList();

    if (this.custVFilter !== 'all') {
      list = list.filter(c => (c.vehicleType || '4-wheeler') === this.custVFilter);
    }
    list = this.sortByExpiryDays(list);

    if (!list || list.length === 0) {
      this.fullCustomersTableBody.innerHTML = `<tr><td colspan="11" style="text-align:center; padding: 24px; color: #94a3b8;">No customers matching filter</td></tr>`;
      return;
    }

    list.forEach((c, index) => {
      const tr = document.createElement('tr');
      const badgeClass = this.getStatusBadgeClass(c.status);
      const translatedStatus = this.getTranslatedStatus(c.status);
      const translatedDoc = this.getTranslatedDoc(c.doc);
      const daysClass = c.daysType === 'red' || c.daysLeft.toLowerCase().includes('today') ? 'col-days-red' : 'col-days-normal';
      const vBadge = this.getVehicleBadgeHtml(c.vehicleType);
      const entryBadge = this.getEntryByBadgeHtml(c);
      const remarksHtml = c.remarks
        ? `<span class="cust-remark-chip" data-action="quick-remark" data-id="${c.id}" title="${this.escapeHtml(c.remarks)}">💬 ${this.escapeHtml(c.remarks)}</span>`
        : `<button class="btn-add-remark" data-action="quick-remark" data-id="${c.id}" title="Add follow-up note / નોંધ ઉમેરો">+ Note</button>`;

      tr.innerHTML = `
        <td class="col-num">${index + 1}</td>
        <td class="col-customer editable-field" data-id="${c.id}" data-field="name">${this.escapeHtml(c.name)}</td>
        <td style="color:#0284c7; font-weight:600;">${this.escapeHtml(c.phone || '9825012345')}</td>
        <td>${vBadge}<span class="col-vehicle editable-field" data-id="${c.id}" data-field="vehicle" title="Double-click to edit">${this.escapeHtml(c.vehicle)}</span></td>
        <td>${this.escapeHtml(translatedDoc)}</td>
        <td>${this.escapeHtml(c.expiry)}</td>
        <td class="${daysClass}">${this.escapeHtml(c.daysLeft)}</td>
        <td><span class="status-pill clickable ${badgeClass}" data-status-id="${c.id}" title="Click to change status / સ્થિતિ બદલવા માટે ક્લિક કરો"><span class="status-dot"></span>${translatedStatus}</span></td>
        <td>${entryBadge}</td>
        <td>${remarksHtml}</td>
        <td>
          <div class="action-buttons-group">
            <button class="action-icon-btn btn-whatsapp" title="WhatsApp" data-action="whatsapp" data-id="${c.id}">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
            </button>
            <button class="action-icon-btn btn-edit-row" title="Edit" data-action="edit" data-id="${c.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
            <button class="action-icon-btn btn-delete-row" title="Delete" data-action="delete" data-id="${c.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </td>
      `;
      this.bindRowActions(tr);
      this.fullCustomersTableBody.appendChild(tr);
    });
  }

  // --- Render Documents View Table (Filterable by Tab & 2W/4W) ---
  renderDocumentsTable(customList = null) {
    this.documentsTableBody.innerHTML = '';
    let list = customList !== null ? customList : (this.data.callingList || []);

    // Filter by Tab
    if (this.docActiveTab !== 'all') {
      if (this.docActiveTab === 'expired') {
        list = list.filter(c => (c.status || '').toLowerCase().includes('expired') || (c.daysLeft || '').toLowerCase().includes('expired'));
      } else {
        const dt = (this.data.documentTypes || []).find(d => d.id === this.docActiveTab);
        const searchName = dt ? dt.name.toLowerCase() : this.docActiveTab.toLowerCase();
        list = list.filter(c => {
          const docName = (c.doc || '').toLowerCase();
          return docName.includes(searchName) || docName.includes(this.docActiveTab.toLowerCase());
        });
      }
    }

    // Filter by Vehicle Type
    if (this.docVFilter !== 'all') {
      list = list.filter(c => (c.vehicleType || '4-wheeler') === this.docVFilter);
    }
    list = this.sortByExpiryDays(list);

    if (!list || list.length === 0) {
      this.documentsTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 24px; color: #94a3b8;">No documents found for selected filters</td></tr>`;
      return;
    }

    list.forEach((c, index) => {
      const tr = document.createElement('tr');
      const badgeClass = this.getStatusBadgeClass(c.status);
      const translatedStatus = this.getTranslatedStatus(c.status);
      const translatedDoc = this.getTranslatedDoc(c.doc);
      const vBadge = this.getVehicleBadgeHtml(c.vehicleType);

      tr.innerHTML = `
        <td class="col-num">${index + 1}</td>
        <td class="col-customer">${this.escapeHtml(c.name)}</td>
        <td>${vBadge}<span class="col-vehicle">${this.escapeHtml(c.vehicle)}</span></td>
        <td><strong>${this.escapeHtml(translatedDoc)}</strong></td>
        <td>${this.escapeHtml(c.expiry)}</td>
        <td class="col-days-red">${this.escapeHtml(c.daysLeft)}</td>
        <td><span class="status-pill clickable ${badgeClass}" data-status-id="${c.id}" title="Click to change status / સ્થિતિ બદલવા માટે ક્લિક કરો"><span class="status-dot"></span>${translatedStatus}</span></td>
        <td>
          <div class="action-buttons-group">
            <button class="action-icon-btn btn-whatsapp" title="Send WhatsApp Reminder" data-action="whatsapp" data-id="${c.id}">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
            </button>
            <button class="action-icon-btn btn-edit-row" title="Edit Details" data-action="edit" data-id="${c.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
          </div>
        </td>
      `;
      this.bindRowActions(tr);
      this.documentsTableBody.appendChild(tr);
    });
  }

  // --- Render Dedicated Full Calling List View ---
  renderCallingListFullTable() {
    this.callingListFullTableBody.innerHTML = '';
    let list = this.getFilteredCallingList();

    if (this.callingVFilter !== 'all') {
      list = list.filter(c => (c.vehicleType || '4-wheeler') === this.callingVFilter);
    }
    list = this.sortCallingList(list);

    if (!list || list.length === 0) {
      this.callingListFullTableBody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding: 24px; color: #94a3b8;">No calling list records matching filter</td></tr>`;
      return;
    }

    list.forEach((c, index) => {
      const tr = document.createElement('tr');
      if (c.contacted || c.status === 'Renewed') {
        tr.classList.add('row-contacted');
      }
      const badgeClass = this.getStatusBadgeClass(c.status);
      const translatedStatus = this.getTranslatedStatus(c.status);
      const translatedDoc = this.getTranslatedDoc(c.doc);
      const vBadge = this.getVehicleBadgeHtml(c.vehicleType);
      const entryBadge = this.getEntryByBadgeHtml(c);

      tr.innerHTML = `
        <td class="col-num">${index + 1}</td>
        <td class="col-customer">${this.escapeHtml(c.name)}</td>
        <td>${vBadge}<span class="col-vehicle">${this.escapeHtml(c.vehicle)}</span></td>
        <td>${this.escapeHtml(translatedDoc)}</td>
        <td>${this.escapeHtml(c.expiry)}</td>
        <td class="col-days-red">${this.escapeHtml(c.daysLeft)}</td>
        <td><span class="status-pill clickable ${badgeClass}" data-status-id="${c.id}" title="Click to change status / સ્થિતિ બદલવા માટે ક્લિક કરો"><span class="status-dot"></span>${translatedStatus}</span></td>
        <td>${entryBadge}</td>
        <td>
          <div class="action-buttons-group">
            <button type="button" class="action-icon-btn btn-whatsapp" title="WhatsApp Reminder" data-action="whatsapp" data-id="${c.id}">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
            </button>
            <button class="action-icon-btn btn-edit-row" title="Edit" data-action="edit" data-id="${c.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
          </div>
        </td>
      `;
      this.bindRowActions(tr);
      this.callingListFullTableBody.appendChild(tr);
    });
  }

  getNext7DaysList(customList = null) {
    const list = customList !== null ? customList : this.getFilteredCallingList();
    return list.filter(c => {
      const days = this.getDaysRemainingNumber(c);
      const isExp = (c.status || '').toLowerCase().includes('expired') || (c.daysLeft || '').toLowerCase().includes('expired') || days < 0;
      return !isExp && days >= 0 && days <= 7;
    }).map(c => ({
      ...c,
      days: c.daysLeft ? (c.daysLeft.replace(/[^0-9]/g, '') || String(Math.max(0, this.getDaysRemainingNumber(c)))) : String(Math.max(0, this.getDaysRemainingNumber(c)))
    }));
  }

  getExpiredDocsList(customList = null) {
    const list = customList !== null ? customList : this.getFilteredCallingList();
    return list.filter(c => {
      const days = this.getDaysRemainingNumber(c);
      return (c.status || '').toLowerCase().includes('expired') || (c.daysLeft || '').toLowerCase().includes('expired') || days < 0;
    }).map(c => ({
      ...c,
      expiredOn: c.expiry || c.expiredOn || 'Expired'
    }));
  }

  // --- Render Next 7 Days Full View Table ---
  renderNext7DaysFullTable() {
    this.next7DaysFullTableBody.innerHTML = '';
    const sortedList = this.sortByExpiryDays(this.getNext7DaysList());
    if (!sortedList || sortedList.length === 0) {
      this.next7DaysFullTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color: #94a3b8;">No documents expiring in the next 7 days</td></tr>`;
      return;
    }
    sortedList.forEach((item, index) => {
      const tr = document.createElement('tr');
      const vBadge = this.getVehicleBadgeHtml(item.vehicleType);
      tr.innerHTML = `
        <td class="col-num">${index + 1}</td>
        <td class="col-customer">${this.escapeHtml(item.name)}</td>
        <td>${vBadge}<span class="col-vehicle">${this.escapeHtml(item.vehicle)}</span></td>
        <td>${this.escapeHtml(this.getTranslatedDoc(item.doc))}</td>
        <td>${this.escapeHtml(item.expiry)}</td>
        <td class="col-days-red" style="font-weight:700;">${this.escapeHtml(item.days)} Days</td>
        <td>
          <button class="action-icon-btn btn-whatsapp" title="WhatsApp Reminder" data-action="whatsapp" data-id="${item.id}">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
          </button>
        </td>
      `;
      tr.querySelector('.btn-whatsapp').addEventListener('click', () => {
        this.openWhatsAppForCustomer(item);
      });
      this.next7DaysFullTableBody.appendChild(tr);
    });
  }

  // --- Render Expired Docs Full View Table ---
  renderExpiredDocsFullTable() {
    this.expiredDocsFullTableBody.innerHTML = '';
    const sortedList = this.getExpiredDocsList().slice().sort((a, b) => this.getDaysRemainingNumber(a) - this.getDaysRemainingNumber(b));
    if (!sortedList || sortedList.length === 0) {
      this.expiredDocsFullTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 24px; color: #94a3b8;">No expired documents found</td></tr>`;
      return;
    }
    sortedList.forEach((item, index) => {
      const tr = document.createElement('tr');
      const vBadge = this.getVehicleBadgeHtml(item.vehicleType);
      tr.innerHTML = `
        <td class="col-num">${index + 1}</td>
        <td class="col-customer">${this.escapeHtml(item.name)}</td>
        <td>${vBadge}<span class="col-vehicle">${this.escapeHtml(item.vehicle)}</span></td>
        <td>${this.escapeHtml(this.getTranslatedDoc(item.doc))}</td>
        <td class="col-days-red">${this.escapeHtml(item.expiredOn)}</td>
        <td>
          <button class="action-icon-btn btn-whatsapp" title="Send Urgent WhatsApp Renewal Notice" data-action="whatsapp" data-id="${item.id}">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
          </button>
        </td>
      `;
      tr.querySelector('.btn-whatsapp').addEventListener('click', () => {
        this.openWhatsAppForCustomer(item);
      });
      this.expiredDocsFullTableBody.appendChild(tr);
    });
  }

  // --- Render Reminders Full List ---
  renderRemindersFullList() {
    this.remindersFullList.innerHTML = '';
    if (!this.data.activities || this.data.activities.length === 0) {
      this.remindersFullList.innerHTML = `<div style="text-align:center; padding: 24px; color: #94a3b8;">No reminders log found</div>`;
      return;
    }
    this.data.activities.forEach(act => {
      const div = document.createElement('div');
      div.className = 'activity-item';
      div.innerHTML = `
        <div class="activity-icon-badge ${act.type}">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
        </div>
        <div class="activity-content">
          <div class="activity-title"><strong>[SENT]</strong> ${this.escapeHtml(act.text)}</div>
          <div class="activity-time">${this.escapeHtml(act.time)} • Status: Delivered ✓</div>
        </div>
      `;
      this.remindersFullList.appendChild(div);
    });
  }

  // --- Render Reports & 2W vs 4W Stats ---
  renderReportsStats() {
    let twoWCount = 0;
    let fourWCount = 0;
    let commCount = 0;

    const allList = this.getFilteredCallingList();
    allList.forEach(c => {
      const type = (c.vehicleType || '').toLowerCase();
      if (type.includes('2') || type.includes('two')) twoWCount++;
      else if (type.includes('comm')) commCount++;
      else fourWCount++;
    });

    const total = allList.length;
    const p2W = total > 0 ? Math.round((twoWCount / total) * 100) : 0;
    const p4W = total > 0 ? Math.round((fourWCount / total) * 100) : 0;
    const pComm = total > 0 ? (100 - p2W - p4W) : 0;

    const stat2WCount = document.getElementById('stat2WCount');
    const stat4WCount = document.getElementById('stat4WCount');
    const statCommCount = document.getElementById('statCommCount');

    if (stat2WCount) stat2WCount.textContent = twoWCount;
    if (stat4WCount) stat4WCount.textContent = fourWCount;
    if (statCommCount) statCommCount.textContent = commCount;

    const stat2WPercent = document.getElementById('stat2WPercent');
    const stat4WPercent = document.getElementById('stat4WPercent');
    const statCommPercent = document.getElementById('statCommPercent');

    if (stat2WPercent) stat2WPercent.textContent = `${p2W}%`;
    if (stat4WPercent) stat4WPercent.textContent = `${p4W}%`;
    if (statCommPercent) statCommPercent.textContent = `${pComm}%`;

    const stat2WBar = document.getElementById('stat2WBar');
    const stat4WBar = document.getElementById('stat4WBar');
    const statCommBar = document.getElementById('statCommBar');

    if (stat2WBar) stat2WBar.style.width = `${p2W}%`;
    if (stat4WBar) stat4WBar.style.width = `${p4W}%`;
    if (statCommBar) statCommBar.style.width = `${pComm}%`;

    // Populate Dynamic Document Expiry Breakdown in Reports
    if (this.reportsDocBreakdownContainer) {
      this.reportsDocBreakdownContainer.innerHTML = '';
      const docTypes = this.data.documentTypes || [];
      docTypes.forEach(dt => {
        const norm = dt.name.toLowerCase();
        const matching = allList.filter(c => (c.doc || '').toLowerCase().includes(norm) || (c.doc || '').toLowerCase().includes(dt.id));
        const expiring = matching.filter(c => !((c.status || '').toLowerCase().includes('expired') || (c.daysLeft || '').toLowerCase().includes('expired'))).length;
        const expired = matching.filter(c => (c.status || '').toLowerCase().includes('expired') || (c.daysLeft || '').toLowerCase().includes('expired')).length;

        const card = document.createElement('div');
        card.style.cssText = 'background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px;';
        card.innerHTML = `
          <div style="font-weight:700; color:#0f172a; font-size:15px; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
            <span>${dt.icon || '📄'}</span> <span>${this.getTranslatedDoc(dt.name)}</span>
          </div>
          <div style="font-size:13px; color:#3b82f6;"><strong>${expiring}</strong> Expiring Soon | <strong style="color:#ef4444;">${expired}</strong> Expired</div>
          <div style="margin-top:10px; font-size:12px; color:#64748b;">Active document category for WhatsApp & SMS reminders</div>
        `;
        this.reportsDocBreakdownContainer.appendChild(card);
      });
    }

    this.renderStaffPerformanceTable();
  }

  // --- Render Activities Full Timeline ---
  renderActivitiesFullList() {
    this.activitiesFullList.innerHTML = '';
    if (!this.data.activities || this.data.activities.length === 0) {
      this.activitiesFullList.innerHTML = `<div style="text-align:center; padding: 24px; color: #94a3b8;">No recent activities recorded yet</div>`;
      return;
    }
    this.data.activities.forEach(act => {
      const div = document.createElement('div');
      div.className = 'activity-item';
      div.innerHTML = `
        <div class="activity-icon-badge ${act.type}">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
        </div>
        <div class="activity-content">
          <div class="activity-title">${this.escapeHtml(act.text)}</div>
          <div class="activity-time">${this.escapeHtml(act.time)}</div>
        </div>
      `;
      this.activitiesFullList.appendChild(div);
    });
  }

  bindRowActions(tr) {
    tr.querySelectorAll('.editable-field').forEach(cell => {
      cell.addEventListener('dblclick', () => {
        this.makeCellEditable(cell);
      });
    });

    // Quick Click-to-edit Status Pill
    tr.querySelectorAll('.status-pill.clickable').forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        this.makeStatusEditable(pill);
      });
    });
  }

  makeCellEditable(cell) {
    const id = cell.getAttribute('data-id');
    const field = cell.getAttribute('data-field');
    const customer = this.data.callingList.find(c => c.id === id);
    if (!customer) return;

    const currentVal = customer[field] || cell.textContent.trim();
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentVal;
    input.className = 'form-input';
    input.style.padding = '4px 8px';
    input.style.fontSize = '13px';
    input.style.width = '100%';

    cell.innerHTML = '';
    cell.appendChild(input);
    input.focus();

    const saveCell = () => {
      const newVal = input.value.trim();
      if (newVal) {
        customer[field] = newVal;
        if (field === 'expiry') {
          customer.expiryRaw = this.formatDateToInput(newVal);
        }
        this.saveData();
      }
      this.render();
      this.showToast(this.t('toastSaved'), 'success');
    };

    input.addEventListener('blur', saveCell);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        input.removeEventListener('blur', saveCell);
        saveCell();
      } else if (e.key === 'Escape') {
        input.removeEventListener('blur', saveCell);
        this.render();
      }
    });
  }

  renderNext7DaysList(customList = null) {
    this.next7DaysTableBody.innerHTML = '';
    const items = this.getNext7DaysList(customList);
    const sortedList = this.sortByExpiryDays(items);
    if (!sortedList || sortedList.length === 0) {
      this.next7DaysTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 18px; color: #94a3b8; font-size: 12.5px;">No documents expiring in next 7 days</td></tr>`;
      return;
    }
    sortedList.forEach(item => {
      const tr = document.createElement('tr');
      const vBadge = this.getVehicleBadgeHtml(item.vehicleType);
      tr.innerHTML = `
        <td class="col-customer">${this.escapeHtml(item.name)}</td>
        <td>${vBadge}<span class="col-vehicle">${this.escapeHtml(item.vehicle)}</span></td>
        <td>${this.escapeHtml(this.getTranslatedDoc(item.doc))}</td>
        <td>${this.escapeHtml(item.expiry)}</td>
        <td class="col-days-red" style="font-weight: 700;">${this.escapeHtml(item.days)} Days</td>
        <td class="chevron-cell" title="View details" data-id="${item.id}">›</td>
      `;
      tr.querySelector('.chevron-cell').addEventListener('click', () => {
        this.openWhatsAppForCustomer(item);
      });
      this.next7DaysTableBody.appendChild(tr);
    });
  }

  renderExpiredDocsList(customList = null) {
    this.expiredDocsTableBody.innerHTML = '';
    const items = this.getExpiredDocsList(customList);
    const sortedList = items.slice().sort((a, b) => this.getDaysRemainingNumber(a) - this.getDaysRemainingNumber(b));
    if (!sortedList || sortedList.length === 0) {
      this.expiredDocsTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 18px; color: #94a3b8; font-size: 12.5px;">No expired documents</td></tr>`;
      return;
    }
    sortedList.forEach(item => {
      const tr = document.createElement('tr');
      const vBadge = this.getVehicleBadgeHtml(item.vehicleType);
      tr.innerHTML = `
        <td class="col-customer">${this.escapeHtml(item.name)}</td>
        <td>${vBadge}<span class="col-vehicle">${this.escapeHtml(item.vehicle)}</span></td>
        <td>${this.escapeHtml(this.getTranslatedDoc(item.doc))}</td>
        <td class="col-days-red">${this.escapeHtml(item.expiredOn)}</td>
        <td class="chevron-cell" title="View details" data-id="${item.id}">›</td>
      `;
      tr.querySelector('.chevron-cell').addEventListener('click', () => {
        this.openWhatsAppForCustomer(item);
      });
      this.expiredDocsTableBody.appendChild(tr);
    });
  }

  renderActivities() {
    this.recentActivitiesList.innerHTML = '';
    if (!this.data.activities || this.data.activities.length === 0) {
      this.recentActivitiesList.innerHTML = `<div style="text-align:center; padding: 20px; color: #94a3b8; font-size: 12.5px;">No recent activities yet</div>`;
      return;
    }
    this.data.activities.forEach(act => {
      const div = document.createElement('div');
      div.className = 'activity-item';

      let iconClass = 'whatsapp';
      let iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>';

      if (act.type === 'call') {
        iconClass = 'call';
        iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
      } else if (act.type === 'send') {
        iconClass = 'send';
        iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
      } else if (act.type === 'contacted') {
        iconClass = 'contacted';
        iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
      } else if (act.type === 'expired') {
        iconClass = 'expired';
        iconSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
      }

      div.innerHTML = `
        <div class="activity-icon-badge ${iconClass}">${iconSvg}</div>
        <div class="activity-content">
          <div class="activity-title">${this.escapeHtml(act.text)}</div>
          <div class="activity-time">${this.escapeHtml(act.time)}</div>
        </div>
      `;
      this.recentActivitiesList.appendChild(div);
    });
  }

  handleRowAction(action, id, event) {
    let customer = this.data.callingList.find(c => c.id === id);
    if (!customer && this.data.next7DaysList) {
      customer = this.data.next7DaysList.find(c => c.id === id);
    }
    if (!customer && this.data.expiredDocsList) {
      customer = this.data.expiredDocsList.find(c => c.id === id);
    }
    if (!customer) return;

    if (action === 'call') {
      this.openCallModal(customer);
    } else if (action === 'whatsapp') {
      this.openWhatsAppTemplateModal(customer);
    } else if (action === 'quick-remark' || action === 'remark') {
      this.openQuickRemarkModal(customer);
    } else if (action === 'receipt') {
      this.openReceiptModal(customer);
    } else if (action === 'send') {
      this.logActivity('send', `Reminder sent to ${customer.name} (${customer.vehicleType || '4W'})`);
      this.showToast(`Reminder dispatched to ${customer.name}!`, 'success');
    } else if (action === 'toggle-done') {
      customer.contacted = !customer.contacted;
      this.saveData();
      this.render();
      if (customer.contacted) {
        this.logActivity('contacted', `Marked as contacted - ${customer.name}`);
        this.showToast(`Marked ${customer.name} as contacted!`, 'success');
      }
    } else if (action === 'edit') {
      this.openCustomerModal(customer);
    } else if (action === 'delete') {
      if (confirm(`Remove customer ${customer.name} (${customer.vehicle})? / શું તમે આ ગ્રાહકને દૂર કરવા માંગો છો?`)) {
        this.data.callingList = this.data.callingList.filter(c => c.id !== id);
        this.saveData({ deletedId: id });
        this.render();
        this.showToast(this.t('toastDeleted'), 'error');
      }
    }
  }

  // --- Call Customer Modal Handlers ---
  openCallModal(customer) {
    this.activeCallCustomer = customer;
    const nameEl = document.getElementById('callModalCustName');
    const vehEl = document.getElementById('callModalCustVeh');
    const docEl = document.getElementById('callModalCustDoc');
    const phoneLink = document.getElementById('callModalPhoneLink');
    const dialBtn = document.getElementById('callModalDialBtn');
    const modal = document.getElementById('callModal');

    const phoneRaw = customer.phone || '9825012345';
    const cleanPhone = phoneRaw.replace(/[^0-9]/g, '');
    const displayPhone = cleanPhone.length === 10
      ? `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`
      : (phoneRaw.startsWith('+') ? phoneRaw : `+91 ${phoneRaw}`);

    if (nameEl) nameEl.textContent = customer.name;
    if (vehEl) vehEl.textContent = customer.vehicle;
    if (docEl) docEl.textContent = this.getTranslatedDoc(customer.doc);
    if (phoneLink) {
      phoneLink.href = `tel:${cleanPhone}`;
      phoneLink.textContent = displayPhone;
    }
    if (dialBtn) {
      dialBtn.href = `tel:${cleanPhone}`;
    }

    if (modal) {
      modal.classList.add('active');
    }

    this.logActivity('call', `Opened call details for ${customer.name} (${customer.vehicleType || '4W'})`);
  }

  triggerWhatsAppDispatch(standardPhone, text, mode = 'web') {
    const encoded = encodeURIComponent(text);
    // Auto-copy message to clipboard so user can also paste anywhere with Ctrl+V if needed
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }

    if (mode === 'app') {
      // Direct Windows Desktop WhatsApp App Protocol (zero browser tabs!)
      const appUrl = `whatsapp://send?phone=${standardPhone}&text=${encoded}`;
      const link = document.createElement('a');
      link.href = appUrl;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (link.parentNode) link.parentNode.removeChild(link);
      }, 400);
    } else {
      // Direct WhatsApp Web (reusing same tab 'MomaiWhatsAppWindow')
      const waWebUrl = `https://web.whatsapp.com/send?phone=${standardPhone}&text=${encoded}`;
      window.open(waWebUrl, 'MomaiWhatsAppWindow');
    }
  }

  openWhatsAppForCustomer(customer, mode = 'web') {
    const phone = customer.phone || '9825012345';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const standardPhone = (cleanPhone.startsWith('91') && cleanPhone.length === 12) ? cleanPhone : ('91' + cleanPhone.slice(-10));
    const doc = customer.doc || 'Vehicle Document';
    const expiry = customer.expiry || customer.expiredOn || 'Upcoming';
    const days = customer.daysLeft || customer.days || 'Soon';
    const vType = (customer.vehicleType || '4-wheeler') === '2-wheeler' ? 'ટુ-વ્હીલર' : 'ફોર-વ્હીલર';

    let message = '';
    if (this.currentLang === 'gu') {
      message = `નમસ્તે ${customer.name},\nતમારા ${vType} વાહન નંબર ${customer.vehicle} નું ${doc} તારીખ ${expiry} (${days}) ના રોજ સમાપ્ત થાય છે.\nદંડ અને મુશ્કેલીથી બચવા માટે આજે જ Momai Enterprise દ્વારા રિન્યુ કરાવો.\nસંપર્ક: ${this.data.admin.phone}\nઆભાર, Momai Enterprise.`;
    } else {
      const vTypeEn = (customer.vehicleType || '4-wheeler') === '2-wheeler' ? 'Two-Wheeler' : 'Four-Wheeler';
      message = `Dear ${customer.name},\nThis is a reminder that your ${vTypeEn} vehicle ${customer.vehicle} ${doc} is expiring on ${expiry} (${days}).\nPlease renew it promptly with Momai Enterprise to ensure hassle-free driving.\nContact: ${this.data.admin.phone}\nThank you, Momai Enterprise.`;
    }

    this.triggerWhatsAppDispatch(standardPhone, message, mode);

    this.logActivity('whatsapp', `WhatsApp sent to ${customer.name} (${customer.vehicleType || '4W'})`);
    this.showToast(this.currentLang === 'gu' ? `વોટ્સએપ ઓપન થયું: ${customer.name}` : `Opening WhatsApp Web for ${customer.name}...`, 'success');
  }

  // --- Quick Remark Modal Handlers ---
  openQuickRemarkModal(customer) {
    this.quickRemarkCustomerId = customer.id;
    const nameEl = document.getElementById('quickRemarkCustName');
    const vehEl = document.getElementById('quickRemarkCustVeh');
    const inputEl = document.getElementById('inputQuickRemarkText');
    const modal = document.getElementById('quickRemarkModal');

    if (nameEl) nameEl.textContent = customer.name;
    if (vehEl) vehEl.textContent = customer.vehicle;
    if (inputEl) inputEl.value = customer.remarks || '';
    if (modal) {
      modal.classList.add('active');
      setTimeout(() => { if (inputEl) inputEl.focus(); }, 100);
    }
  }

  saveQuickRemark() {
    if (!this.quickRemarkCustomerId) return;
    const customer = this.data.callingList.find(c => c.id === this.quickRemarkCustomerId);
    if (customer) {
      const inputEl = document.getElementById('inputQuickRemarkText');
      const newRemark = inputEl ? inputEl.value.trim() : '';
      customer.remarks = newRemark;
      customer.contacted = true;
      this.saveData();
      this.render();
      const activeEmp = this.getActiveEmployee();
      this.logActivity('contacted', `Follow-up note saved for ${customer.name}: "${newRemark || 'Cleared'}" by ${activeEmp.name}`);
      this.showToast('Calling note saved successfully! / નોંધ સાચવવામાં આવી!', 'success');
    }
    this.closeModals();
  }

  // --- Ready WhatsApp Message Templates Modal Handlers ---
  openWhatsAppTemplateModal(customer) {
    this.activeWaCustomer = customer;
    const nameEl = document.getElementById('waModalCustName');
    const phoneEl = document.getElementById('waModalCustPhone');
    const vehEl = document.getElementById('waModalCustVeh');
    const docEl = document.getElementById('waModalCustDoc');
    const expEl = document.getElementById('waModalCustExpiry');
    const modal = document.getElementById('whatsappTemplateModal');

    if (nameEl) nameEl.textContent = customer.name;
    if (phoneEl) phoneEl.textContent = customer.phone || '9825012345';
    if (vehEl) vehEl.textContent = customer.vehicle;
    if (docEl) docEl.textContent = this.getTranslatedDoc(customer.doc);
    if (expEl) expEl.textContent = customer.expiry || 'Soon';

    // Reset template active buttons to first
    document.querySelectorAll('.wa-tpl-btn').forEach((b, i) => {
      if (i === 0) b.classList.add('active');
      else b.classList.remove('active');
    });

    this.renderWhatsAppTemplateText('reminder15');
    if (modal) modal.classList.add('active');
  }

  renderWhatsAppTemplateText(tplType) {
    const customer = this.activeWaCustomer;
    if (!customer) return;
    const phone = this.data.admin.phone || '+91 99250 23570';
    const doc = customer.doc || 'Insurance';
    const expiry = customer.expiry || 'Upcoming';
    const days = customer.daysLeft || 'Soon';
    const vTypeEn = (customer.vehicleType || '4-wheeler') === '2-wheeler' ? 'Two-Wheeler' : 'Four-Wheeler';
    const vTypeGu = (customer.vehicleType || '4-wheeler') === '2-wheeler' ? 'ટુ-વ્હીલર' : 'ફોર-વ્હીલર';

    let message = '';
    if (this.currentLang === 'gu') {
      if (tplType === 'reminder15') {
        message = `નમસ્તે ${customer.name} જી,\nઆપના ${vTypeGu} વાહન નંબર ${customer.vehicle} નું ${doc} તારીખ ${expiry} (${days}) ના રોજ પૂર્ણ થાય છે.\nછેલ્લી ઘડીની દોડધામ અને મુશ્કેલીથી બચવા આજે જ મોમાઈ એન્ટરપ્રાઈઝ સાથે રિન્યુ કરાવો.\n📞 હેલ્પલાઇન: ${phone}\nઆભાર, મોમાઈ એન્ટરપ્રાઈઝ (ડ્રાઇવ સુરક્ષિત. યાદ અમે રાખીશું).`;
      } else if (tplType === 'expiryToday') {
        message = `🚨 અતિ મહત્વની સૂચના:\nનમસ્તે ${customer.name} જી,\nઆપના વાહન ${customer.vehicle} નું ${doc} આજે સમાપ્ત થાય છે (${expiry})!\nપોલીસ મેમો અને ભારે દંડથી બચવા તાત્કાલિક મોમાઈ એન્ટરપ્રાઈઝ નો સંપર્ક કરી ફક્ત 10 મિનિટમાં રિન્યુ કરાવો.\n📞 કોલ કરો: ${phone}`;
      } else if (tplType === 'trafficChallan') {
        message = `⚠️ RTO ટ્રાફિક પોલીસ ચેતવણી:\nમાન્ય ${doc} વગર વાહન ચલાવવા પર ટ્રાફિક પોલીસ દ્વારા ₹2,000 થી ₹10,000 સુધીનો દંડ થઈ શકે છે!\nઆપના વાહન ${customer.vehicle} નું રિન્યુઅલ પેન્ડિંગ છે.\nઓનલાઇન ત્વરિત પોલિસી મેળવવા સંપર્ક કરો: ${phone} (Momai Enterprise).`;
      } else if (tplType === 'renewSuccess') {
        message = `✅ નવીકરણ સફળતાપૂર્વક થયેલ:\nખૂબ ખૂબ આભાર ${customer.name} જી!\nઆપના વાહન ${customer.vehicle} નું ${doc} સફળતાપૂર્વક મોમાઈ એન્ટરપ્રાઈઝ દ્વારા રિન્યુ થઈ ગયું છે.\nરસીદ અને પોલિસી કોપી વૉટ્સએપ કરેલ છે.\nસુરક્ષિત મુસાફરી કરો! હેલ્પલાઇન: ${phone}`;
      }
    } else {
      if (tplType === 'reminder15') {
        message = `Dear ${customer.name},\nThis is a friendly reminder that your ${vTypeEn} vehicle ${customer.vehicle} ${doc} is expiring on ${expiry} (${days}).\nPlease renew it on time with Momai Enterprise to ensure continuous coverage.\n📞 Contact: ${phone}\nThank you, Momai Enterprise (Drive Secure. We Remind).`;
      } else if (tplType === 'expiryToday') {
        message = `🚨 URGENT NOTICE:\nDear ${customer.name},\nYour vehicle ${customer.vehicle} ${doc} EXPIRES TODAY (${expiry})!\nAvoid heavy penalties and inconvenience on the road. Call Momai Enterprise now for instant 10-minute renewal.\n📞 Call Now: ${phone}`;
      } else if (tplType === 'trafficChallan') {
        message = `⚠️ Traffic Police Fine Warning:\nDriving without valid ${doc} attracts a penalty of ₹2,000 to ₹10,000 under the Motor Vehicles Act!\nProtect your vehicle ${customer.vehicle} today with instant renewal from Momai Enterprise.\n📞 Hotline: ${phone}`;
      } else if (tplType === 'renewSuccess') {
        message = `✅ Renewal Confirmed:\nThank you ${customer.name}!\nYour ${doc} for vehicle ${customer.vehicle} has been successfully renewed by Momai Enterprise.\nReceipt voucher attached. Drive Secure. We Remind!\n📞 Helpline: ${phone}`;
      }
    }

    const textarea = document.getElementById('waMessageTextarea');
    if (textarea) {
      textarea.value = message;
      const countSpan = document.getElementById('waCharCount');
      if (countSpan) countSpan.textContent = `${message.length} chars`;
    }
  }

  sendWhatsAppFromModal(mode = 'web') {
    const customer = this.activeWaCustomer;
    if (!customer) return;
    const textarea = document.getElementById('waMessageTextarea');
    const text = textarea ? textarea.value : '';
    const phone = (customer.phone || '9825012345').replace(/[^0-9]/g, '');
    const standardPhone = (phone.startsWith('91') && phone.length === 12) ? phone : ('91' + phone.slice(-10));
    
    this.triggerWhatsAppDispatch(standardPhone, text, mode);
    
    customer.contacted = true;
    this.saveData();
    this.render();
    this.logActivity('whatsapp', `WhatsApp template dispatched to ${customer.name} (${customer.vehicle})`);
    this.showToast(this.currentLang === 'gu' ? `વોટ્સએપ મોકલાયું: ${customer.name}!` : `WhatsApp Web dispatched to ${customer.name}!`, 'success');
    this.closeModals();
  }

  // --- Print Renewal Receipt Voucher Handlers ---
  openReceiptModal(customer) {
    const voucherNo = customer.receiptNo || ('ME-2026-' + (customer.vehicle.replace(/[^0-9]/g, '').slice(-4) || '1048'));
    const todayFormatted = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const helpline = this.data.admin.phone || '+91 99250 23570';
    const staffName = customer.assignedStaff ? this.getEmployeeName(customer.assignedStaff) : this.getActiveEmployee().name;
    const docName = customer.doc || 'Insurance';
    const vType = customer.vehicleType === '2-wheeler' ? 'Two Wheeler (Bike/Scooter)' : (customer.vehicleType === 'commercial' ? 'Commercial Vehicle' : 'Four Wheeler (Car/SUV)');
    const premiumVal = customer.premium || (customer.vehicleType === '2-wheeler' ? '₹ 1,850.00' : '₹ 4,850.00');
    const totalVal = customer.vehicleType === '2-wheeler' ? '₹ 2,000.00' : '₹ 5,000.00';
    const policyNo = 'POL-' + (customer.vehicle.replace(/[^0-9A-Z]/g, '') || 'GJ01') + '-2026';

    const setElText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setElText('recVoucherNo', voucherNo);
    setElText('recDate', todayFormatted);
    setElText('recHelpline', helpline);
    setElText('recCustName', customer.name);
    setElText('recCustPhone', '+91 ' + (customer.phone || '98250 12345'));
    setElText('recCustVehicle', customer.vehicle);
    setElText('recVehicleType', vType);
    setElText('recStaffName', staffName);
    setElText('recDocName', `Vehicle ${docName} Renewal`);
    setElText('recPolicyNo', policyNo);
    setElText('recExpiryDate', customer.expiry || 'Upcoming');
    setElText('recPremiumAmount', premiumVal);
    setElText('recTotalAmount', totalVal);

    const modal = document.getElementById('receiptModal');
    if (modal) modal.classList.add('active');
  }

  // --- Render Staff Calling & Performance Summary Table ---
  renderStaffPerformanceTable() {
    const tbody = document.getElementById('staffPerfTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const employees = this.data.employees || [];
    const allList = this.data.callingList || [];

    employees.forEach(emp => {
      const assigned = allList.filter(c => c.assignedStaff === emp.id || (emp.role === 'Admin' && (!c.assignedStaff || c.assignedStaff === emp.id))).length;
      const contacted = allList.filter(c => (c.assignedStaff === emp.id || (emp.role === 'Admin' && (!c.assignedStaff || c.assignedStaff === emp.id))) && c.contacted).length;
      const renewed = allList.filter(c => (c.assignedStaff === emp.id || (emp.role === 'Admin' && (!c.assignedStaff || c.assignedStaff === emp.id))) && (c.status || '').toLowerCase().includes('renew')).length;
      const rate = assigned > 0 ? Math.round(((contacted + renewed) / (assigned * 1.5)) * 100) : 75;
      const cappedRate = Math.min(100, Math.max(20, rate));

      const initials = emp.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
      const statusBadge = cappedRate >= 80 ? '🔥 Top Performer' : (cappedRate >= 50 ? '⚡ Active' : '📞 In Progress');

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="staff-member-cell">
            <div class="staff-member-avatar">${initials}</div>
            <div>
              <div style="font-weight: 700; color: #0f172a;">${this.escapeHtml(emp.name)}</div>
              <div style="font-size: 11.5px; color: #64748b;">${this.escapeHtml(emp.role)}</div>
            </div>
          </div>
        </td>
        <td style="font-weight: 700; color: #0284c7;">${assigned}</td>
        <td style="font-weight: 700; color: #16a34a;">${contacted}</td>
        <td style="font-weight: 700; color: #9333ea;">${renewed}</td>
        <td>
          <div style="font-weight: 700; font-size: 12px; color: #334155;">${cappedRate}%</div>
          <div class="perf-rate-bar">
            <div class="perf-rate-fill" style="width: ${cappedRate}%;"></div>
          </div>
        </td>
        <td>
          <span style="font-size: 11.5px; font-weight: 700; padding: 3px 8px; border-radius: 999px; background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0;">
            ${statusBadge}
          </span>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  logActivity(type, text) {
    const active = this.getActiveEmployee();
    let finalText = text;
    if (active && !text.includes(' by ')) {
      finalText = `${text} by ${active.name}`;
    }
    const newAct = {
      id: 'act_' + Date.now(),
      type: type,
      text: finalText,
      time: 'Just now'
    };
    this.data.activities.unshift(newAct);
    if (this.data.activities.length > 15) {
      this.data.activities.pop();
    }
    this.saveData();
    this.renderActivities();
  }

  filterAllViews(keyword) {
    const query = (keyword || '').toLowerCase().trim();
    if (!query) {
      this.renderCallingList(this.data.callingList);
      this.renderFullCustomersTable();
      this.renderDocumentsTable();
      this.renderNext7DaysList();
      this.renderExpiredDocsList();
      return;
    }

    const match = (c) => {
      const name = (c.name || '').toLowerCase();
      const veh = (c.vehicle || '').toLowerCase();
      const doc = (c.doc || '').toLowerCase();
      const phone = (c.phone || '').toLowerCase();
      const status = (c.status || '').toLowerCase();
      const remarks = (c.remarks || '').toLowerCase();
      const createdBy = (c.createdBy || '').toLowerCase();
      return name.includes(query) || veh.includes(query) || doc.includes(query) || phone.includes(query) || status.includes(query) || remarks.includes(query) || createdBy.includes(query);
    };

    const filtered = (this.data.callingList || []).filter(match);
    this.renderCallingList(filtered);
    this.renderFullCustomersTable(filtered);
    this.renderDocumentsTable(filtered);
    this.renderNext7DaysList(filtered.filter(c => c.status === 'Due Soon' || (c.daysLeft && c.daysLeft.includes('Days'))));
    this.renderExpiredDocsList(filtered.filter(c => (c.status || '').toLowerCase().includes('expired')));
  }

  openCustomerModal(customer = null) {
    this.editingCustomerId = customer ? customer.id : null;
    const modalTitle = document.getElementById('customerModalTitle');
    this.populateStaffDropdown();

    if (customer) {
      modalTitle.textContent = this.t('editCustomerModalTitle');
      document.getElementById('inputCustName').value = customer.name;
      document.getElementById('inputCustPhone').value = customer.phone || '';
      document.getElementById('inputCustVehicle').value = customer.vehicle;
      document.getElementById('selectCustDoc').value = customer.doc;
      
      const inputDate = this.formatDateToInput(customer.expiryRaw || customer.expiry);
      this.inputCustExpiry.value = inputDate;
      this.inputCustDays.value = customer.daysLeft;
      this.selectCustStatus.value = customer.status;
      if (this.selectCustStaff) {
        this.selectCustStaff.value = customer.assignedStaff || this.data.activeEmployeeId || '';
      }
      const remarksInput = document.getElementById('inputCustRemarks');
      if (remarksInput) remarksInput.value = customer.remarks || '';

      // Set vehicle type in modal
      const vType = customer.vehicleType || '4-wheeler';
      this.inputCustVehicleType.value = vType;
      this.vTypeCards.forEach(c => {
        if (c.getAttribute('data-vtype') === vType) c.classList.add('selected');
        else c.classList.remove('selected');
      });
    } else {
      modalTitle.textContent = this.t('addCustomerModalTitle');
      this.customerForm.reset();

      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 15);
      const defaultDateStr = this.formatDateToInput(futureDate.toISOString().slice(0, 10));
      this.inputCustExpiry.value = defaultDateStr;
      this.handleExpiryDateCalculation();

      if (this.selectCustStaff) {
        this.selectCustStaff.value = this.data.activeEmployeeId || (this.data.employees[0] && this.data.employees[0].id) || '';
      }
      const remarksInput = document.getElementById('inputCustRemarks');
      if (remarksInput) remarksInput.value = '';

      // Default to 2-wheeler
      this.inputCustVehicleType.value = '2-wheeler';
      this.vTypeCards.forEach(c => {
        if (c.getAttribute('data-vtype') === '2-wheeler') c.classList.add('selected');
        else c.classList.remove('selected');
      });
    }

    this.customerModal.classList.add('active');
  }

  saveCustomerForm() {
    const name = document.getElementById('inputCustName').value.trim();
    const phone = document.getElementById('inputCustPhone').value.trim() || '9876543210';
    const vehicle = document.getElementById('inputCustVehicle').value.trim().toUpperCase();
    const doc = document.getElementById('selectCustDoc').value;
    const expiryRaw = this.inputCustExpiry.value.trim();
    const expiry = this.formatInputToDisplay(expiryRaw) || expiryRaw;
    const daysLeft = this.inputCustDays.value.trim() || '7 Days';
    const status = this.selectCustStatus.value;
    const assignedStaff = this.selectCustStaff ? this.selectCustStaff.value : this.data.activeEmployeeId;
    const vehicleType = this.inputCustVehicleType.value || '2-wheeler';
    const remarks = (document.getElementById('inputCustRemarks') ? document.getElementById('inputCustRemarks').value.trim() : '');

    if (!name || !vehicle) {
      alert('Please fill in Customer Name and Vehicle Number.');
      return;
    }

    const activeEmp = this.getActiveEmployee();
    const nowFormatted = new Date().toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    });

    if (this.editingCustomerId) {
      // Edit existing
      const customer = this.data.callingList.find(c => c.id === this.editingCustomerId);
      if (customer) {
        customer.name = name;
        customer.phone = phone;
        customer.vehicle = vehicle;
        customer.vehicleType = vehicleType;
        customer.doc = doc;
        customer.expiry = expiry;
        customer.expiryRaw = expiryRaw;
        customer.daysLeft = daysLeft;
        customer.daysType = (daysLeft.toLowerCase().includes('today') || daysLeft.toLowerCase().includes('expired') || parseInt(daysLeft) <= 7) ? 'red' : 'normal';
        customer.status = status;
        customer.assignedStaff = assignedStaff;
        customer.remarks = remarks;
        customer.lastModifiedBy = activeEmp.name;
        customer.lastModifiedAt = nowFormatted;
        if (!customer.createdBy) {
          customer.createdBy = activeEmp.name;
          customer.createdById = activeEmp.id;
          customer.createdAt = nowFormatted;
        }
      }
      this.logActivity('contacted', `Updated details for ${name} (${vehicle}) by ${activeEmp.name} (${activeEmp.role})`);
    } else {
      // Add new
      const newCustomer = {
        id: 'c_' + Date.now(),
        name: name,
        phone: phone,
        vehicle: vehicle,
        vehicleType: vehicleType,
        doc: doc,
        expiry: expiry,
        expiryRaw: expiryRaw,
        daysLeft: daysLeft,
        daysType: (daysLeft.toLowerCase().includes('today') || daysLeft.toLowerCase().includes('expired') || parseInt(daysLeft) <= 7) ? 'red' : 'normal',
        status: status,
        assignedStaff: assignedStaff || activeEmp.id,
        remarks: remarks,
        createdBy: activeEmp.name,
        createdById: activeEmp.id,
        createdAt: nowFormatted,
        lastModifiedBy: activeEmp.name,
        lastModifiedAt: nowFormatted,
        contacted: false
      };
      this.data.callingList.unshift(newCustomer);
      this.logActivity('contacted', `Added new customer - ${name} (${vehicleType}) by ${activeEmp.name} (${activeEmp.role})`);
    }

    this.saveData();
    this.render();
    this.closeModals();
    this.showToast(this.t('toastSaved'), 'success');
  }

  // --- Date Parsing & Conversion Helpers ---
  formatDateToInput(dateStr) {
    if (!dateStr) {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      return d.toISOString().slice(0, 10);
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }
    const parsed = Date.parse(dateStr);
    if (!isNaN(parsed)) {
      const d = new Date(parsed);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    }
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().slice(0, 10);
  }

  formatInputToDisplay(dateVal) {
    if (!dateVal) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateVal)) {
      const [y, m, d] = dateVal.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${day} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    }
    return dateVal;
  }

  getExpiryTimestamp(c) {
    if (!c) return Infinity;
    if (c.expiryRaw && /^\d{4}-\d{2}-\d{2}$/.test(c.expiryRaw)) {
      const parts = c.expiryRaw.split('-').map(Number);
      return new Date(parts[0], parts[1] - 1, parts[2]).getTime();
    }
    if (c.expiry) {
      const iso = this.formatDateToInput(c.expiry);
      if (iso && /^\d{4}-\d{2}-\d{2}$/.test(iso)) {
        const parts = iso.split('-').map(Number);
        return new Date(parts[0], parts[1] - 1, parts[2]).getTime();
      }
      const parsed = Date.parse(c.expiry);
      if (!isNaN(parsed)) return parsed;
    }
    if (c.daysLeft) {
      const dl = String(c.daysLeft).toLowerCase();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dl.includes('today')) return today.getTime();
      if (dl.includes('expired')) return today.getTime() - 86400000;
      const match = dl.match(/(\d+)/);
      if (match) return today.getTime() + parseInt(match[1], 10) * 86400000;
    }
    return Infinity;
  }

  getDaysRemainingNumber(c) {
    if (!c) return 999999;

    // 1. Explicit daysLeft or days string
    const dlStr = String(c.daysLeft || c.days || '').toLowerCase().trim();
    if (dlStr) {
      if (dlStr.includes('today')) return 0;
      if (dlStr.includes('expired')) {
        const m = dlStr.match(/(\d+)/);
        return m ? -parseInt(m[1], 10) : -1;
      }
      const m = dlStr.match(/(\d+)/);
      if (m) return parseInt(m[1], 10);
    }

    // 2. expiredOn string (e.g. "02 Sep 2026 (7 days ago)")
    if (c.expiredOn) {
      const expOnStr = String(c.expiredOn).toLowerCase();
      const m = expOnStr.match(/(\d+)\s*day/);
      if (m) return -parseInt(m[1], 10);
    }

    // 3. Fallback: Parse date
    const dateVal = c.expiryRaw || c.expiry || c.expiredOn;
    if (dateVal) {
      const iso = this.formatDateToInput(dateVal);
      if (iso && /^\d{4}-\d{2}-\d{2}$/.test(iso)) {
        const [y, m, d] = iso.split('-').map(Number);
        const target = new Date(y, m - 1, d);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return Math.round((target - today) / (1000 * 60 * 60 * 24));
      }
    }

    return 999999;
  }

  sortByExpiryDays(list) {
    if (!Array.isArray(list)) return [];
    return list.slice().sort((a, b) => {
      const daysA = this.getDaysRemainingNumber(a);
      const daysB = this.getDaysRemainingNumber(b);
      if (daysA !== daysB) {
        return daysA - daysB;
      }
      return (a.name || '').localeCompare(b.name || '');
    });
  }

  sortCallingList(list) {
    if (!Array.isArray(list)) return [];
    return list.slice().sort((a, b) => {
      // 0: Pending/uncontacted items, 1: Contacted or Renewed items (placed at bottom)
      const aDone = (a.contacted || a.status === 'Renewed') ? 1 : 0;
      const bDone = (b.contacted || b.status === 'Renewed') ? 1 : 0;
      if (aDone !== bDone) {
        return aDone - bDone;
      }
      // Earliest/most urgent expiry date first
      const daysA = this.getDaysRemainingNumber(a);
      const daysB = this.getDaysRemainingNumber(b);
      if (daysA !== daysB) {
        return daysA - daysB;
      }
      return (a.name || '').localeCompare(b.name || '');
    });
  }

  handleExpiryDateCalculation() {
    const dateVal = this.inputCustExpiry.value;
    if (!dateVal) return;

    const [y, m, d] = dateVal.split('-').map(Number);
    const pickedDate = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.round((pickedDate - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      const daysOverdue = Math.abs(diffDays);
      this.inputCustDays.value = `Expired (${daysOverdue} Days ago)`;
      this.selectCustStatus.value = 'Expired';
      if (this.calcHintText) {
        this.calcHintText.textContent = `⚠️ Overdue by ${daysOverdue} days (Auto-calculated / ${daysOverdue} દિવસ વીતી ગયા)`;
        this.calcHintText.style.color = '#dc2626';
      }
    } else if (diffDays === 0) {
      this.inputCustDays.value = 'Today';
      this.selectCustStatus.value = 'Expiry Today';
      if (this.calcHintText) {
        this.calcHintText.textContent = `⚡ Expiring Today! Action required (Auto-calculated / આજે સમાપ્ત)`;
        this.calcHintText.style.color = '#ea580c';
      }
    } else if (diffDays <= 15) {
      this.inputCustDays.value = `${diffDays} Days`;
      this.selectCustStatus.value = 'Due Soon';
      if (this.calcHintText) {
        this.calcHintText.textContent = `⏳ ${diffDays} days remaining (Due Soon / ${diffDays} દિવસ બાકી)`;
        this.calcHintText.style.color = '#d97706';
      }
    } else {
      this.inputCustDays.value = `${diffDays} Days`;
      this.selectCustStatus.value = 'Upcoming';
      if (this.calcHintText) {
        this.calcHintText.textContent = `📅 ${diffDays} days remaining (Upcoming / ${diffDays} દિવસ બાકી)`;
        this.calcHintText.style.color = '#0284c7';
      }
    }
  }

  // --- Inline Status Click-to-Edit ---
  makeStatusEditable(pill) {
    const id = pill.getAttribute('data-status-id');
    const customer = this.data.callingList.find(c => c.id === id);
    if (!customer) return;

    const select = document.createElement('select');
    select.className = 'inline-status-select';
    const options = [
      { val: 'Due Soon', labelEn: 'Due Soon', labelGu: 'નજીક છે' },
      { val: 'Expiry Today', labelEn: 'Expiry Today', labelGu: 'આજે સમાપ્ત' },
      { val: 'Upcoming', labelEn: 'Upcoming', labelGu: 'આગામી' },
      { val: 'Expired', labelEn: 'Expired', labelGu: 'મુદત પૂરી' },
      { val: 'Renewed', labelEn: 'Renewed', labelGu: 'નવીકરણ થયેલ' }
    ];

    options.forEach(opt => {
      const optionEl = document.createElement('option');
      optionEl.value = opt.val;
      optionEl.textContent = this.currentLang === 'gu' ? `${opt.val} (${opt.labelGu})` : opt.val;
      if (customer.status === opt.val) optionEl.selected = true;
      select.appendChild(optionEl);
    });

    const parent = pill.parentElement;
    parent.innerHTML = '';
    parent.appendChild(select);
    select.focus();

    let handled = false;
    const saveStatus = () => {
      if (handled) return;
      handled = true;
      const newStatus = select.value;
      customer.status = newStatus;
      if (newStatus === 'Renewed') {
        customer.daysLeft = 'Renewed';
        customer.daysType = 'normal';
        customer.contacted = true;
      }
      const activeEmp = this.getActiveEmployee();
      this.logActivity('contacted', `${customer.name} (${customer.vehicle}) marked as ${newStatus} by ${activeEmp.name} (${activeEmp.role})`);
      this.saveData();
      this.render();
      this.showToast(`Status updated to ${newStatus}!`, 'success');
    };

    select.addEventListener('change', saveStatus);
    select.addEventListener('blur', () => {
      setTimeout(() => {
        if (!handled && select.parentElement) {
          this.render();
        }
      }, 150);
    });
  }

  // --- Employee & Profile Management Helpers ---
  getActiveEmployee() {
    if (this.currentSession && this.currentSession.empId) {
      const sessEmp = (this.data.employees || []).find(e => e.id === this.currentSession.empId);
      if (sessEmp) return sessEmp;
    }
    if (!this.data.employees || !Array.isArray(this.data.employees) || this.data.employees.length === 0) {
      return this.data.admin;
    }
    const emp = this.data.employees.find(e => e.id === this.data.activeEmployeeId);
    return emp || this.data.employees[0] || this.data.admin;
  }

  loadSession() {
    const saved = localStorage.getItem('momai_session_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return null;
  }

  saveSession(employee) {
    this.currentSession = {
      empId: employee.id,
      name: employee.name,
      role: employee.role,
      username: employee.username,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('momai_session_v1', JSON.stringify(this.currentSession));
    this.data.activeEmployeeId = employee.id;
  }

  clearSession() {
    this.currentSession = null;
    localStorage.removeItem('momai_session_v1');
  }

  checkAuth() {
    if (this.isForgotPasswordOpen) return false;
    if (!this.currentSession || !this.currentSession.empId) {
      if (this.loginOverlay) {
        this.loginOverlay.style.display = 'flex';
        this.loginOverlay.classList.remove('hidden');
      }
      return false;
    }
    const emp = (this.data.employees || []).find(e => e.id === this.currentSession.empId);
    if (!emp) {
      this.clearSession();
      if (this.loginOverlay) {
        this.loginOverlay.style.display = 'flex';
        this.loginOverlay.classList.remove('hidden');
      }
      return false;
    }
    if (this.loginOverlay) {
      this.loginOverlay.style.display = 'none';
      this.loginOverlay.classList.add('hidden');
    }
    return true;
  }

  async handleLoginSubmit() {
    const username = (this.loginUsername ? this.loginUsername.value : '').trim().toLowerCase();
    const password = (this.loginPassword ? this.loginPassword.value : '').trim();

    if (!username || !password) {
      this.showLoginError(this.t('invalidLogin'));
      return;
    }

    // Always fetch latest cloud state on login attempt to ensure cross-browser password & dataset sync
    try {
      await this.syncCloudData({ force: true });
    } catch (e) {}

    const savedAdminPass = localStorage.getItem('momai_crm_admin_pass');

    let employee = (this.data.employees || []).find(e => {
      const uMatch = e.username && e.username.toLowerCase() === username;
      if (!uMatch) return false;
      if (e.password === password) return true;
      if ((e.role === 'Admin' || username === 'admin') && savedAdminPass && savedAdminPass === password) return true;
      return false;
    });

    // If still not matched locally, make a direct live fetch to Firebase Realtime DB
    if (!employee) {
      try {
        const res = await fetch('https://momaienterprise-crm-live-default-rtdb.firebaseio.com/crm_database.json?t=' + Date.now(), { cache: 'no-store' });
        if (res.ok) {
          const raw = await res.json();
          const cloudData = (raw && raw.data) ? raw.data : raw;
          if (cloudData && cloudData.employees) {
            this.data = cloudData;
            localStorage.setItem('momai_crm_data_v2', JSON.stringify(cloudData));
            if (raw.version) localStorage.setItem('momai_crm_version', String(raw.version));

            const adminEmp = cloudData.employees.find(e => e.role === 'Admin' || e.username === 'admin');
            if (adminEmp && adminEmp.password) {
              localStorage.setItem('momai_crm_admin_pass', adminEmp.password);
            }

            employee = (this.data.employees || []).find(e => {
              const uMatch = e.username && e.username.toLowerCase() === username;
              if (!uMatch) return false;
              if (e.password === password) return true;
              if ((e.role === 'Admin' || username === 'admin') && adminEmp && adminEmp.password === password) return true;
              return false;
            });
          }
        }
      } catch (err) {}
    }

    if (employee) {
      if (this.loginErrorMsg) this.loginErrorMsg.style.display = 'none';
      this.saveSession(employee);
      this.masterStaffFilter = 'all';
      this.checkAuth();
      this.render();
      this.showToast(`${this.t('toastLoggedIn')} ${employee.name} (${employee.role})!`, 'success');
    } else {
      this.showLoginError(this.t('invalidLogin'));
    }
  }

  showLoginError(msg) {
    if (this.loginErrorMsg) {
      if (this.loginErrorText) this.loginErrorText.textContent = msg;
      this.loginErrorMsg.style.display = 'flex';
    } else {
      alert(msg);
    }
  }

  logout() {
    this.clearSession();
    if (this.loginUsername) this.loginUsername.value = '';
    if (this.loginPassword) this.loginPassword.value = '';
    if (this.loginErrorMsg) this.loginErrorMsg.style.display = 'none';
    this.checkAuth();
    this.showToast(this.t('toastLoggedOut'), 'info');
  }

  // --- Simplified Direct Password Reset Methods ---
  openForgotPasswordModal() {
    if (!this.modalForgotPassword) {
      this.modalForgotPassword = document.getElementById('modalForgotPassword');
    }
    if (!this.modalForgotPassword) return;

    this.isForgotPasswordOpen = true;
    if (this.forgotNewPass) this.forgotNewPass.value = '';
    if (this.forgotConfirmPass) this.forgotConfirmPass.value = '';

    const step2 = document.getElementById('forgotStep2');
    const step3 = document.getElementById('forgotStep3');
    if (step2) step2.style.display = 'block';
    if (step3) step3.style.display = 'none';

    // Hide login screen cleanly so password reset modal is front and center
    if (this.loginOverlay) {
      this.loginOverlay.style.display = 'none';
      this.loginOverlay.classList.add('hidden');
    }

    this.modalForgotPassword.classList.add('active');
    setTimeout(() => {
      if (this.forgotNewPass) this.forgotNewPass.focus();
    }, 150);
  }

  openPasswordResetDirect(user = 'admin') {
    this.openForgotPasswordModal();
  }

  closeForgotPasswordModal() {
    this.isForgotPasswordOpen = false;
    if (this.modalForgotPassword) {
      this.modalForgotPassword.classList.remove('active');
    }
    this.checkAuth();
  }

  async submitPasswordReset() {
    const newPass = (this.forgotNewPass && this.forgotNewPass.value.trim()) || '';
    const confirmPass = (this.forgotConfirmPass && this.forgotConfirmPass.value.trim()) || '';

    if (!newPass || newPass.length < 4) {
      this.showToast(this.currentLang === 'gu' ? 'પાસવર્ડ ઓછામાં ઓછો 4 અક્ષરોનો હોવો જોઈએ' : 'Password must be at least 4 characters long', 'error');
      if (this.forgotNewPass) this.forgotNewPass.focus();
      return;
    }

    if (newPass !== confirmPass) {
      this.showToast(this.currentLang === 'gu' ? 'બંને પાસવર્ડ મેળ ખાતા નથી, ફરીથી ચેક કરો' : 'Passwords do not match. Please re-enter.', 'error');
      if (this.forgotConfirmPass) this.forgotConfirmPass.focus();
      return;
    }

    if (this.btnSubmitResetPassword) {
      this.btnSubmitResetPassword.disabled = true;
      this.btnSubmitResetPassword.innerHTML = `<span>⏳ Saving password...</span>`;
    }

    // 1. Update Admin password in memory
    if (this.data.employees && Array.isArray(this.data.employees)) {
      this.data.employees.forEach(emp => {
        if (emp.role === 'Admin' || emp.username.toLowerCase() === 'admin' || emp.id === 'emp1') {
          emp.password = newPass;
        }
      });
    }
    if (this.data.admin) {
      this.data.admin.password = newPass;
    }

    // 2. Save to local storage
    localStorage.setItem('momai_crm_admin_pass', newPass);

    // 3. Save to Cloud Sync (instantly broadcasts & synchronizes to all connected laptops!)
    this.saveData();

    // 4. Switch to Step 3 (Success Screen)
    const step2 = document.getElementById('forgotStep2');
    const step3 = document.getElementById('forgotStep3');
    if (step2) step2.style.display = 'none';
    if (step3) step3.style.display = 'block';

    if (this.btnSubmitResetPassword) {
      this.btnSubmitResetPassword.disabled = false;
      this.btnSubmitResetPassword.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${this.t('btnResetPassText')}</span>
      `;
    }

    this.showToast(this.currentLang === 'gu'
      ? '✅ પાસવર્ડ સફળતાપૂર્વક અપડેટ થયો! તમામ લેપટોપ પર સેવ થઈ ગયો છે.'
      : '✅ Password updated successfully across all devices!', 'success');
    this.logActivity('contacted', `Admin password reset completed`);
  }

  isCurrentUserAdmin() {
    if (!this.currentSession) return true;
    if (this.currentSession.role === 'Admin' || this.currentSession.role === 'admin' || (this.currentSession.username && this.currentSession.username.toLowerCase() === 'admin')) {
      return true;
    }
    const emp = (this.data.employees || []).find(e => e.id === this.currentSession.empId || (e.username && e.username.toLowerCase() === (this.currentSession.username || '').toLowerCase()));
    return emp ? (emp.role === 'Admin' || emp.role === 'admin' || emp.username === 'admin') : false;
  }

  getEmployeeName(empId) {
    if (!empId) return '';
    const emp = (this.data.employees || []).find(e => e.id === empId);
    return emp ? emp.name : '';
  }

  getFilteredCallingList() {
    let list = this.data.callingList || [];
    const isAdmin = this.isCurrentUserAdmin();

    if (isAdmin) {
      // Admin sees ALL customer records across the entire database when filter is 'all'
      if (this.masterStaffFilter && this.masterStaffFilter !== 'all') {
        list = list.filter(c => c.assignedStaff === this.masterStaffFilter || c.createdById === this.masterStaffFilter);
      }
    } else if (this.currentSession && this.currentSession.empId) {
      // Non-admin telecaller/staff sees customers assigned to them or created by them
      const myId = this.currentSession.empId;
      list = list.filter(c => c.assignedStaff === myId || c.createdById === myId);
    }
    return this.sortCallingList(list);
  }

  renderMasterStaffFilter() {
    if (!this.selectMasterStaffFilter) return;
    const currentVal = this.masterStaffFilter || 'all';
    this.selectMasterStaffFilter.innerHTML = `<option value="all">${this.t('allStaffOption')}</option>`;
    (this.data.employees || []).forEach(emp => {
      const opt = document.createElement('option');
      opt.value = emp.id;
      opt.textContent = `👤 ${emp.name} (${emp.role})`;
      this.selectMasterStaffFilter.appendChild(opt);
    });
    this.selectMasterStaffFilter.value = currentVal;
  }

  openEmployeeModal() {
    this.renderEmployees();
    if (this.employeeModal) {
      this.employeeModal.classList.add('active');
    }
  }

  renderEmployees() {
    // Update sidebar badge count
    const staffBadge = document.getElementById('sidebarStaffCountBadge');
    if (staffBadge) {
      staffBadge.textContent = String(this.data.employees ? this.data.employees.length : 0);
    }

    if (!this.employeeCardsContainer) return;
    this.employeeCardsContainer.innerHTML = '';

    const isAdmin = this.isCurrentUserAdmin();
    const activeEmp = this.getActiveEmployee();
    const activeId = activeEmp ? activeEmp.id : (this.data.activeEmployeeId || (this.data.employees[0] && this.data.employees[0].id));
    const currentMyId = (this.currentSession && this.currentSession.empId) ? this.currentSession.empId : activeId;

    // Update modal header title, subtitle, and add-staff section
    const modalTitle = document.getElementById('employeeModalTitle');
    const modalSubtitle = document.getElementById('employeeModalSubtitle');
    const sectionAddEmp = document.getElementById('sectionAddNewEmployee');

    const totalAccountsCount = this.data.employees ? this.data.employees.length : 0;

    if (modalTitle) {
      modalTitle.innerHTML = isAdmin 
        ? (this.currentLang === 'gu' ? `👥 સ્ટાફ અને લૉગિન એકાઉન્ટ (${totalAccountsCount} સભ્યો)` : `👥 Staff & Login Accounts (${totalAccountsCount} Accounts)`)
        : (this.currentLang === 'gu' ? '👤 મારી પ્રોફાઇલ' : '👤 My Profile');
    }
    if (modalSubtitle) {
      modalSubtitle.innerHTML = isAdmin
        ? (this.currentLang === 'gu' ? `કુલ ${totalAccountsCount} રજિસ્ટર્ડ એકાઉન્ટ્સ (User ID & Password નીચે મુજબ છે):` : `Total ${totalAccountsCount} Registered Accounts (Credentials & Management):`)
        : (this.currentLang === 'gu' ? 'મારા ખાતાની વિગતો:' : 'My Account Details:');
    }
    if (sectionAddEmp) {
      sectionAddEmp.style.display = isAdmin ? 'block' : 'none';
    }

    // Security & Visibility: Admin sees all profiles! Non-admin employee ONLY sees their own profile!
    const employeesToShow = isAdmin
      ? (this.data.employees || [])
      : (this.data.employees || []).filter(e => e.id === currentMyId);

    if (employeesToShow.length === 0) {
      this.employeeCardsContainer.innerHTML = `<div style="text-align:center; padding: 20px; color: #94a3b8;">No account profiles found</div>`;
      return;
    }

    employeesToShow.forEach(emp => {
      const isSelf = emp.id === currentMyId;
      const card = document.createElement('div');
      card.className = `employee-card ${isSelf ? 'active-profile' : ''}`;

      const roleClass = (emp.role || '').toLowerCase().includes('call') ? 'caller' : ((emp.role || '').toLowerCase().includes('man') ? 'manager' : '');
      const initials = emp.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || 'EM';

      card.innerHTML = `
        <div class="emp-info-group">
          <div class="emp-avatar ${roleClass}">${initials}</div>
          <div class="emp-text">
            <span class="emp-name">
              ${this.escapeHtml(emp.name)}
              <span class="emp-role-badge" style="font-weight: 800; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 6px; font-size: 11px;">${this.escapeHtml(emp.role)}</span>
            </span>
            <span class="emp-phone">📞 ${this.escapeHtml(emp.phone || 'No phone')} • ✉️ ${this.escapeHtml(emp.email || 'N/A')}</span>
            <div class="emp-creds" style="margin-top: 6px; font-size: 12px; color: #334155; background: #f1f5f9; padding: 6px 10px; border-radius: 6px; border: 1px solid #cbd5e1; display: inline-flex; align-items: center; gap: 8px;">
              <span>🔑 User ID: <strong style="color: #0369a1;">${this.escapeHtml(emp.username || 'admin')}</strong></span>
              <span>•</span>
              <span>Password: <strong style="color: #15803d; font-family: monospace; font-size: 13px;">${this.escapeHtml(emp.password || '••••')}</strong></span>
            </div>
          </div>
        </div>
        <div class="emp-action-btns" style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
          <button type="button" class="btn-edit-profile" data-edit-emp="${emp.id}" title="${isAdmin ? 'Edit Profile & Update Password (નામ / પાસવર્ડ બદલો)' : 'Edit Profile (પાસવર્ડ બદલો)'}" style="display:inline-flex; align-items:center; gap:4px; padding: 6px 12px; font-size: 12px; font-weight: 700; background: #4f46e5; color: #ffffff; border: none; border-radius: 6px; cursor: pointer; box-shadow: 0 2px 6px rgba(79, 70, 229, 0.2);">
            <span>✏️ ${isAdmin ? 'Edit / Update Password' : 'Change Password'}</span>
          </button>
          ${isSelf 
            ? `<span class="active-profile-tag" style="background:#dcfce7; color:#15803d; font-weight:700; padding:4px 8px; border-radius:6px; font-size:11px;">${this.t('activeProfileTag')}</span>` 
            : (isAdmin ? `<button type="button" class="btn-switch-profile" data-switch-id="${emp.id}">${this.t('btnSwitchProfile')}</button>` : '')}
          ${(isAdmin && !isSelf && emp.role !== 'Admin') 
            ? `<button type="button" class="action-icon-btn btn-delete-row" data-del-emp="${emp.id}" title="Remove Account / ખાતું દૂર કરો" style="width:28px; height:28px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px; height:13px;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
               </button>` 
            : ''}
        </div>
      `;

      card.querySelectorAll('[data-edit-emp]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.openEditProfileModal(btn.getAttribute('data-edit-emp'));
        });
      });

      card.querySelectorAll('[data-switch-id]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.switchActiveProfile(btn.getAttribute('data-switch-id'));
        });
      });

      card.querySelectorAll('[data-del-emp]').forEach(btn => {
        btn.addEventListener('click', () => {
          const empId = btn.getAttribute('data-del-emp');
          if (confirm(`Are you sure you want to delete this staff member? / શું તમે આ કર્મચારી પ્રોફાઇલ દૂર કરવા માંગો છો?`)) {
            this.deleteEmployee(empId);
          }
        });
      });

      this.employeeCardsContainer.appendChild(card);
    });

    this.populateStaffDropdown();
  }

  populateStaffDropdown() {
    if (!this.selectCustStaff) return;
    const currentVal = this.selectCustStaff.value;
    this.selectCustStaff.innerHTML = '';
    this.data.employees.forEach(emp => {
      const opt = document.createElement('option');
      opt.value = emp.id;
      opt.textContent = `${emp.name} (${emp.role})`;
      this.selectCustStaff.appendChild(opt);
    });
    if (currentVal) {
      this.selectCustStaff.value = currentVal;
    } else if (this.data.activeEmployeeId) {
      this.selectCustStaff.value = this.data.activeEmployeeId;
    }
  }

  switchActiveProfile(empId) {
    if (!this.isCurrentUserAdmin()) {
      alert('Access denied: Only Admin can switch active profile.');
      return;
    }
    const emp = this.data.employees.find(e => e.id === empId);
    if (!emp) return;

    this.saveSession(emp);
    this.render();
    this.renderEmployees();
    this.showToast(`Switched active profile to ${emp.name} (${emp.role})! / સક્રિય પ્રોફાઇલ બદલાઈ ગઈ!`, 'success');
  }

  saveNewEmployee() {
    if (!this.isCurrentUserAdmin()) {
      alert('Access denied: Only Admin can add new staff members.');
      return;
    }
    const name = document.getElementById('inputNewEmpName').value.trim();
    const role = document.getElementById('selectNewEmpRole').value;
    const phone = document.getElementById('inputNewEmpPhone').value.trim();
    const email = document.getElementById('inputNewEmpEmail').value.trim();
    const usernameInput = document.getElementById('inputNewEmpUsername');
    const passwordInput = document.getElementById('inputNewEmpPassword');
    const username = usernameInput ? usernameInput.value.trim().toLowerCase() : '';
    const password = passwordInput ? passwordInput.value.trim() : '';

    if (!name || !username || !password) {
      alert('Please enter staff name, Login User ID, and password.');
      return;
    }

    const exists = this.data.employees.some(e => e.username && e.username.toLowerCase() === username);
    if (exists) {
      alert(`User ID "${username}" is already in use. Please enter a different User ID.`);
      return;
    }

    const newEmp = {
      id: 'emp_' + Date.now(),
      name: name,
      role: role,
      username: username,
      password: password,
      phone: phone || '+91 99250 23570',
      email: email || `${username}@momai.com`
    };

    this.data.employees.push(newEmp);
    this.saveData();
    this.renderEmployees();
    this.populateStaffDropdown();
    if (this.isCurrentUserAdmin()) {
      this.renderMasterStaffFilter();
    }

    document.getElementById('inputNewEmpName').value = '';
    document.getElementById('inputNewEmpPhone').value = '';
    document.getElementById('inputNewEmpEmail').value = '';
    if (usernameInput) usernameInput.value = '';
    if (passwordInput) passwordInput.value = '';

    this.showToast(`New staff member "${name}" (${role}) added successfully!`, 'success');
  }

  deleteEmployee(empId) {
    if (!this.isCurrentUserAdmin()) {
      alert('Access denied: Only Admin can delete staff profiles.');
      return;
    }
    this.data.employees = this.data.employees.filter(e => e.id !== empId);
    if (this.data.activeEmployeeId === empId) {
      this.data.activeEmployeeId = this.data.employees[0].id;
    }
    this.saveData();
    this.render();
    this.renderEmployees();
    this.showToast('Staff member removed!', 'success');
  }

  // --- Edit & Rename Staff / Admin Profile Methods ---
  openEditProfileModal(empId) {
    const isAdmin = this.isCurrentUserAdmin();
    const currentMyId = (this.currentSession && this.currentSession.empId) ? this.currentSession.empId : this.data.activeEmployeeId;

    if (!isAdmin && empId !== currentMyId) {
      this.showToast('Access denied: You can only view and edit your own profile.', 'error');
      return;
    }

    const emp = (this.data.employees || []).find(e => e.id === empId);
    if (!emp) return;

    const modal = document.getElementById('modalEditProfile');
    const inputId = document.getElementById('editProfileEmpId');
    const inputName = document.getElementById('editProfileName');
    const selectRole = document.getElementById('editProfileRole');
    const groupRole = document.getElementById('editProfileRoleGroup');
    const inputPhone = document.getElementById('editProfilePhone');
    const inputEmail = document.getElementById('editProfileEmail');
    const inputUser = document.getElementById('editProfileUsername');
    const inputPass = document.getElementById('editProfilePassword');
    const modalTitle = document.getElementById('modalEditProfileTitle');

    if (modalTitle) {
      modalTitle.textContent = isAdmin
        ? (this.currentLang === 'gu' ? 'કર્મચારી પ્રોફાઇલ સંપાદિત કરો (એડમિન)' : 'Edit Staff Profile (Admin)')
        : (this.currentLang === 'gu' ? 'મારી પ્રોફાઇલ સંપાદિત કરો' : 'Edit My Profile');
    }

    if (inputId) inputId.value = emp.id;
    if (inputName) inputName.value = emp.name || '';
    if (selectRole) {
      selectRole.value = emp.role || 'Telecaller';
      selectRole.disabled = !isAdmin;
    }
    if (groupRole) {
      groupRole.style.display = isAdmin ? 'block' : 'none';
    }
    if (inputPhone) inputPhone.value = emp.phone || '';
    if (inputEmail) inputEmail.value = emp.email || '';
    if (inputUser) inputUser.value = emp.username || '';
    if (inputPass) inputPass.value = emp.password || '';

    if (modal) {
      modal.classList.add('active');
      setTimeout(() => {
        if (inputName) {
          inputName.focus();
          inputName.select();
        }
      }, 150);
    }
  }

  closeEditProfileModal() {
    const modal = document.getElementById('modalEditProfile');
    if (modal) modal.classList.remove('active');
  }

  handleEditProfileSubmit() {
    const isAdmin = this.isCurrentUserAdmin();
    const currentMyId = (this.currentSession && this.currentSession.empId) ? this.currentSession.empId : this.data.activeEmployeeId;

    const inputId = document.getElementById('editProfileEmpId');
    const empId = inputId ? inputId.value : '';

    if (!isAdmin && empId !== currentMyId) {
      alert('Access denied: You can only edit your own profile.');
      return;
    }

    const name = (document.getElementById('editProfileName')?.value || '').trim();
    const phone = (document.getElementById('editProfilePhone')?.value || '').trim();
    const email = (document.getElementById('editProfileEmail')?.value || '').trim();
    const username = (document.getElementById('editProfileUsername')?.value || '').trim();
    const password = (document.getElementById('editProfilePassword')?.value || '').trim();

    if (!name || !username || !password) {
      alert('Please enter Full Name, User ID, and Password.');
      return;
    }

    const emp = (this.data.employees || []).find(e => e.id === empId);
    if (!emp) return;

    // Role: Only Admin can change roles. Non-admin always keeps their existing role!
    const role = isAdmin 
      ? (document.getElementById('editProfileRole')?.value || emp.role) 
      : emp.role;

    // Check if username changed and conflicts with another employee
    const conflict = (this.data.employees || []).some(e => e.id !== empId && e.username.toLowerCase() === username.toLowerCase());
    if (conflict) {
      alert(`User ID "${username}" is already taken by another staff member. Please pick another.`);
      return;
    }

    const oldName = emp.name;
    emp.name = name;
    emp.role = role;
    emp.phone = phone;
    emp.email = email;
    emp.username = username;
    emp.password = password;

    // If Admin or emp1, sync with top-level admin config
    if (emp.role === 'Admin' || emp.id === 'emp1' || emp.username.toLowerCase() === 'admin' || emp.id === this.data.activeEmployeeId) {
      if (this.data.admin) {
        this.data.admin.name = name;
        this.data.admin.welcomeName = name.split(' ')[0];
        this.data.admin.initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || 'MA';
        this.data.admin.phone = phone;
        this.data.admin.password = password;
      }
      localStorage.setItem('momai_crm_admin_pass', password);
    }

    // If active session is this employee, update session
    if (this.currentSession && this.currentSession.empId === emp.id) {
      this.currentSession.name = name;
      this.currentSession.role = role;
      this.currentSession.username = username;
      this.saveSession(this.currentSession);
    }

    this.saveData();
    this.render();
    this.renderEmployees();
    this.closeEditProfileModal();

    this.logActivity('contacted', `Profile updated & renamed for ${name} (formerly ${oldName})`);
    this.showToast(this.currentLang === 'gu' ? `પ્રોફાઇલ "${name}" સફળતાપૂર્વક સાચવી લેવામાં આવી છે!` : `Profile "${name}" updated successfully!`, 'success');
  }

  openBulkModal() {
    this.updateBulkPreview();
    const channelSelect = document.getElementById('bulkChannel');
    const audienceSelect = document.getElementById('bulkAudience');

    channelSelect.onchange = () => this.updateBulkPreview();
    audienceSelect.onchange = () => this.updateBulkPreview();

    this.bulkModal.classList.add('active');
  }

  updateBulkPreview() {
    const previewBox = document.getElementById('bulkMsgPreview');
    const channel = document.getElementById('bulkChannel').value;
    const count = this.data.callingList.length;

    if (this.currentLang === 'gu') {
      previewBox.value = `[Momai Enterprise ${channel.toUpperCase()} રિમાઇન્ડર]\nનમસ્તે [ગ્રાહકનું નામ],\nતમારા વાહન [વાહન નંબર] નું દસ્તાવેજ ટૂંક સમયમાં સમાપ્ત થાય છે.\nદંડથી બચવા માટે Momai Enterprise દ્વારા તરત જ રિન્યુ કરાવો.\nસંપર્ક: ${this.data.admin.phone}\n(કુલ ${count} ગ્રાહકોને મોકલવામાં આવશે)`;
    } else {
      previewBox.value = `[Momai Enterprise ${channel.toUpperCase()} Reminder]\nDear [Customer Name],\nYour vehicle [Vehicle No] document is expiring soon.\nPlease contact Momai Enterprise to renew it today and avoid traffic fines.\nContact: ${this.data.admin.phone}\n(Will be sent to ${count} customers)`;
    }
  }

  handleSendBulk() {
    this.closeModals();
    this.logActivity('send', `Bulk reminders dispatched to ${this.data.callingList.length} customers`);
    this.showToast(this.t('toastReminderSent'), 'success');
  }

  openImportModal() {
    this.importModal.classList.add('active');
  }

  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.classList.remove('active');
    });
    this.editingCustomerId = null;
  }

  // --- Real Excel (.xlsx) Export using SheetJS + Blob ---
  exportCustomersToExcel() {
    try {
      if (typeof XLSX !== 'undefined') {
        const exportRows = this.data.callingList.map(c => ({
          'Customer Name': c.name,
          'Mobile Phone Number': c.phone || '9925023570',
          'Vehicle Type': c.vehicleType || '4-wheeler',
          'Vehicle Registration No': c.vehicle,
          'Document Type': c.doc,
          'Expiry Date': c.expiry,
          'Days Left': c.daysLeft,
          'Status': c.status,
          'Assigned Staff': c.assignedStaff ? this.getEmployeeName(c.assignedStaff) : (c.createdBy || 'Sabir Ajmeri'),
          'Remarks': c.remarks || ''
        }));

        const ws = XLSX.utils.json_to_sheet(exportRows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Customers');

        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const fileName = `Momai_Enterprise_Customers_${new Date().toISOString().slice(0, 10)}.xlsx`;
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 150);

        this.showToast('Customers exported to Excel (.xlsx) successfully!', 'success');
        return;
      }
    } catch (err) {
      console.warn('XLSX export failed, falling back to Excel XML:', err);
    }

    // Fallback to Excel XML (.xls) which opens directly in Microsoft Excel
    this.exportCustomersToExcelFallback();
  }

  // --- Fallback Excel (.xls) with rich formatting and styling ---
  exportCustomersToExcelFallback() {
    const headers = ['Customer Name', 'Mobile Phone Number', 'Vehicle Type', 'Vehicle Registration No', 'Document Type', 'Expiry Date', 'Days Left', 'Status'];
    const rowsHtml = this.data.callingList.map(c => `
      <tr>
        <td>${this.escapeHtml(c.name)}</td>
        <td>${this.escapeHtml(c.phone || '9925023570')}</td>
        <td>${this.escapeHtml(c.vehicleType || '4-wheeler')}</td>
        <td>${this.escapeHtml(c.vehicle)}</td>
        <td>${this.escapeHtml(c.doc)}</td>
        <td>${this.escapeHtml(c.expiry)}</td>
        <td>${this.escapeHtml(c.daysLeft)}</td>
        <td>${this.escapeHtml(c.status)}</td>
      </tr>
    `).join('');

    const excelXml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Customers</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        <style>
          th { background-color: #1e66f5; color: #ffffff; font-weight: bold; border: 1px solid #cbd5e1; padding: 10px; }
          td { border: 1px solid #e2e8f0; padding: 8px; font-size: 13px; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([excelXml], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Momai_Enterprise_Customers_${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 150);

    this.showToast('Customers exported to Excel (.xls) successfully!', 'success');
  }

  // --- Download Sample Template for Excel / CSV ---
  downloadSampleExcelTemplate() {
    const sampleRows = [
      {
        'Customer Name': 'Rajesh Patel',
        'Mobile Phone Number': '9825012345',
        'Vehicle Type': '4-wheeler',
        'Vehicle Registration No': 'GJ01AB1234',
        'Document Type': 'Insurance',
        'Expiry Date': '15 Sep 2026',
        'Days Left': '6 Days',
        'Status': 'Due Soon',
        'Assigned Staff': 'Kavita Dave',
        'Remarks': 'Called - will renew on Friday'
      },
      {
        'Customer Name': 'Priya Shah',
        'Mobile Phone Number': '9898023456',
        'Vehicle Type': '2-wheeler',
        'Vehicle Registration No': 'GJ27CD5678',
        'Document Type': 'PUC',
        'Expiry Date': '09 Sep 2026',
        'Days Left': 'Today',
        'Status': 'Expiry Today',
        'Assigned Staff': 'Hitesh Solanki',
        'Remarks': 'WhatsApp quotation sent'
      },
      {
        'Customer Name': 'Amit Trivedi',
        'Mobile Phone Number': '9723034567',
        'Vehicle Type': 'commercial',
        'Vehicle Registration No': 'GJ01EF9012',
        'Document Type': 'Fitness',
        'Expiry Date': '12 Sep 2026',
        'Days Left': '3 Days',
        'Status': 'Due Soon',
        'Assigned Staff': 'Mayur Vaghela',
        'Remarks': 'Agreed to renew'
      },
      {
        'Customer Name': 'Karan Varma',
        'Mobile Phone Number': '9825411223',
        'Vehicle Type': '2-wheeler',
        'Vehicle Registration No': 'GJ01XY8899',
        'Document Type': 'New Driving Licence',
        'Expiry Date': '18 Sep 2026',
        'Days Left': '7 Days',
        'Status': 'Due Soon',
        'Assigned Staff': 'Sabir Ajmeri',
        'Remarks': 'RTO test cleared'
      },
      {
        'Customer Name': 'Bhavik Shah',
        'Mobile Phone Number': '9879055443',
        'Vehicle Type': '4-wheeler',
        'Vehicle Registration No': 'GJ27AA3322',
        'Document Type': 'Renewal Licence',
        'Expiry Date': '14 Sep 2026',
        'Days Left': '3 Days',
        'Status': 'Due Soon',
        'Assigned Staff': 'Kavita Dave',
        'Remarks': 'Medical certificate uploaded'
      },
      {
        'Customer Name': 'Dharmesh Parikh',
        'Mobile Phone Number': '9824099887',
        'Vehicle Type': '4-wheeler',
        'Vehicle Registration No': 'GJ01BB5544',
        'Document Type': 'RC Transfer',
        'Expiry Date': '20 Sep 2026',
        'Days Left': '9 Days',
        'Status': 'Upcoming',
        'Assigned Staff': 'Hitesh Solanki',
        'Remarks': 'Buyer NOC received'
      },
      {
        'Customer Name': 'Jayanti Chauhan',
        'Mobile Phone Number': '9909066554',
        'Vehicle Type': 'commercial',
        'Vehicle Registration No': 'GJ01JK9900',
        'Document Type': 'Vehicle Passing',
        'Expiry Date': '11 Sep 2026',
        'Days Left': 'Today',
        'Status': 'Expiry Today',
        'Assigned Staff': 'Sabir Ajmeri',
        'Remarks': 'Passing appointment booked'
      }
    ];

    try {
      if (typeof XLSX !== 'undefined') {
        const ws = XLSX.utils.json_to_sheet(sampleRows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sample_Template');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Momai_Enterprise_Sample_Template.xlsx';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 150);
        this.showToast('Sample Excel template (.xlsx) downloaded successfully!', 'success');
        return;
      }
    } catch (e) {
      console.warn('XLSX template generation error:', e);
    }

    this.exportCustomersToCSV();
  }

  // --- Blob-based CSV Export with UTF-8 BOM for perfect Excel compatibility ---
  exportCustomersToCSV() {
    const headers = ['Customer Name', 'Mobile Number', 'Vehicle Type', 'Vehicle No', 'Document', 'Expiry Date', 'Days Left', 'Status', 'Assigned Staff', 'Remarks'];
    const rows = this.data.callingList.map(c => [
      `"${c.name}"`,
      `"${c.phone || '9925023570'}"`,
      `"${c.vehicleType || '4-wheeler'}"`,
      `"${c.vehicle}"`,
      `"${c.doc}"`,
      `"${c.expiry}"`,
      `"${c.daysLeft}"`,
      `"${c.status}"`,
      `"${c.assignedStaff ? this.getEmployeeName(c.assignedStaff) : (c.createdBy || 'Sabir Ajmeri')}"`,
      `"${c.remarks || ''}"`
    ]);

    // \uFEFF BOM ensures Microsoft Excel opens UTF-8 without garbled characters
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Momai_Enterprise_Customers_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 150);

    this.showToast('Customers exported to CSV successfully!', 'success');
  }

  // --- Helpers for Excel & CSV Dates ---
  parseExcelDate(val) {
    if (!val && val !== 0) return '';
    if (typeof val === 'number') {
      const jsDate = new Date(Math.round((val - 25569) * 86400 * 1000));
      return this.formatInputToDisplay(jsDate.toISOString().slice(0, 10));
    }
    const s = String(val).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
      return this.formatInputToDisplay(s);
    }
    return s;
  }

  calculateDaysLeftString(dateStr) {
    const iso = this.formatDateToInput(dateStr);
    if (!iso) return 'Upcoming';
    const parts = iso.split('-').map(Number);
    const target = new Date(parts[0], parts[1] - 1, parts[2]);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.round((target - today) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays < 0) return 'Expired';
    return `${diffDays} Days`;
  }

  // --- Real Excel (.xlsx) & CSV Import ---
  handleFileUpload(file) {
    if (!file) return;
    const fileName = file.name.toLowerCase();
    const activeEmp = this.getActiveEmployee();
    const nowFormatted = new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });

    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { defval: '', raw: true });

          let importedCount = 0;
          json.forEach((row, i) => {
            const name = row['Customer Name'] || row['Customer'] || row['Name'] || row['name'] || row['ગ્રાહક'];
            const vehicle = row['Vehicle Registration No'] || row['Vehicle No'] || row['Vehicle Number'] || row['Vehicle'] || row['vehicle'] || row['વાહન'];
            if (name && vehicle) {
              const vTypeRaw = (row['Vehicle Type'] || row['Type'] || '4-wheeler').toLowerCase();
              const vType = vTypeRaw.includes('2') || vTypeRaw.includes('two') || vTypeRaw.includes('bike') ? '2-wheeler' : (vTypeRaw.includes('comm') || vTypeRaw.includes('truck') || vTypeRaw.includes('auto') ? 'commercial' : '4-wheeler');

              const rawExpiry = row['Expiry Date'] || row['Expiry'] || row['તારીખ'] || '25 Sep 2026';
              const expiryDisplay = this.parseExcelDate(rawExpiry) || '25 Sep 2026';
              const expiryRaw = this.formatDateToInput(expiryDisplay);
              const daysLeft = row['Days Left'] ? String(row['Days Left']).trim() : this.calculateDaysLeftString(expiryDisplay);
              const daysType = (daysLeft.toLowerCase().includes('today') || daysLeft.toLowerCase().includes('expired') || parseInt(daysLeft) <= 7) ? 'red' : 'normal';
              const docName = String(row['Document Type'] || row['Document'] || row['Doc'] || 'Insurance').trim();
              const remarks = String(row['Remarks'] || row['Remark'] || row['Notes'] || row['Calling Notes'] || '').trim();
              const staffInput = String(row['Assigned Staff'] || row['Staff'] || '').trim();
              const matchedEmp = staffInput ? (this.data.employees || []).find(emp => emp.name.toLowerCase() === staffInput.toLowerCase() || emp.id === staffInput) : null;
              const assignedStaff = matchedEmp ? matchedEmp.id : activeEmp.id;

              this.data.callingList.push({
                id: 'imp_xl_' + Date.now() + '_' + i,
                name: String(name).trim(),
                phone: String(row['Mobile Phone Number'] || row['Mobile'] || row['Phone'] || row['મોબાઇલ'] || '9825012345').trim(),
                vehicleType: vType,
                vehicle: String(vehicle).trim().toUpperCase(),
                doc: docName,
                expiry: expiryDisplay,
                expiryRaw: expiryRaw,
                daysLeft: daysLeft,
                daysType: daysType,
                status: String(row['Status'] || (daysLeft.toLowerCase().includes('today') ? 'Expiry Today' : (daysLeft.toLowerCase().includes('expired') ? 'Expired' : 'Due Soon'))).trim(),
                assignedStaff: assignedStaff,
                remarks: remarks,
                contacted: false,
                createdBy: activeEmp.name,
                createdById: activeEmp.id,
                createdAt: nowFormatted,
                lastModifiedBy: activeEmp.name,
                lastModifiedAt: nowFormatted
              });
              importedCount++;
            }
          });

          this.saveData();
          this.render();
          this.closeModals();
          this.logActivity('contacted', `Imported ${importedCount} customers from Excel file (${file.name}) by ${activeEmp.name}`);
          this.showToast(`Imported ${importedCount} customers from Excel successfully!`, 'success');
        } catch (err) {
          console.error(err);
          alert('Error reading Excel file. Please use the sample template format.');
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      // CSV handler
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        let importedCount = 0;

        for (let i = 1; i < lines.length; i++) {
          const parts = lines[i].split(',').map(p => p.replace(/^"|"$/g, '').trim());
          if (parts.length >= 2 && parts[0] && parts[1]) {
            const name = parts[0];
            const phone = parts[1] || '9825012345';
            const vTypeRaw = (parts[2] || '4-wheeler').toLowerCase();
            const vType = vTypeRaw.includes('2') ? '2-wheeler' : (vTypeRaw.includes('comm') ? 'commercial' : '4-wheeler');
            const vehicle = parts[3] || parts[1];
            const doc = parts[4] || 'Insurance';
            const expiry = parts[5] || '25 Sep 2026';
            const expiryRaw = this.formatDateToInput(expiry);
            const daysLeft = parts[6] || this.calculateDaysLeftString(expiry);
            const daysType = (daysLeft.toLowerCase().includes('today') || daysLeft.toLowerCase().includes('expired') || parseInt(daysLeft) <= 7) ? 'red' : 'normal';
            const status = parts[7] || 'Due Soon';
            const remarks = parts[8] || '';

            this.data.callingList.push({
              id: 'imp_csv_' + Date.now() + '_' + i,
              name: name,
              phone: phone,
              vehicleType: vType,
              vehicle: vehicle.toUpperCase(),
              doc: doc,
              expiry: expiry,
              expiryRaw: expiryRaw,
              daysLeft: daysLeft,
              daysType: daysType,
              status: status,
              assignedStaff: activeEmp.id,
              remarks: remarks,
              contacted: false,
              createdBy: activeEmp.name,
              createdById: activeEmp.id,
              createdAt: nowFormatted,
              lastModifiedBy: activeEmp.name,
              lastModifiedAt: nowFormatted
            });
            importedCount++;
          }
        }

        this.saveData();
        this.render();
        this.closeModals();
        this.logActivity('contacted', `Imported ${importedCount} customers from CSV file by ${activeEmp.name}`);
        this.showToast(`Imported ${importedCount} customers from CSV!`, 'success');
      };
      reader.readAsText(file);
    }
  }

  // --- Dynamic Document Types Rendering across all UI ---
  renderDynamicDocumentTypes() {
    const docTypes = this.data.documentTypes || [];
    const allCalling = this.data.callingList || [];

    // 1. Populate Customer Modal selectCustDoc
    if (this.selectCustDoc) {
      const currentVal = this.selectCustDoc.value;
      this.selectCustDoc.innerHTML = '';
      docTypes.forEach(dt => {
        const opt = document.createElement('option');
        opt.value = dt.name;
        opt.textContent = `${dt.icon || '📄'} ${this.getTranslatedDoc(dt.name)}`;
        this.selectCustDoc.appendChild(opt);
      });
      if (currentVal) this.selectCustDoc.value = currentVal;
    }

    // 2. Populate Sidebar Document Submenu
    if (this.sidebarDocSubmenu) {
      this.sidebarDocSubmenu.innerHTML = '';
      docTypes.forEach(dt => {
        const a = document.createElement('a');
        a.href = `#documents-${dt.id}`;
        a.className = 'nav-sub-item';
        a.setAttribute('data-view-target', 'documents');
        a.setAttribute('data-doc-tab', dt.id);
        a.innerHTML = `<span class="nav-bullet"></span><span>${dt.icon || ''} ${this.getTranslatedDoc(dt.name)}</span>`;
        this.sidebarDocSubmenu.appendChild(a);
      });
      // Add Expired
      const expA = document.createElement('a');
      expA.href = '#documents-expired';
      expA.className = 'nav-sub-item';
      expA.setAttribute('data-view-target', 'documents');
      expA.setAttribute('data-doc-tab', 'expired');
      expA.innerHTML = `<span class="nav-bullet" style="background:#ef4444;"></span><span>${this.t('navExpired')}</span>`;
      this.sidebarDocSubmenu.appendChild(expA);

      // Add Manage Types button for Admin
      if (this.isCurrentUserAdmin()) {
        const manageA = document.createElement('a');
        manageA.href = 'javascript:void(0)';
        manageA.className = 'nav-sub-item nav-manage-docs';
        manageA.id = 'btnSidebarManageDocs';
        manageA.style.cssText = 'color: #4f46e5; font-weight: 700; margin-top: 4px;';
        manageA.innerHTML = `<span class="nav-bullet" style="background:#4f46e5;"></span><span>⚙️ ${this.t('manageDocTypes')}</span>`;
        manageA.addEventListener('click', (e) => {
          e.preventDefault();
          this.openManageDocTypesModal();
        });
        this.sidebarDocSubmenu.appendChild(manageA);
      }
    }

    // 3. Populate Documents View Filter Tabs
    if (this.docFilterTabsContainer) {
      const activeTab = this.docActiveTab || 'all';
      this.docFilterTabsContainer.innerHTML = '';
      // 'All Documents' tab
      const allBtn = document.createElement('button');
      allBtn.className = `doc-tab-btn ${activeTab === 'all' ? 'active' : ''}`;
      allBtn.setAttribute('data-tab-name', 'all');
      allBtn.innerHTML = `<span data-i18n="filterAllDocs">${this.t('filterAllDocs')}</span><span class="tab-count" id="docTabCountAll">${allCalling.length}</span>`;
      this.docFilterTabsContainer.appendChild(allBtn);

      // Individual Document Tabs
      docTypes.forEach(dt => {
        const count = allCalling.filter(c => (c.doc || '').toLowerCase().includes(dt.name.toLowerCase()) || (c.doc || '').toLowerCase().includes(dt.id.toLowerCase())).length;
        const btn = document.createElement('button');
        btn.className = `doc-tab-btn ${activeTab === dt.id ? 'active' : ''}`;
        btn.setAttribute('data-tab-name', dt.id);
        btn.innerHTML = `<span>${dt.icon || ''} ${this.getTranslatedDoc(dt.name)}</span><span class="tab-count">${count}</span>`;
        this.docFilterTabsContainer.appendChild(btn);
      });

      // 'Expired' tab
      const expCount = allCalling.filter(c => (c.status || '').toLowerCase().includes('expired') || (c.daysLeft || '').toLowerCase().includes('expired')).length;
      const expBtn = document.createElement('button');
      expBtn.className = `doc-tab-btn ${activeTab === 'expired' ? 'active' : ''}`;
      expBtn.setAttribute('data-tab-name', 'expired');
      expBtn.innerHTML = `<span data-i18n="navExpired">${this.t('navExpired')}</span><span class="tab-count" style="background:#fee2e2; color:#b91c1c;">${expCount}</span>`;
      this.docFilterTabsContainer.appendChild(expBtn);

      // Re-bind tab click events
      this.docFilterTabsContainer.querySelectorAll('.doc-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.docFilterTabsContainer.querySelectorAll('.doc-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.docActiveTab = btn.getAttribute('data-tab-name');
          this.renderDocumentsTable();
        });
      });
    }

    // 4. Populate Dashboard Document Status Card
    const docStatusContainer = document.querySelector('.doc-status-list');
    if (docStatusContainer) {
      docStatusContainer.innerHTML = '';
      docTypes.forEach(dt => {
        const norm = dt.name.toLowerCase();
        const matching = allCalling.filter(c => (c.doc || '').toLowerCase().includes(norm) || (c.doc || '').toLowerCase().includes(dt.id));
        const expiring = matching.filter(c => !((c.status || '').toLowerCase().includes('expired') || (c.daysLeft || '').toLowerCase().includes('expired'))).length;
        const expired = matching.filter(c => (c.status || '').toLowerCase().includes('expired') || (c.daysLeft || '').toLowerCase().includes('expired')).length;

        const item = document.createElement('div');
        item.className = 'doc-status-item';
        item.setAttribute('data-view-trigger', 'documents');
        item.setAttribute('data-doc-tab', dt.id);
        item.title = `Click to view ${dt.name} records`;
        item.innerHTML = `
          <div class="doc-status-left">
            <div class="doc-type-icon ${dt.color || 'blue'}" style="display:flex;align-items:center;justify-content:center;font-size:16px;">
              ${dt.icon || '📄'}
            </div>
            <span class="doc-type-name">${this.getTranslatedDoc(dt.name)}</span>
          </div>
          <div class="doc-status-right">
            <div class="doc-status-counts">
              <span class="count-expiring">${expiring} Expiring</span>
              <span class="count-expired">${expired} Expired</span>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        `;
        item.addEventListener('click', () => {
          this.navigateTo('documents');
          this.docActiveTab = dt.id;
          this.renderDynamicDocumentTypes();
          this.renderDocumentsTable();
        });
        docStatusContainer.appendChild(item);
      });
    }
  }

  // --- Dynamic Document Types Management (Admin Only) ---
  openManageDocTypesModal() {
    if (!this.isCurrentUserAdmin()) {
      this.showToast('Only Admin can manage document types! / માત્ર એડમિન જ દસ્તાવેજ પ્રકારો બદલી શકે છે.', 'error');
      return;
    }
    this.renderManageDocTypesList();
    if (this.modalManageDocTypes) {
      this.modalManageDocTypes.classList.add('active');
    }
  }

  renderManageDocTypesList() {
    if (!this.docTypesManageList) return;
    this.docTypesManageList.innerHTML = '';
    const docTypes = this.data.documentTypes || [];
    const allCalling = this.data.callingList || [];

    docTypes.forEach(dt => {
      const count = allCalling.filter(c => (c.doc || '').toLowerCase().includes(dt.name.toLowerCase()) || (c.doc || '').toLowerCase().includes(dt.id.toLowerCase())).length;
      const div = document.createElement('div');
      div.className = 'doc-type-item';
      div.innerHTML = `
        <div class="doc-type-item-left">
          <span style="font-size: 18px;">${dt.icon || '📄'}</span>
          <div>
            <div class="doc-type-item-name">${this.escapeHtml(dt.name)}</div>
            <div style="font-size: 11px; color: #64748b;">${this.escapeHtml(this.getTranslatedDoc(dt.name))}</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="doc-type-item-count">${count} records</span>
          <button type="button" class="btn-delete-doc-type" data-id="${dt.id}" title="Delete document type / દસ્તાવેજ પ્રકાર દૂર કરો">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      `;

      const deleteBtn = div.querySelector('.btn-delete-doc-type');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
          this.deleteDocumentType(dt.id, dt.name);
        });
      }
      this.docTypesManageList.appendChild(div);
    });
  }

  handleAddDocumentType() {
    if (!this.inputNewDocName) return;
    const name = this.inputNewDocName.value.trim();
    if (!name) return;

    if (!this.data.documentTypes) this.data.documentTypes = [];

    const exists = this.data.documentTypes.some(d => d.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      this.showToast(`"${name}" already exists! / આ દસ્તાવેજ પ્રકાર પહેલેથી જ અસ્તિત્વમાં છે.`, 'error');
      return;
    }

    const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || ('doc_' + Date.now());
    const icons = ['📄', '📜', '📑', '🪪', '🛡️', '📋', '🚗', '🔖'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    this.data.documentTypes.push({
      id: id,
      name: name,
      icon: randomIcon,
      color: 'blue'
    });

    this.inputNewDocName.value = '';
    this.saveData();
    this.render();
    this.renderDynamicDocumentTypes();
    this.renderManageDocTypesList();
    const activeEmp = this.getActiveEmployee();
    this.logActivity('contacted', `New document type "${name}" created by ${activeEmp.name}`);
    this.showToast(`Added document type "${name}" successfully! / દસ્તાવેજ પ્રકાર ઉમેરવામાં આવ્યો!`, 'success');
  }

  deleteDocumentType(id, name) {
    if (!this.data.documentTypes || this.data.documentTypes.length <= 1) {
      this.showToast('Cannot delete all document types. At least 1 type must remain.', 'error');
      return;
    }

    if (confirm(`Are you sure you want to delete "${name}"? / શું તમે ખરેખર "${name}" દસ્તાવેજ પ્રકાર દૂર કરવા માંગો છો?`)) {
      this.data.documentTypes = this.data.documentTypes.filter(d => d.id !== id);
      if (this.docActiveTab === id) {
        this.docActiveTab = 'all';
      }
      this.saveData();
      this.render();
      this.renderDynamicDocumentTypes();
      this.renderManageDocTypesList();
      const activeEmp = this.getActiveEmployee();
      this.logActivity('contacted', `Document type "${name}" removed by ${activeEmp.name}`);
      this.showToast(`Removed document type "${name}"! / દસ્તાવેજ પ્રકાર દૂર કર્યો!`, 'error');
    }
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : 'ℹ'}</span>
      <span>${this.escapeHtml(message)}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 3200);
  }

  // --- 1-Click Full JSON Database Backup Download ---
  downloadFullBackup() {
    const backupJson = JSON.stringify(this.data, null, 2);
    const blob = new Blob([backupJson], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Momai_CRM_Full_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 150);
    this.showToast('Complete Database Backup downloaded! Keep this file safe.', 'success');
  }

  // --- Restore from JSON Backup ---
  restoreFromBackup(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.callingList && Array.isArray(parsed.callingList)) {
          this.data = parsed;
          this.saveData();
          this.render();
          this.closeModals();
          this.showToast('Database restored successfully from backup!', 'success');
        } else {
          alert('Invalid backup file format.');
        }
      } catch (err) {
        alert('Error reading backup file: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Initialize on DOM load or immediately if ready
function initMomaiCRM() {
  if (!window.crm) {
    window.crm = new AutoCareCRM();
    window.app = window.crm;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMomaiCRM);
} else {
  initMomaiCRM();
}
