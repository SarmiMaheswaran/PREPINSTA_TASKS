// Array to store employee objects
const employees = [
    { name: 'Richa', age: 30, department: 'HR', salary: 50000 },
    { name: 'Arora', age: 45, department: 'IT', salary: 60000 },
    { name: 'Ash', age: 25, department: 'Marketing', salary: 45000 },
    { name: 'Will', age: 35, department: 'IT', salary: 70000 },
    { name: 'Max', age: 29, department: 'HR', salary: 52000 },
];

// Function to display employees
function displayEmployees(employeeList) {
    const employeeListDiv = document.getElementById('employee-list');
    employeeListDiv.innerHTML = '';

    employeeList.forEach(emp => {
        const empDiv = document.createElement('div');
        empDiv.classList.add('employee-item');
        empDiv.innerHTML = `
            <h3>${emp.name}</h3>
            <p><strong>Age:</strong> ${emp.age}</p>
            <p><strong>Department:</strong> ${emp.department}</p>
            <p><strong>Salary:</strong> $${emp.salary}</p>
        `;
        employeeListDiv.appendChild(empDiv);
    });
}

// Function to calculate average salary
function calculateAverageSalary() {
    const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
    const averageSalary = totalSalary / employees.length;
    document.getElementById('average-salary').innerText = `Average Salary: $${averageSalary.toFixed(2)}`;
}

// Function to find employees by department
function findEmployeesByDepartment(department) {
    return employees.filter(emp => emp.department.toLowerCase() === department.toLowerCase());
}

// Function to increase salary
function increaseSalary(percentage) {
    employees.forEach(emp => {
        emp.salary += emp.salary * (percentage / 100);
    });
    displayEmployees(employees);
}

// Function to sort employees by age
function sortEmployeesByAge() {
    const sortedEmployees = [...employees].sort((a, b) => a.age - b.age);
    displayEmployees(sortedEmployees);
}

// Event listeners
document.getElementById('calculate-average-btn').addEventListener('click', calculateAverageSalary);

document.getElementById('find-department-btn').addEventListener('click', () => {
    const department = document.getElementById('department-input').value;
    const departmentResults = findEmployeesByDepartment(department);
    const resultsDiv = document.getElementById('department-results');
    resultsDiv.innerHTML = '';
    
    if (departmentResults.length === 0) {
        resultsDiv.innerHTML = '<p>No employees found in this department.</p>';
    } else {
        departmentResults.forEach(emp => {
            const empDiv = document.createElement('div');
            empDiv.classList.add('employee-item');
            empDiv.innerHTML = `
                <h3>${emp.name}</h3>
                <p><strong>Age:</strong> ${emp.age}</p>
                <p><strong>Department:</strong> ${emp.department}</p>
                <p><strong>Salary:</strong> $${emp.salary}</p>
            `;
            resultsDiv.appendChild(empDiv);
        });
    }
});

document.getElementById('increase-salary-btn').addEventListener('click', () => {
    const percentage = parseFloat(document.getElementById('increase-percentage').value);
    if (!isNaN(percentage) && percentage > 0) {
        increaseSalary(percentage);
    } else {
        alert('Please enter a valid percentage.');
    }
});

document.getElementById('sort-age-btn').addEventListener('click', sortEmployeesByAge);

// Initial display of employees
displayEmployees(employees);
