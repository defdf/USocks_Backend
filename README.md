# Express API for USocks

#### user APIs
- [x] Get all users  

- [x] Get one user  

- [x] Login user    
        Takes JSON body of:    
        usernameOrEmail: string    
        password: string    
        
        =======================  
        Returns token: string  
        
- [x] Create User    
        Takes JSON body of minimun:    
        username: string,   
        email: string,  
        password: string    
        
        =======================    
        Returns User JSON object    

- [x] Update User        
        REQUIRES Authorization header with bearer token      
        Takes json body of:      
        updateField: <option>    
          options = email: string,    
                    firstName: string,      
                    lastName: string      
          newValue: string   
          
        =======================    
        Returns User json object    
 
- [x]  Delete a User    
    REQUIRES Authorization header with bearer token  

#### sock APIs
- [x] Get all socks
- [x] Get single sock
- [x] Upload a sock
        Takes json body of minimum:
        name: string,
        price: string,
        image_url: string

        =======================  
        Returns Sock JSON object  
- [ ] Get all socks of men  
- [ ] Get all socks of women  
- [ ] Get all socks of kids  
- [ ] Get all socks of gifts  
- [ ] Search socks  

#### size APIs
- [x] Get all sizes  
- [x] Get single size    
- [x] Create a size  
- [x] Delete a size  

#### category APIs
- [x] Get all categories  
- [x] Get single category    
- [x] Create a category  
- [x] Delete a category  
