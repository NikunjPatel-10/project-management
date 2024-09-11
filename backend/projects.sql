CREATE TABLE users (
    "id" SERIAL PRIMARY KEY,
    "emailId" VARCHAR(255) UNIQUE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "profileImage" TEXT,
    "role" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL
);

CREATE TABLE projects (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "projectName" VARCHAR(255) NOT NULL,
    "clientName" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "reportingManager" VARCHAR(255),
    "status" VARCHAR(50),
    "projectType" VARCHAR(50)
);

CREATE TABLE tasks (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "category" VARCHAR(100),
    "description" TEXT,
    "billingType" VARCHAR(50),
    "status" VARCHAR(50)
);

INSERT INTO users ("emailId", "name", "profileImage", "role", "password")
VALUES 
('mehul.patel@gmail.com', 'Mehul Patel', 'https://www.svgrepo.com/show/65453/avatar.svg', 'employee', 'mehul@123'),
('yash.patel@gmail.com', 'Yash Patel', 'https://www.svgrepo.com/show/65453/avatar.svg', 'employee', 'yash@123'),
('tanmay.patel@gmail.com', 'Tanmay Patel', 'https://www.svgrepo.com/show/65453/avatar.svg', 'admin', 'tanmay@123');


INSERT INTO projects ("userId", "projectName", "clientName", "description", "reportingManager", "status", "projectType")
VALUES 
(1, 'Project 1', 'Client 1', 'Project 1 description', 'xyz', 'active', 'Client'),
(1, 'Project 2', 'Client 2', 'Project 2 description', 'abc', 'new', 'Client'),
(3, 'Project 3', 'Client 3', 'Project 3 description', 'xyz', 'completed', 'Client'),
(2, 'Project 4', 'Client 4', 'Project 4 description', 'def', 'active', 'Client');

INSERT INTO tasks ("userId", "projectId", "name", "category", "description", "billingType", "status")
VALUES 
(1, 1, 'Task 1', 'development', 'Task description 1', 'billable', 'active'),
(1, 2, 'Task 2', 'documentation', 'Task description 2', 'non-billable', 'new'),
(3, 3, 'Task 3', 'analysis', 'Task description 3', 'billable', 'completed'),
(1, 1, 'Task 4', 'code-review', 'Task description 4', 'non-billable', 'active'),
(2, 4, 'Task 5', 'bug-fix', 'Task description 5', 'billable', 'new'),
(3, 3, 'Task 6', 'development', 'Task description 6', 'non-billable', 'completed'),
(1, 2, 'Task 7', 'documentation', 'Task description 7', 'billable', 'active'),
(2, 4, 'Task 8', 'analysis', 'Task description 8', 'non-billable', 'new'),
(3, 3, 'Task 9', 'code-review', 'Task description 9', 'billable', 'completed'),
(1, 2, 'Task 10', 'bug-fix', 'Task description 10', 'non-billable', 'new'),
(2, 4, 'Task 11', 'development', 'Task description 11', 'billable', 'new'),
(3, 3, 'Task 12', 'documentation', 'Task description 12', 'non-billable', 'completed'),
(1, 1, 'Task 13', 'analysis', 'Task description 13', 'billable', 'active');

