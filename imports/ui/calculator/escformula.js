export function ESCRisk(age, gender, angina, tni) {
  var points = 1/(1+Math.exp(-(-4.37 + calculateAgePoints(age) + calculateGenderPoints(gender) + calculateAnginaPoints(angina))));
  var pointsPercentage = Math.floor(points * 10000) / 100;
  return pointsPercentage;
}

function calculateAgePoints(age) {
  return 0.04 * age;
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
