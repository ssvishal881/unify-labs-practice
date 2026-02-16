// Mock Database
const studentProjects = [
    { id: 1, student: "Vishal", project: "E-commerce Security", marks: 85, status: "Completed" },
    { id: 2, student: "Rahul", project: "AI Chatbot", marks: 78, status: "Pending" },
    { id: 3, student: "Sneha", project: "Weather App", marks: 92, status: "Completed" },
    { id: 4, student: "Priya", project: "Library System", marks: 88, status: "Completed" },
    { id: 5, student: "Amit", project: "Portfolio Website", marks: 74, status: "Pending" }
];


// DOM Elements
const projectList = document.getElementById("projectList");
const totalProjects = document.getElementById("totalProjects");
const averageMarks = document.getElementById("averageMarks");

const showAllBtn = document.getElementById("showAllBtn");
const showCompletedBtn = document.getElementById("showCompletedBtn");


// MAP → Display projects
function displayProjects(projects) {

    projectList.innerHTML = "";

    const projectItems = projects.map(function(project) {
        return `<li>
        Student: ${project.student} |
        Project: ${project.project} |
        Marks: ${project.marks} |
        Status: ${project.status}
        </li>`;
    });

    projectList.innerHTML = projectItems.join("");
}


// FILTER → Show completed projects
function showCompletedProjects() {

    const completedProjects = studentProjects.filter(function(project) {
        return project.status === "Completed";
    });

    displayProjects(completedProjects);
}


// Show all projects
function showAllProjects() {
    displayProjects(studentProjects);
}


// REDUCE → Calculate stats
function calculateStatistics() {

    const totalMarks = studentProjects.reduce(function(sum, project) {
        return sum + project.marks;
    }, 0);

    const average = totalMarks / studentProjects.length;

    totalProjects.innerText = "Total Projects: " + studentProjects.length;
    averageMarks.innerText = "Average Marks: " + average.toFixed(2);
}


// Button Events
showAllBtn.addEventListener("click", showAllProjects);
showCompletedBtn.addEventListener("click", showCompletedProjects);


// Load initial data
displayProjects(studentProjects);
calculateStatistics();
