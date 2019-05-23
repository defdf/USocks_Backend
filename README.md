# Express API for USocks

### http://35.228.53.104:3000
#### User APIs
- [x] /user -> Get all users  
- [x] /user/:username -> Get one user  
- [x] /user/login -> Login user    
        Takes JSON body of:    
        usernameOrEmail: string    
        password: string  
        
        Returns token: string
- [x] /user -> Create User    
        Takes JSON body of minimun:    
        username: string,   
        email: string,
        password: string
        Optional:
        firstName: string,
        lastName: string,
        
        Returns User JSON object    
- [x] /user/:username -> Update a User        
        REQUIRES Authorization header with bearer token      
        Takes JSON body of:      
        updateField: <option>    
          options = email: string,    
                    firstName: string,      
                    lastName: string      
          newValue: string   
          
        Returns User JSON object     
- [x]  /user/:username -> Delete a User    
        REQUIRES Authorization header with bearer token  

#### Order APIs
- [x]  Get all orders of an user  
        /user/:username/order  
- [x]  Get one order of an user  
        /user/:username/order/:orderId  
- [x]  Create an order for an user  
        /user/:username/order  
        Takes JSON body:  
        dateTime: DateTime,
        totalPrice: int,
        items:[  
                id: int,  
                qty: int,  
                unitPrice: int  
        ]  
        
        Returns Order JSON object  

#### Sock APIs 
- [x] /sock -> Get all socks
- [x] /sock/:id -> Get single sock
- [x] /sock -> Upload a sock  
        Takes JSON body of minimum:  
        name: string,  
        price: int,  
        image_url: string  
  
        Returns Sock JSON object    
- [ ] Delete a sock  
###### Search API
- [x] /sock/search/:keywords -> Search socks  
###### Category APIS
- [x] sock/category/men -> Get all socks of men  
- [x] sock/category/women -> Get all socks of women  
- [x] sock/category/kids -> Get all socks of kids  
- [x] sock/category/gifts -> Get all socks of gifts  
