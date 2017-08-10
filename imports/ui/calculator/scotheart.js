export function CADRisk (age, gender, angina, tni) {
  var points = 1/(1+Math.exp(-(-5.5219 + calculateAgePoints(age) + calculateGenderPoints(gender) + calculateAnginaPoints(angina) + calculateTNIPoints(tni) )));
  var pointsPercentage = Math.floor(points * 10000) / 100;
  return pointsPercentage;
}

function calculateAgePoints(age) {
  if (age < 25) {
    return 1;
  }
  else if (age < 85) {
    return age*0.04;
  }
  else {
    return 3.4;
  }
}

function calculateGenderPoints(gender) {
  if (gender == "male") {
    return 1.34;
  }
  else {
    return 0;
  }
}

function calculateAnginaPoints(angina) {
  if (angina == "typical") {
    return 1.91;
  }
  else if (angina == "atypical") {
    return 0.64;
  }
  else {
    return 0;
  }
}

function calculateTNIPoints(tni) {
  if (tni > 7) {
    return 2;
  }
  else {
    return 0.4455*Math.log(tni);
  }
}
