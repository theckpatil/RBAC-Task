# Role Based Access Control

This project is a simple web-based application for managing users, roles, and permissions. It allows administrators to add, edit, delete users and roles, and dynamically assign permissions to roles. Data is persisted locally using `localStorage`.

## Features

### User Management
- **Add Users**: Add new users with fields for name, email, role, and status.
- **Edit Users**: Modify existing user details.
- **Delete Users**: Remove users from the system.
- **User List**: View a table of all users with their details.

### Role Management
- **Add Roles**: Add new roles with customizable permissions (e.g., Read, Write, Delete).
- **Edit Roles**: Modify existing roles and their permissions.
- **Delete Roles**: Remove roles from the system.
- **Role List**: View a table of all roles and their associated permissions.

### Permissions Management
- View and modify permissions assigned to roles dynamically in a dedicated table.

### Data Persistence
- All data is stored in `localStorage`, ensuring that changes persist across page reloads.

## Technologies Used

- **HTML5**: Structure of the web application.
- **CSS3 & Bootstrap**: Styling and responsive design.
- **JavaScript (ES6)**: Dynamic rendering, form handling, and logic.
- **LocalStorage**: Persisting data in the browser.

### Application Functionality
#### Users
- Click **"Add User"** to create a new user.
- Click the **"Edit"** button next to a user to update their information.
- Click the **"Delete"** button to remove a user.

#### Roles
- Click **"Add Role"** to create a new role and assign permissions.
- Click the **"Edit"** button next to a role to update its name or permissions.
- Click the **"Delete"** button to remove a role.

#### Permissions
- View and toggle role permissions in the **Permissions Table**.

### Form Validation
- All required fields must be filled before submission.
- If any errors occur, an error modal will appear with details.

## Project Structure

```
RBAC-TASK/
│
├── index.html           # Main HTML file
├── styles.css           # CSS for styling
├── script.js            # Main JavaScript file
└── README.md            # Project documentation
```