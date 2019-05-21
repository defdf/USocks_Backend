# Express API for USocks

### http://35.228.53.104:3000
#### /user APIs
- [x] Get all users  
- [x] Get one user  
- [x] Login user    
        Takes JSON body of:    
        usernameOrEmail: string    
        password: string  
        
        Returns token: string
- [x] Create User    
        Takes JSON body of minimun:    
        username: string,   
        email: string,
        password: string    
        
        Returns User JSON object    
- [x] Update User        
        REQUIRES Authorization header with bearer token      
        Takes JSON body of:      
        updateField: <option>    
          options = email: string,    
                    firstName: string,      
                    lastName: string      
          newValue: string   
          
        Returns User JSON object     
- [x]  Delete a User    
        REQUIRES Authorization header with bearer token  

#### /sock APIs 
- [x] Get all socks
- [x] Get single sock
- [x] Upload a sock  
        Takes JSON body of minimum:  
        name: string,  
        price: string,  
        image_url: string  
  
        Returns Sock JSON object    
- [x] Get all socks of men  
- [x] Get all socks of women  
- [x] Get all socks of kids  
- [x] Get all socks of gifts  
- [ ] Search socks  
- [ ] Modify a sock  
- [ ] Delete a sock  

#### /size APIs
- [x] Get all sizes  
- [x] Get single size    
- [x] Create a size  
        Takes JSON body of:  
        name: string
        
        Returns name: string
- [x] Delete a size  

#### category APIs
- [x] Get all categories  
- [x] Get single category    
- [x] Create a category   
        Takes JSON body of:    
        name: string  
        
        Returns name: string
- [x] Delete a category  
