import { db } from "@/db/db";
import { AllRoutes } from "@/routes/RouteUrls";
import { Request,Response } from "express";


export async function getCustomers(req: Request , res: Response){
    console.log(`GET request received for ${req.url} at ${new Date().toLocaleString()}` ); 
    const customers = await db.customer.findMany({
        orderBy: { id: "asc" },
    });
    // let htmlResp = ejs.renderFile("customers/list.ejs",{customers:customers},{async: true});
    //  return res.status(200).json(customers);
     res.render("customers/list.ejs",{"customers":customers});
    // res.send(htmlResp);
}


export async function getCustomerById(req: Request , res: Response){
    
    const id:number = parseInt(req.params.id) ;
    console.log(`${req.method} request received for ${req.url} at ${new Date().toLocaleString()}` ); 
    const customers = [
        { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "+1234567890" },
        { id: 2, name: "Joel Smith3",email: "joel.smith@example.com",phone: "+0987654321"},
        { id: 3, name: "Joel Smith4",email: "joel.smith@example.com",phone: "+0987654321"},
      ];

    //   const customer = customers.find((customer) => customer.id === id ) ; 
    const customer = await db.customer.findUnique({where: {"id": id}}) ;

      if(!customer)
      {
        return res.status(200).json({message: `Customer with id : ${id} not Found`}) ; 
      }
      res.render("customers/list.ejs",{"customers":customer});
    // return res.status(200).json(customer);
}


export async function createCustomer(req:Request,res:Response) {
    console.log(`${req.method} request received for ${req.url} at ${new Date().toLocaleString()} with ${JSON.stringify(req.body)}`); 
    const {name,email,phone} = req.body;
    try {
        const newCustomer = await db.customer.create({
            data: {
                "name": name,
                "email": email,
                "phone": phone.toString(),
            }
        }) ; 
        console.log("success", "Customer created successfully");
        res.status(302).redirect(AllRoutes.customers.BASE_API + AllRoutes.customers.GET_ALL) ;
        // res.render("customers/list.ejs",{"customers":newCustomer});
    } catch (error) {
        console.log(error) ; 
        res.status(501).render("customers/error",{message: "Failed To create customer" , "error": error}) ; 
    }
}

export async function showEditForm(req: Request, res: Response) {
    const customer = await db.customer.findUnique({
        where: { "id": parseInt(req.params.id) },
    });
    res.render("customers/edit", { "customer":customer });
}

export const showCreateForm = (req: Request, res: Response) => {
    res.render("customers/create");
  };

export async function updateCustomer(req: Request, res: Response) {
    console.log(`${req.method} request received for ${req.url} at ${new Date().toLocaleString()} with ${JSON.stringify(req.body)} for id : ${req.params.id}`); 
    const id = parseInt(req.params.id) ;
    const {name,email,phone} = req.body;
    try {
        const updatedCustomer = await db.customer.update({
            where: { "id": id },
            data: {
                "name": name,
                "email": email,
                "phone": phone.toString(),
            }
        }) ; 
        console.log("success", "Customer updated successfully");
        res.status(302).redirect(AllRoutes.customers.BASE_API + AllRoutes.customers.GET_ALL) ;
    } catch (error) {   
        console.log(error) ; 
        res.status(501).render("customers/error",{message: "Failed To update customer" , "error": error}) ; 
    }
}

export async function deleteCustomer(req: Request, res: Response) {
    const id = parseInt(req.params.id) ;
    try {
        await db.customer.delete({
            where: { id: id },
        });
        console.log("success", "Customer deleted successfully");
        res.status(302).redirect(AllRoutes.customers.BASE_API + AllRoutes.customers.GET_ALL) ;
    } catch (error) {
        console.log(error) ; 
        res.status(501).render("customers/error",{message: "Failed To delete customer" , "error": error}) ; 
    }
}