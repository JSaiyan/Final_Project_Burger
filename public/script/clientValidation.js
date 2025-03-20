//access the form id within the home.ejs
// alert("hello");
document.getElementById("orderForm").onsubmit = () => {

    //function like java method. This clears errors
    clearErrors();
    let isValid = true;

    let fname = document.getElementById("fname").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let ClassicBurgerQuantity = document.getElementById("ClassicBurgerQuantity").value.trim();
    let CheeseBurgerQuantity = document.getElementById("CheeseBurgerQuantity").value.trim();
    let ChickenBurgerQuantity = document.getElementById("ChickenBurgerQuantity").value.trim();
    let postalZipCode = document.getElementById("postalZipCode").value.trim();
    let phoneNumber = document.getElementById("phoneNumber").value.trim();

        
// Validate first name
if (fname === "") {
    document.getElementById("err-fName").style.display = "block";
    isValid = false;
}

// Validate last name
if (lname === "") {
    document.getElementById("err-lName").style.display = "block";
    isValid = false;
}

  // Validate classicburger
  if (isNaN (ClassicBurgerQuantity) || ClassicBurgerQuantity === "") {
    document.getElementById("err-classicBurger").style.display = "block";
    isValid = false;
}

  // Validate cheeseburger
  if (isNaN (CheeseBurgerQuantity) || CheeseBurgerQuantity === "") {
    document.getElementById("err-cheeseBurger").style.display = "block";
    isValid = false;
}

  // Validate chickenburger
  if (isNaN (ChickenBurgerQuantity) || ChickenBurgerQuantity === "") {
    document.getElementById("err-chickenBurger").style.display = "block";
    isValid = false;
}

// Validate postal zip
if (isNaN(postalZipCode) || postalZipCode === "") {
    document.getElementById("err-postalZip").style.display = "block";
    isValid = false;
}

      // Validate phonenumber
      if (isNaN(phoneNumber) || phoneNumber === "") {
        document.getElementById("err-Phone").style.display = "block";
    isValid = false;
    }


    return isValid;
}


function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i=0; i<errors.length; i++) {
        errors[i].style.display = "none";
    }
}

