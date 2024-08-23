document.getElementById("form1").addEventListener("submit", submitFun1);

var studentDataArr = JSON.parse(localStorage.getItem("studentData")) || [];

function submitFun1(e) {
    e.preventDefault();
    var name = document.querySelector("#name").value;
    var number = document.querySelector("#number").value;
    var city = document.querySelector("#city").value;
    var rollNo = document.querySelector("#rollNo").value;

    var studentObj = {
        name: name,
        number: number,
        city: city,
        rollNo: rollNo
    };

    studentDataArr.push(studentObj);
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));
    document.querySelector("#form1").reset();
    alert("Student Added Successfully");

    displayFun(studentDataArr);
}

function displayFun(studentDataArr) {
    var tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";
    studentDataArr.forEach(function (item, index) {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        td1.textContent = index + 1;
        var td2 = document.createElement("td");
        td2.textContent = item.name;
        var td3 = document.createElement("td");
        td3.textContent = item.number;
        var td4 = document.createElement("td");
        td4.textContent = item.city;
        var td5 = document.createElement("td");
        td5.textContent = item.rollNo;
        var td6 = document.createElement("td");
        var btn1 = document.createElement("button");
        btn1.textContent = "P";
        btn1.classList.add("btn", "btn-success", "me-1");
        btn1.addEventListener("click", function () {
            td6.innerHTML = "<button class='btn btn-success'>Present</button>";
        });
        var btn2 = document.createElement("button");
        btn2.textContent = "A";
        btn2.classList.add("btn", "btn-danger");
        btn2.addEventListener("click", function () {
            td6.innerHTML = "<button class='btn btn-danger'>Absent</button>";
        });
        td6.append(btn1, btn2);

        var td7 = document.createElement("td");
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("btn", "btn-danger");
        deleteBtn.addEventListener("click", function () {
            deleteStudent(index);
        });
        td7.append(deleteBtn);

        tr.append(td1, td2, td3, td4, td5, td6, td7);
        tbody.append(tr);
    });
}

function deleteStudent(index) {
    studentDataArr.splice(index, 1);
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));
    displayFun(studentDataArr);
}

displayFun(studentDataArr);

document.getElementById('downloadExcel').addEventListener('click', function () {
    const table = document.getElementById('attendanceTable');
    const filteredTable = table.cloneNode(true);

    // Remove delete buttons from cloned table
    filteredTable.querySelectorAll('td:nth-child(7)').forEach(td => td.remove());

    const wb = XLSX.utils.table_to_book(filteredTable, { sheet: "Sheet1" });
    XLSX.writeFile(wb, 'attendance.xlsx');
});
