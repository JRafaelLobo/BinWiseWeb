-- Users Table: Stores user information
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    totalPoints INT DEFAULT 0,
    level INT DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Waste Categories Table: Stores the different types of waste
CREATE TABLE WasteCategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    color VARCHAR(50)
);

-- Recycling Records Table: Logs user's recycling activities
CREATE TABLE RecyclingRecords (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    wasteName VARCHAR(255) NOT NULL,
    categoryId INT NOT NULL,
    quantity INT NOT NULL,
    pointsEarned INT NOT NULL,
    recycledAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (categoryId) REFERENCES WasteCategories(id)
);

-- Rewards Table: Defines available rewards or badges
CREATE TABLE Rewards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(100),
    pointsRequired INT DEFAULT 0 -- Points needed to unlock, can be an alternative to specific triggers
);

-- User Rewards Table: Tracks rewards earned by users
CREATE TABLE UserRewards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    rewardId INT NOT NULL,
    earnedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (rewardId) REFERENCES Rewards(id)
);

-- Education Modules Table: Stores educational content
CREATE TABLE EducationModules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    estimatedMinutes INT,
    content TEXT
);

-- User Module Progress Table: Tracks user's completion of education modules
CREATE TABLE UserModuleProgress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    moduleId INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completedAt TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (moduleId) REFERENCES EducationModules(id)
);
