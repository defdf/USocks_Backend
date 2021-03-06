#  API for a E-commerce store USocks.
###### Application is implemeted with Express, main functionalities of this application including: 
- User APIs, including client and admin, with authenticationa and authorization middleware.
- Product and search APIs.
- Order APIs.

### User APIs
- [x] Get all users  
      /user  
- [x] Get one user  
        /user/:username  
- [x] Login user   
        /user/login  
        Takes JSON body of:    
        usernameOrEmail: string    
        password: string  
        
        Returns token: string
- [x] Create User    
         /user  
        Takes JSON body of minimun:    
        username: string,   
        email: string,  
        password: string,  
        firstName: string(optional),  
        lastName: string(optional),  
        
        Returns user: JSON object    
- [x] Update user  
        /user/:username  
        REQUIRES Authorization header with bearer token      
        Takes JSON body of:      
        updateField: <option>    
          options = email: string,    
                    firstName: string,      
                    lastName: string      
          newValue: string   
          
        Returns User JSON object     
- [x]  Delete a User    
        /user/:username  
        REQUIRES Authorization header with bearer token  

### Order APIs  
- [x]  Get all orders  
        /order  
- [x]  Get one order  
        /order/:id  
- [x]  Delete an order  
        /order/:id  
- [x]  Get all orders of an user  
        /user/:username/order  
- [x]  Get one order of an user  
        /user/:username/order/:orderId  
- [x]  Create an order for an user  
        /user/:username/order  
        Takes JSON body:  
        dateTime: DateTime,  
        totalPrice: int,  
        items:[{id: int, size: string, qty: int, unitPrice: int}]  
        
        Returns Order JSON object  

### Sock APIs 
- [x] Get all socks  
        /sock  
- [x] Get single sock  
        /sock/:id  
- [x] Get three top sold socks  
        /sock/top/picks  
- [x] Upload a sock  
        /sock  
        Takes JSON body of minimum:  
        name: string,  
        price: int,  
        imageUrl: string  
        OPtions:  
        description: string,  
        category: string,  
        size_qty: JSON  
  
        Returns Sock JSON object    
- [x] Delete a sock  
### Search API
- [x] Search socks  
        /sock/search/:keywords  
### Category APIS
- [x] Get all socks of men  
        sock/category/men  
- [x] Get all socks of women  
        sock/category/women  
- [x] Get all socks of kids  
        sock/category/kids  
- [x] Get all socks of gifts  
        sock/category/gifts  
