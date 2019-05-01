# Express API for USocks

Get all users

Get one user

Login user:
    Takes JSON body of:
    usernameOrEmail: string
    password: string

    =======================
    Returns:
    success: boolean
    token: string

Create user:
    Takes json body of minimum:
    username: string,
    email: string,
    password: string

    ===========================
    Returns User JSON object
