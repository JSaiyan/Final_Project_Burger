//for app.js you need to import and export. app.js is server side. 
export function validateForm(data) 
{
    const errors = [];

    // Validate first name
    if (!data.fname || data.fname.trim() === "") {
        errors.push("First name is required");
    }

    // Validate last name
    if (!data.lname || data.lname.trim() === "") {
        errors.push("Last name is required");
    }

      // Validate classicburger
      if (isNaN(data.ClassicBurgerQuantity) || data.ClassicBurgerQuantity.trim() === "") {
        errors.push("ClassicBurgerQuantity is required");
    }

      // Validate cheeseburger
      if (isNaN(data.CheeseBurgerQuantity) || data.CheeseBurgerQuantity.trim() === "") {
        errors.push("CheeseBurgerQuantity is required");
    }

      // Validate chickenburger
      if (isNaN(data.ChickenBurgerQuantity)|| data.ChickenBurgerQuantity.trim() === "") {
        errors.push("ChickenBurgerQuantity is required");
    }

    // Validate cheeseburger
    if (isNaN(data.postalZipCode) || data.postalZipCode.trim() === "") {
      errors.push("postalZipCode digits");
    }
       // Validate payment
       if (!data.payment) {
        errors.push("payment is required");
    }

    
    return {
    isValid: errors.length === 0,
    errors
}

}


    // // Validate email
    // if (!data.email || data.email.trim() === "" || 
    //     data.email.indexOf("@") === -1 ||
    //     data.email.indexOf(".") === -1) {
    //     errors.push("Email is required and must be valid");
    // }

    // // Validate method (pickup or delivery)
    // if (!data.method) {
    //     errors.push("Select pickup or delivery");
    // } else {
    //     const validOptions = [ "pickup", "delivery" ];
    //     if (!validOptions.includes(data.method)) {
    //         errors.push("Go away, evildoer!");
    //     }
    // }


    // // Validate size
    // if (data.size === "none") {
    //     errors.push("Please select a size");
    // } else {
    //     const validSizes = [ "small", "med", "large" ];
    //     if (!validSizes.includes(data.size)) {
    //         errors.push("SIZE Go away, evildoer!");
    //     }
    // }


