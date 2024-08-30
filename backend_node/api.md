# API Documentation: http://localhost:5000/api/v1/
___

# ⚡ _Authentication_
## Login
- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a JWT token.

#### Request Body
```json
{
  "email": "victor.olivares@apuestatotal.com",
  "password": "password"
}
```
#### Response: Success: 200 OK
```json
{
  "success": true,
  "id": 1,
  "name": "Victor Olivares",
  "email": "victor.olivares@apuestatotal.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ..."
}
```
#### Error: 400 Bad Request / 404 Not Found / 500 Internal Server Error
```json
{
  "message": "Invalid credentials"
}
```

## Logout
- **Endpoint**: `/auth/logout`
- **Method**: `POST`
- **Description**: Logs out the user by clearing the JWT token from cookies.

### Response Success: 200 OK
```json
{
  "message": "Logged out successfully"
}
```
### Error: 500 Internal Server Error
```json
{
  "error": "Error during logout"
}
```

## Verify Token
- **Endpoint**: `/auth/verify-token`
- **Method**:  `GET`
- **Description**: Verifies the JWT token and returns user information.

### Response Success: 200 OK
```json
{
  "userId": 11,
  "name": "Victor Olivares",
  "email": "victor.olivares@apuestatotal.com",
  "message": "Authorized",
  "success": true
}
```
### Error: 401 Unauthorized / 500 Internal Server Error
```json
{
  "error": "Unauthorized"
}
```

# ⚡ _Analyst_
## Create Analyst
- **Endpoint**: `/analyst`
- **Method**: `POST`
- **Description**: Creates a new analyst.

### Request Body
```json
{
  "name": "Jenson Paico",
  "email": "jenson.paico@apuestatotal.com",
  "pass": "password",
  "image": "https://picsum.photos/200",
  "companyId": 1,
  "typeAnalystId": 1,
  "flgActive": true,
  "flgChangePass": true,
  "flgMailBox": true,
  "cantLog": 0,
  "flgBlocked": false
}
```
### Response Success: 201 Created
```json
{
  "message": "Analyst created successfully",
  "analyst": {
    "createdAt": "2024-08-30T04:24:06.343Z",
    "updatedAt": "2024-08-30T04:24:06.343Z",
    "changePassDate": "2024-08-30T04:24:06.343Z",
    "analystId": 12,
    "name": "Jenson Paico",
    "email": "jenson.paico@apuestatotal.com",
    "pass": "$2b$10$puOg6ptPuj/fgOLM5ah.U.EQgUyRlN/HzH2DYKUrABG5cpmfkIWM6",
    "image": "https://picsum.photos/200",
    "companyId": 1,
    "typeAnalystId": 1,
    "flgActive": true,
    "flgChangePass": true,
    "flgMailBox": true,
    "cantLog": 0,
    "flgBlocked": false,
    "rememberToken": null,
    "deletedAt": null
  }
}
```
### Error: 500 Internal Server Error
```json
{
  "error": "Error creating analyst",
  "message": "Detailed error message"
}
```

## Get Analyst
- **Endpoint**: `/analyst/:id`
- **Method**: `GET`
- **Description**: Retrieves an analyst by ID.

### Response Success: 200 OK
```json
{
  "analystId": 11,
  "name": "Victor Olivares",
  "email": "victor.olivares@apuestatotal.com",
  "image": "https://picsum.photos/200",
  "companyId": 1,
  "typeAnalystId": 1,
  "flgActive": true,
  "flgChangePass": true,
  "flgMailBox": true,
  "changePassDate": "2024-08-30T01:59:58.120Z",
  "cantLog": 0,
  "flgBlocked": false,
  "rememberToken": null,
  "createdAt": "2024-08-30T01:59:58.120Z",
  "updatedAt": "2024-08-30T01:59:58.120Z",
  "deletedAt": null
}
```
### Error: 404 Not Found / 500 Internal Server Error
```json
{
  "error": "Analyst not found"
}
```

