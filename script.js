let users = JSON.parse(localStorage.getItem("users")) || [
  {
    id: 1,
    name: "Chandrakant Patil",
    email: "ckpatil@gmail.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Rohini Patil",
    email: "rohini@gmail.com",
    role: "Manager",
    status: "Inactive",
  },
];

let roles = JSON.parse(localStorage.getItem("roles")) || [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Manager", permissions: ["Read", "Write"] },
];

function showSection(section) {
  document
    .querySelectorAll(".content-section")
    .forEach((sec) => sec.classList.add("d-none"));
  document.getElementById(section).classList.remove("d-none");
  document.getElementById(section).classList.add("active");
}

// Render Users Table
function renderUsers() {
  const userTable = document.getElementById("user-table");
  userTable.innerHTML = users
    .map(
      (user) => `
        <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td><span class="badge p-2 bg-${
            user.status === "Active" ? "success" : "secondary"
          }">${user.status}</span></td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="openEditUserModal(${
              user.id
            })">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteUser(${
              user.id
            })">Delete</button>
          </td>
        </tr>
      `
    )
    .join("");
}

// Render Roles Table
function renderRoles() {
  const roleTable = document.getElementById("role-table");
  roleTable.innerHTML = roles
    .map(
      (role) => `
        <tr>
          <td>${role.id}</td>
          <td>${role.name}</td>
          <td>${role.permissions.join(", ")}</td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="openEditRoleModal(${
              role.id
            })">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteRole(${
              role.id
            })">Delete</button>
          </td>
        </tr>
      `
    )
    .join("");
}

// Open Add User Modal
function openAddUserModal() {
  document.getElementById("addUserForm").reset();
  populateRolesDropdown("userRole");
  const modal = new bootstrap.Modal(document.getElementById("addUserModal"));
  modal.show();
}

function openAddRoleModal() {
  document.getElementById("addRoleForm").reset();
  const modal = new bootstrap.Modal(document.getElementById("addRoleModal"));
  console.log("Opening Add Role Modal...");
  modal.show();
}

// Open Edit User Modal
function openEditUserModal(userId) {
  const user = users.find((u) => u.id === userId);
  if (!user) {
    console.error("User not found!");
    return;
  }

  document.getElementById("editUserId").value = user.id;
  document.getElementById("editUserName").value = user.name;
  document.getElementById("editUserEmail").value = user.email;
  document.getElementById("editUserStatus").value = user.status;
  populateRolesDropdown("editUserRole", user.role);

  const modal = new bootstrap.Modal(document.getElementById("editUserModal"));
  modal.show();
}

// Open Edit Role Modal
function openEditRoleModal(roleId) {
  const role = roles.find((r) => r.id === roleId);
  if (!role) {
    console.error("Role not found!");
    return;
  }

  document.getElementById("editRoleId").value = role.id;
  document.getElementById("editRoleName").value = role.name;
  document.getElementById("editPermissionRead").checked =
    role.permissions.includes("Read");
  document.getElementById("editPermissionWrite").checked =
    role.permissions.includes("Write");
  document.getElementById("editPermissionDelete").checked =
    role.permissions.includes("Delete");

  const modal = new bootstrap.Modal(document.getElementById("editRoleModal"));
  modal.show();
}

function populateRolesDropdown(dropdownId, selectedRole = "") {
  const dropdown = document.getElementById(dropdownId);
  dropdown.innerHTML = roles
    .map(
      (role) =>
        `<option value="${role.name}" ${
          role.name === selectedRole ? "selected" : ""
        }>${role.name}</option>`
    )
    .join("");
}

// Delete User
function deleteUser(userId) {
  users = users.filter((u) => u.id !== userId);
  localStorage.setItem("users", JSON.stringify(users)); // Save to localStorage
  renderUsers();
}

// Delete Role
function deleteRole(roleId) {
  roles = roles.filter((r) => r.id !== roleId);
  localStorage.setItem("roles", JSON.stringify(roles)); // Save to localStorage
  renderRoles();
}

// Add User Form Submission
document.getElementById("addUserForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const role = document.getElementById("userRole").value;
  const status = document.getElementById("userStatus").value;

  // Validate the form inputs
  if (!name || !email || !role || !status) {
    const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
    document.getElementById("errorMessage").textContent = "All fields are required to add a user.";
    errorModal.show();

    const form = document.getElementById("addUserForm");
    form.classList.add("d-none");

    errorModal._element.addEventListener('hidden.bs.modal', function () {
      form.classList.remove("d-none");
    });

    return;
  }

  const newUser = { id: users.length + 1, name, email, role, status };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users)); 
  renderUsers();
  bootstrap.Modal.getInstance(document.getElementById("addUserModal")).hide();
});

