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
  "email": "user@example.com",
  "password": "password123"
}
```
#### Response: Success: 200 OK
```json
{
  "success": true,
  "id": 1,
  "email": "user@example.com",
  "token": "your.jwt.token"
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
  "userId": 1,
  "email": "user@example.com",
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
  "name": "John Doe",
  "email": "john.doe@example.com",
  "pass": "password123",
  "image": "https://picsum.photos/200",
  "companyId": 1,
  "typeAnalystId": 1,
  "flgActive": true,
  "flgChangePass": false,
  "flgMailBox": false,
  "changePassDate": "2024-08-15T22:24:32.423Z",
  "cantLog": 0,
  "flgBlocked": false,
  "rememberToken": null
}
```
### Response Success: 201 Created
```json
{
  "message": "Analyst created successfully",
  "analyst": {
    "analystId": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "pass": "$2b$10$hashedpassword",
    "image": "https://picsum.photos/200",
    "companyId": 1,
    "typeAnalystId": 1,
    "flgActive": true,
    "flgChangePass": false,
    "flgMailBox": false,
    "changePassDate": "2024-08-15T22:24:32.423Z",
    "cantLog": 0,
    "flgBlocked": false,
    "rememberToken": null,
    "createdAt": "2024-08-30T02:16:32.263Z",
    "updatedAt": "2024-08-30T02:16:32.263Z",
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
  "analystId": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "image": "https://picsum.photos/200",
  "companyId": 1,
  "typeAnalystId": 1,
  "flgActive": true,
  "flgChangePass": false,
  "flgMailBox": false,
  "changePassDate": "2024-08-15T22:24:32.423Z",
  "cantLog": 0,
  "flgBlocked": false,
  "rememberToken": null,
  "createdAt": "2024-08-30T02:16:32.263Z",
  "updatedAt": "2024-08-30T02:16:32.263Z",
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
    "name": "John Doe",
    "email": "john.doe@example.com",
    "image": "https://picsum.photos/200",
    "companyId": 1,
    "typeAnalystId": 1,
    "flgActive": true,
    "flgChangePass": false,
    "flgMailBox": false,
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
  "name": "John Smith",
  "email": "john.smith@example.com",
  "pass": "newpassword123",
  "confirmPassword": "newpassword123",
  "image": "https://picsum.photos/300",
  "companyId": 2,
  "typeAnalystId": 2,
  "flgActive": false,
  "flgChangePass": true,
  "flgMailBox": true,
  "changePassDate": "2024-08-30T02:30:00.000Z",
  "cantLog": 1,
  "flgBlocked": true,
  "rememberToken": "newtoken"
}
```
### Response: Success: 200 OK
```json
{
  "analystId": 1,
  "name": "John Smith",
  "email": "john.smith@example.com",
  "pass": "$2b$10$hashedpassword",
  "image": "https://picsum.photos/300",
  "companyId": 2,
  "typeAnalystId": 2,
  "flgActive": false,
  "flgChangePass": true,
  "flgMailBox": true,
  "changePassDate": "2024-08-30T02:30:00.000Z",
  "cantLog": 1,
  "flgBlocked": true,
  "rememberToken": "newtoken",
  "createdAt": "2024-08-30T02:16:32.263Z",
  "updatedAt": "2024-08-30T02:30:00.000Z",
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

### Response Success: 204 No Content
```json
{
  "message": "Analyst deleted successfully"
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

### Request Body
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "pass": "newpassword123",
  "image": "https://picsum.photos/300",
  "companyId": 2,
  "typeAnalystId": 2,
  "flgActive": true,
  "flgChangePass": true,
  "flgMailBox": true,
  "changePassDate": "2024-08-30T02:30:00.000Z",
  "cantLog": 1,
  "flgBlocked": false,
  "rememberToken": "newtoken"
}
```
### Response Success: 200 OK
```json
{
  "message": "Analyst restored successfully",
  "analyst": {
    "analystId": 1,
    "name": "John Smith",
    "email": "john.smith@example.com",
    "pass": "$2b$10$hashedpassword",
    "image": "https://picsum.photos/300",
    "companyId": 2,
    "typeAnalystId": 2,
    "flgActive": true,
    "flgChangePass": true,
    "flgMailBox": true,
    "changePassDate": "2024-08-30T02:30:00.000Z",
    "cantLog": 1,
    "flgBlocked": false,
    "rememberToken": "newtoken",
    "createdAt": "2024-08-30T02:16:32.263Z",
    "updatedAt": "2024-08-30T02:30:00.000Z",
    "deletedAt": null
  }
}
```
### Error: 404 Not Found / 500 Internal Server Error
```json
{
  "error": "Analyst not found",
  "message": "Detailed error message"
}
```

