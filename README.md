# Express API for USocks

## user endpoints
Get all users

Get one user

Login user
        Takes JSON body of:
        usernameOrEmail: string
        password: string
        
        =======================
        Returns:
        token: string
        
Create User
        Takes JSON body of minimun:
        username: string,
        email: string,
        password: string
        
        ==========================
        Returns User JSON object

Update User
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
 
Delete a User
    REQUIRES Authorization header with bearer token
