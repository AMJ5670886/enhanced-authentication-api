# Enhanced Authentication API

enhance the backend API for an authentication system.

## Deployment

### Clone the repository
git clone  https://github.com/AMJ5670886/enhanced-authentication-api.git

### Install dependencies
npm install

### Build and run the project
npm start


#### Navigate to http://localhost:8080


## API Reference

#### Auth for signup and login

```http
  POST /api/user/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Your Username |
| `email` | `string` | **Required**. Your Email |
| `password` | `string` | **Required**. Your Password |
| `role` | `string` |  admin or user...default user |

```http
  POST /api/user/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your Email |
| `password` | `string` | **Required**. Your Password |

#### Edit Profile

```http
  GET /api/profile/editProfile
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` |  name |
| `bio`      | `string` |  bio |
| `phone number`      | `string` |  phNo |
| `photo`      | `string` |  photo |

#### Edit Visibility( private or public)

```http
  GET /api/profile/visibility
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `profileVisibility`      | `string` |  **Default.** public|

#### View Profile

```http
  GET /api/profile/
```

#### Profile Access

```http
  GET /api/profile/:name
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | admin can only access private profiles|

## Screenshots

![Signup](https://github.com/AMJ5670886/enhanced-authentication-api/blob/master/screenshots/signup.png)






