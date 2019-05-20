# Express API for USocks

#### user APIs
-[x] Get all users

-[x] Get one user

-[x] Login user
        Takes JSON body of:
        usernameOrEmail: string
        password: string
        
        =======================
        Returns:
        token: string
        
-[x] Create User
        Takes JSON body of minimun:
        username: string,
        email: string,
        password: string
        
        ==========================
        Returns User JSON object

-[x] Update User
    REQUIRES Authorization header with bearer token
    Takes json body of:
        updateField: <option>
            options =
                email: string,
                firstName: string,
                lastName: string
        newValue: string
    ==============================
    Returns User json object
 
-[x]  Delete a User
    REQUIRES Authorization header with bearer token
