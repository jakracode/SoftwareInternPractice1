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

// Add Student
function AddStudent() {
  let No = document.querySelectorAll("tbody tr").length + 1;

  // Duplicated
  let newData = formData();
  let isDuplicated = dataRecorded.some(
    (existedRecord) => existedRecord.Gmail === newData.Gmail || existedRecord.PhoneNumber === newData.PhoneNumber
  );
  dataRecorded.push(newData);
  if(isDuplicated){
    alert("This Student is Already Existed!")
    return;
  }

  // Validation
  let EmailPattern = /^[a-z0-9._%+-]+@gmail\.com$/;
  if (!EmailPattern.test(formData().Gmail)) {
    alert("Please Enter a Valid Email Address.");
    return;
  }

  // Age Validation
  let AgePattern = /^\d{1,2}$/;
  if (
    !AgePattern.test(formData().Age) ||
    formData().Age < 15 ||
    formData().Age > 99
  ) {
    alert("Please enter a valid age (15-99).");
    return;
  }

  // English Validation
  let EnglishPattern = /^[a-zA-Z\s]+$/;
  if (!EnglishPattern.test(formData().EnglishName)) {
    alert("Number Denied in Name field!");
    return;
  }

  // Khmer Validation
  let KhmerPattern = /^[\u1780-\u17FF\s]+$/;
  if (!KhmerPattern.test(formData().KhmerName)) {
    alert("Invalid Khmer Script!");
    return;
  }

  // Matching DOB and AGE
  let dobString = formData().DateOfBirth;
  let currentYear = new Date().getFullYear();
  let newAge = new Date(dobString).getFullYear();
  let exactAge = currentYear - newAge;

  // Matching Age
  if (exactAge != parseInt(formData().Age)) {
    alert("Your date of birth didn't match you age!");
    return;
  }

  // Phone Validation
  if (!formData().PhoneNumber.startsWith("0")) {
    alert("Phone number should start with 0.");
    return;
  }

  let PhonePattern = /^\d{9,10}$/;
  if (!PhonePattern.test(formData().PhoneNumber)) {
    alert("Please enter a valid phone number (9-10 digits).");
    return;
  }


  // Insert Data
  let row = `
    <tr>
        <td>${No}</td>
        <td id = "khmerRow">${formData().KhmerName}</td>
        <td>${formData().EnglishName}</td>
        <td>${formData().Age}</td>
        <td>${formData().Gender}</td>
        <td>${formData().Gmail}</td>
        <td>${formData().DateOfBirth}</td>
        <td>${formData().PhoneNumber}</td>
        <td>${formData().Province}</td>
        <td>${formData().Nationality}</td>
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

// Delete Student
function DeleteStudent() {
  currentRow = event.target.closest("tr");
  if (currentRow) {
    currentRow.remove();
    document.querySelector("form").reset();
  }
}