## Get All Analysts
- **Endpoint**: `/analyst`
- **Method**: `GET`
- **Description**: Retrieves all analysts.

### Response Success: 200 OK
```json
[
  {
    "analystId": 1,
    "name": "Alexander Lopez",
    "email": "alexander.lopez@apuestatotal.com",
    "image": "https://picsum.photos/200",
    "companyId": 1,
    "typeAnalystId": 1,
    "flgActive": true,
    "flgChangePass": true,
    "flgMailBox": true,
    "changePassDate": "2024-08-15T22:24:32.423Z",
    "cantLog": 0,
    "flgBlocked": false,
    "rememberToken": null,
    "createdAt": "2024-08-30T02:16:32.263Z",
    "updatedAt": "2024-08-30T02:16:32.263Z",
    "deletedAt": null
  },
  // More analysts...
]
```
### Error: 500 Internal Server Error
```json
{
  "error": "Error retrieving analysts"
}
```

## Update Analyst
- **Endpoint**: `/analyst/:id`
- **Method**: `PUT`
- **Description**: Updates an existing analyst.

### Request Body
```json
{
  "name": "Victor Olivares Yamunaqué",
  "email": "victor.olivares@apuestatotal.com",
  "pass": "password",
  "confirmPassword": "password",
  "image": "https://picsum.photos/300",
  "companyId": 1,
  "typeAnalystId": 1,
  "flgActive": true,
  "flgChangePass": true,
  "flgMailBox": true,
  "cantLog": 0,
  "flgBlocked": true
}
```
### Response: Success: 200 OK
```json
{
  "analystId": 11,
  "name": "Victor Olivares Yamunaqué",
  "email": "victor.olivares@apuestatotal.com",
  "pass": "$2b$10$QusMzg5GUyO4bzRNkH0WXOv9sG6dsHgkIk2uRzlAjBGGQqbbzgmtK",
  "image": "https://picsum.photos/300",
  "companyId": 1,
  "typeAnalystId": 1,
  "flgActive": true,
  "flgChangePass": true,
  "flgMailBox": true,
  "changePassDate": "2024-08-30T01:59:58.120Z",
  "cantLog": 0,
  "flgBlocked": false,
  "rememberToken": null,
  "createdAt": "2024-08-30T01:59:58.120Z",
  "updatedAt": "2024-08-30T04:30:06.776Z",
  "deletedAt": null
}
```
### Error: 400 Bad Request / 404 Not Found / 500 Internal Server Error
```json
{
  "error": "Passwords do not match"
}
```

## Delete Analyst
- **Endpoint**: `/analyst/:id`
- **Method**: `DELETE`
- **Description**: Deletes an analyst by ID.

### Response Success: 200 OK
```json
{
  "success": true
}
```

### Error: 404 Not Found / 500 Internal Server Error
```json
{
  "error": "Analyst not found"
}
```

## Restore Analyst
- **Endpoint**: `/analyst/:id/restore`
- **Method**: `POST`
- **Description**: Restores a previously deleted analyst.


### Response Success: 200 OK
```json
{
  "message": "Analyst restored successfully",
  "analyst": {
    "analystId": 11,
    "name": "Victor Olivares",
    "email": "victor.olivares@apuestatotal.com",
    "pass": "$2b$10$QusMzg5GUyO4bzRNkH0WXOv9sG6dsHgkIk2uRzlAjBGGQqbbzgmtK",
    "image": "https://picsum.photos/300",
    "companyId": 1,
    "typeAnalystId": 1,
    "flgActive": true,
    "flgChangePass": true,
    "flgMailBox": true,
    "changePassDate": "2024-08-30T01:59:58.120Z",
    "cantLog": 0,
    "flgBlocked": false,
    "rememberToken": null,
    "createdAt": "2024-08-30T01:59:58.120Z",
    "updatedAt": "2024-08-30T04:33:03.309Z",
    "deletedAt": null
  }
}
```
### Error: 404 Not Found / 500 Internal Server Error
```json
{
  "error": "Analyst is not deleted"
}
```

