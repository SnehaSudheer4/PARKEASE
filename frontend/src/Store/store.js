import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Features/setUser';
import adminReducer from '../Features/setAdmin';
import companyReducer from '../Features/setCompany';
import securityReducer from '../Features/setSecurity'



export default configureStore({
    reducer:{
        user:userReducer,
        admin:adminReducer,
        company:companyReducer,
        security:securityReducer,

    }
})