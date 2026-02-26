let currentRow = null;
document.getElementById("submitBtn").addEventListener("click", AddStudent);
let dataRecorded = [];
// Storing Data
function formData() {
  let data = {};
  data["KhmerName"] = document.getElementById("khmerNameInput").value;
  data["EnglishName"] = document.getElementById("englishNameInput").value;
  data["Age"] = document.getElementById("ageInput").value;
  data["Gender"] = document.getElementById("genderInput").value;
  data["Gmail"] = document.getElementById("emailInput").value;
  data["DateOfBirth"] = document.getElementById("dobInput").value;
  data["PhoneNumber"] = document.getElementById("phoneInput").value;
  data["Province"] = document.getElementById("locationInput").value;
  data["Nationality"] = document.getElementById("nationalityInput").value;
  return data;
}

// Validation
function Validation(data, isEdit = false) {
  // Duplicated Email and Phone
  let isDuplicated = dataRecorded.some(
    (existedRecord) => {
      if (
        isEdit &&
        currentRow &&
        existedRecord.Gmail === currentRow.cells[5].innerHTML
      ) {
        return false;
      } 
      return (
        existedRecord.Gmail === data.Gmail ||
        existedRecord.PhoneNumber == data.PhoneNumber
      );
    },
  );
  if (isDuplicated) {
    alert("This Email or Phone Number is Already Existed!");
    return false;
  }

  // Validation
  let EmailPattern = /^[a-z0-9._%+-]+@gmail\.com$/;
  if (!EmailPattern.test(formData().Gmail)) {
    alert("Please Enter a Valid Email Address.");
    return false;
  }

  // Age Validation
  let AgePattern = /^\d{1,2}$/;
  if (
    !AgePattern.test(formData().Age) ||
    formData().Age < 15 ||
    formData().Age > 99
  ) {
    alert("Please enter a valid age (15-99).");
    return false;
  }

  // English Validation
  let EnglishPattern = /^[a-zA-Z\s]+$/;
  if (!EnglishPattern.test(formData().EnglishName)) {
    alert("Number Denied in Name field!");
    return false;
  }

  // Khmer Validation
  let KhmerPattern = /^[\u1780-\u17FF\s]+$/;
  if (!KhmerPattern.test(formData().KhmerName)) {
    alert("Invalid Khmer Script!");
    return false;
  }

  // Matching DOB and AGE
  let dobString = formData().DateOfBirth;
  let currentYear = new Date().getFullYear();
  let newAge = new Date(dobString).getFullYear();
  let exactAge = currentYear - newAge;

  // Matching Age
  if (exactAge != parseInt(formData().Age)) {
    alert("Your date of birth didn't match you age!");
    return false;
  }

  // Phone Validation
  if (!formData().PhoneNumber.startsWith("0")) {
    alert("Phone number should start with 0.");
    return false;
  }

  let PhonePattern = /^\d{9,10}$/;
  if (!PhonePattern.test(formData().PhoneNumber)) {
    alert("Please enter a valid phone number (9-10 digits).");
    return false;
  }

  return true;
}

// Add Student
function AddStudent() {
  let No = document.querySelectorAll("tbody tr").length + 1;
  let newData = formData();
  if (!Validation(newData, false)) {
    return;
  }
  dataRecorded.push(newData);

  // Insert Data
  let row = `
    <tr>
        <td>${No}</td>
        <td id = "khmerRow">${newData.KhmerName}</td>
        <td>${newData.EnglishName}</td>
        <td>${newData.Age}</td>
        <td>${newData.Gender}</td>
        <td>${newData.Gmail}</td>
        <td>${newData.DateOfBirth}</td>
        <td>${newData.PhoneNumber}</td>
        <td>${newData.Province}</td>
        <td>${newData.Nationality}</td>
        <td>
            <button type="button" id="editBtn" onclick="ReturnData()">Edit</button>
            <button type="button" id="deleteBtn" onclick="DeleteStudent()">Delete</button>
        </td>
    </tr>
    `;
  document.querySelector("tbody").innerHTML += row;
  document.querySelector("form").reset();
}

// Return Value to Input
function ReturnData() {
  currentRow = event.target.closest("tr");
  if (currentRow) {
    document.getElementById("khmerNameInput").value =
      currentRow.cells[1].innerHTML;
    document.getElementById("englishNameInput").value =
      currentRow.cells[2].innerHTML;
    document.getElementById("ageInput").value = currentRow.cells[3].innerHTML;
    document.getElementById("genderInput").value =
      currentRow.cells[4].innerHTML;
    document.getElementById("emailInput").value = currentRow.cells[5].innerHTML;
    document.getElementById("dobInput").value = currentRow.cells[6].innerHTML;
    document.getElementById("phoneInput").value = currentRow.cells[7].innerHTML;
    document.getElementById("locationInput").value =
      currentRow.cells[8].innerHTML;
    document.getElementById("nationalityInput").value =
      currentRow.cells[9].innerHTML;
    document.getElementById("submitBtn").innerHTML = "Update";
    document
      .getElementById("submitBtn")
      .removeEventListener("click", AddStudent);
    document
      .getElementById("submitBtn")
      .addEventListener("click", UpdateStudent);
  }
}

// Update Information
function UpdateStudent() {
  if (currentRow) {
    let data = formData();

    if (!Validation(data, true)) {
      return;
    }

    let oldEmail = currentRow.cells[5].innerHTML;
    let index = dataRecorded.findIndex((record) => record.Gmail === oldEmail);
    if (index !== -1) {
      dataRecorded[index] = data; // Replace old data with new data
    }

    currentRow.cells[1].innerHTML = data.KhmerName;
    currentRow.cells[2].innerHTML = data.EnglishName;
    currentRow.cells[3].innerHTML = data.Age;
    currentRow.cells[4].innerHTML = data.Gender;
    currentRow.cells[5].innerHTML = data.Gmail;
    currentRow.cells[6].innerHTML = data.DateOfBirth;
    currentRow.cells[7].innerHTML = data.PhoneNumber;
    currentRow.cells[8].innerHTML = data.Province;
    currentRow.cells[9].innerHTML = data.Nationality;
    document.querySelector("form").reset();

    document.getElementById("submitBtn").innerHTML = "Submit";
    document
      .getElementById("submitBtn")
      .removeEventListener("click", UpdateStudent);
    document.getElementById("submitBtn").addEventListener("click", AddStudent);
    currentRow = null;
  }
}

// Updated Row NO
function UpdateIndexRow() {
  const rows = document.querySelectorAll("tbody tr");
  rows.forEach((row, index) => {
    row.cells[0].innerText = index + 1;
  });
}

// Delete Student
function DeleteStudent() {
  currentRow = event.target.closest("tr");
  if (currentRow) {
    currentRow.remove();
    UpdateIndexRow();
    document.querySelector("form").reset();
  }
}
