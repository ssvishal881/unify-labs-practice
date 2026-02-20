// ==========================
// LOCAL STORAGE SIMULATION
// (Replace with MongoDB API later)
// ==========================

// Load interns from storage
let interns = JSON.parse(localStorage.getItem("interns")) || [];

// Display interns
function displayInterns() {

    const internList = document.getElementById("internList");

    internList.innerHTML = "";

    interns.forEach(intern => {

        const div = document.createElement("div");

        div.className = "intern";

        div.innerHTML = `
            <strong>Name:</strong> ${intern.name}<br>
            <strong>Role:</strong> ${intern.role}<br>
            <strong>Joined:</strong> ${intern.joinedDate}
        `;

        internList.appendChild(div);

    });
}


// Add intern
function addIntern() {

    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    const joinedDate = document.getElementById("joinedDate").value;

    if(name === "" || role === "" || joinedDate === "") {

        alert("Please fill all fields");
        return;
    }

    const intern = {

        name: name,
        role: role,
        joinedDate: joinedDate
    };

    interns.push(intern);

    // Save to storage (simulating database)
    localStorage.setItem("interns", JSON.stringify(interns));

    displayInterns();

    // Clear inputs
    document.getElementById("name").value = "";
    document.getElementById("role").value = "";
    document.getElementById("joinedDate").value = "";
}


// Load interns on start
displayInterns();