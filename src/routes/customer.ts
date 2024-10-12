import * as customerController from "@/controller/customers";
import express from "express";
import { AllRoutes } from "./RouteUrls";

const customerRouter = express.Router();

customerRouter.get(AllRoutes.customers.GET_ALL, customerController.getCustomers);
// customerRouter.get(AllRoutes.customers.GET_BY_ID, getCustomerById) ;
customerRouter.get(AllRoutes.customers.CREATE,customerController.showCreateForm) ; 
customerRouter.post(AllRoutes.customers.CREATE,customerController.createCustomer) ;

customerRouter.get(AllRoutes.customers.EDIT_BY_ID,customerController.showEditForm) ; 
customerRouter.post(AllRoutes.customers.EDIT_BY_ID,customerController.updateCustomer) ; 

customerRouter.post(AllRoutes.customers.DELETE_BY_ID,customerController.deleteCustomer) ; 





export default customerRouter;