// Edit User Form Submission
document
  .getElementById("editUserForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const userId = parseInt(document.getElementById("editUserId").value, 10);
    const user = users.find((u) => u.id === userId);
    if (!user) {
      console.error("User not found for ID:", userId);
      return;
    }

    user.name = document.getElementById("editUserName").value;
    user.email = document.getElementById("editUserEmail").value;
    user.role = document.getElementById("editUserRole").value;
    user.status = document.getElementById("editUserStatus").value;

    localStorage.setItem("users", JSON.stringify(users)); // Save to localStorage
    renderUsers();
    bootstrap.Modal.getInstance(
      document.getElementById("editUserModal")
    ).hide();
  });

// Add Role Form Submission
document.getElementById("addRoleForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("roleName").value;
  const permissions = ["Read", "Write", "Delete"].filter(
    (perm) => document.getElementById(`permission${perm}`).checked
  );

  if (!name || permissions.length === 0) {
    const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
    document.getElementById("errorMessage").textContent = "Role name and at least one permission are required.";
    errorModal.show();

    const form = document.getElementById("addRoleForm");
    form.classList.add("d-none");

    errorModal._element.addEventListener('hidden.bs.modal', function () {
      form.classList.remove("d-none");
    });

    return;
  }

  const newRole = { id: roles.length + 1, name, permissions };
  roles.push(newRole);
  localStorage.setItem("roles", JSON.stringify(roles)); 
  renderRoles();
  renderPermissions(); 
  bootstrap.Modal.getInstance(document.getElementById("addRoleModal")).hide();
});

document
  .getElementById("editRoleForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const roleId = parseInt(document.getElementById("editRoleId").value, 10);
    const role = roles.find((r) => r.id === roleId);
    if (!role) {
      console.error("Role not found for ID:", roleId);
      return;
    }

    role.name = document.getElementById("editRoleName").value;
    role.permissions = [];
    if (document.getElementById("editPermissionRead").checked)
      role.permissions.push("Read");
    if (document.getElementById("editPermissionWrite").checked)
      role.permissions.push("Write");
    if (document.getElementById("editPermissionDelete").checked)
      role.permissions.push("Delete");

    localStorage.setItem("roles", JSON.stringify(roles)); 
    renderRoles();
    renderPermissions(); 
    bootstrap.Modal.getInstance(
      document.getElementById("editRoleModal")
    ).hide();
  });

document.addEventListener("DOMContentLoaded", () => {
  renderUsers();
  renderRoles();
});

function renderPermissions() {
  const permissionsTable = document
    .getElementById("permissions-table")
    .getElementsByTagName("tbody")[0];

  permissionsTable.innerHTML = "";

  roles.forEach((role) => {
    const roleRow = document.createElement("tr");

    const roleCell = document.createElement("td");
    roleCell.textContent = role.name;
    roleRow.appendChild(roleCell);

    
    ["Read", "Write", "Delete"].forEach((permission) => {
      const permissionCell = document.createElement("td");
      const permissionCheckbox = document.createElement("input");
      permissionCheckbox.type = "checkbox";
      permissionCheckbox.classList.add("permission-checkbox");
      permissionCheckbox.setAttribute("data-role-id", role.id);
      permissionCheckbox.setAttribute("data-permission", permission);

      
      if (role.permissions.includes(permission)) {
        permissionCheckbox.checked = true;
      }

      
      permissionCell.appendChild(permissionCheckbox);
      roleRow.appendChild(permissionCell);
    });

    
    permissionsTable.appendChild(roleRow);
  });
}

document
  .getElementById("permissions-table")
  .addEventListener("change", function (e) {
    if (e.target && e.target.classList.contains("permission-checkbox")) {
      const roleId = parseInt(e.target.getAttribute("data-role-id"));
      const permission = e.target.getAttribute("data-permission");

      const role = roles.find((r) => r.id === roleId);
      if (!role) {
        console.error("Role not found!");
        return;
      }

      if (e.target.checked) {
        if (!role.permissions.includes(permission)) {
          role.permissions.push(permission);
        }
      } else {
        role.permissions = role.permissions.filter(
          (perm) => perm !== permission
        );
      }

      localStorage.setItem("roles", JSON.stringify(roles));

      renderRoles();
      renderPermissions();
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  renderPermissions();
});


document.getElementById("userRole").value = ""; 
document.getElementById("editPermissionRead").checked = false;
document.getElementById("editPermissionWrite").checked = false;
document.getElementById("editPermissionDelete").checked = false;



// Function to show error modal with message
function showErrorModal(message) {
    const errorModal = document.getElementById("errorModal");
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    const modal = new bootstrap.Modal(errorModal);
    modal.show();
  }