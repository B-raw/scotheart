import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Template } from 'meteor/templating';
import './calculator.html';
import { CADRisk } from './scotheartFormula.js'
import { ESCRisk } from './escformula.js'
import * as d3 from "d3";
import { getValueFromRadioButton } from '../helpers/getValueFromRadioButton'

Template.Calculator.onRendered(function() {
  let age, gender, angina, tni, cadScore, escScore, assay;
  cadScore = CADRisk(30, "male", "typical", 5, "singulex")
  escScore = ESCRisk(30, "male", "typical", 5)

  this.find("#cadScore").innerHTML = cadScore;
  this.find("#escScore").innerHTML = escScore;

  var w = 350;
	var h = 350;
  var padding = 30;

  var yScale = d3.scaleLinear()
                 .domain([0, 100])
                 .range([h-padding, padding]);

  var yAxis = d3.axisLeft(yScale)
                .ticks(10);

  var svg = d3.select("#graphElement")
              .append("svg")
              .attr("width", w)
              .attr("height", h)

// ESC Guidelines
// https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines/Stable-Coronary-Artery-Disease-Management-of
// green background area - 0-15%
  var greenArea = d3.select("svg")
                    .append("rect")
                    .attr("fill", "rgb(173, 235, 173)")
                    .attr("x", padding)
                    .attr("y", h - yScale(100-15))
                    .attr("height", yScale(85) - padding)
                    .attr("width", w - padding)

// yellow background area - 15-65%
  var yellowArea = d3.select("svg")
                    .append("rect")
                    .attr("fill", "rgb(255, 255, 179)")
                    .attr("x", padding)
                    .attr("y", h - yScale(100-65))
                    .attr("height", yScale(50) - padding)
                    .attr("width", w - padding)

// orange background area 66-85%
  var orangeArea = d3.select("svg")
                    .append("rect")
                    .attr("fill", "rgb(255, 221, 153)")
                    .attr("x", padding)
                    .attr("y", h - yScale(100-85))
                    .attr("height", yScale(80) - padding)
                    .attr("width", w - padding)

// red background area - 85-100%
  var redArea = d3.select("svg")
                    .append("rect")
                    .attr("fill", "rgb(255, 153, 153)")
                    .attr("x", padding)
                    .attr("y", h - yScale(0))
                    .attr("height", yScale(85) - padding)
                    .attr("width", w - padding)

  svg.selectAll("circle")
    .select("b")
    .data([cadScore])
    .enter()
    .append("circle")
    .attr("cx", function() { return w / 3 + 15; })
    .attr("cy", function(d) { return yScale(d); })
    .attr("r", function() { return 6; })
    .attr("fill", "steelblue",)
    .attr("class", "cadScoreBar")

//attach ESC score
  svg.selectAll("circle")
    .select("c")
    .data([escScore])
    .enter()
    .append("circle")
    .attr("cx", function() { return (2 * w) / 3 + 15; })
    .attr("cy", function(d) { return yScale(d); })
    .attr("r", function() { return 6; })
    .attr("fill", "steelblue",)
    .attr("class", "escScoreBar")

  svg.append("g")
     .attr("class", "axis")
     .attr("transform", function() { return "translate(" + padding + ",0)"})
     .call(yAxis);

//Event Listeners
  d3.select("#age").on("input", function() {
    age = this.value
    update(age, gender, angina, tni, assay);
  });

  d3.select("#tni").on("input", function() {
    tni = this.value
    update(age, gender, angina, tni, assay);
  });

  d3.selectAll("input[name='gender']").on("change", function() {
    gender = getValueFromRadioButton("gender")
    update(age, gender, angina, tni, assay);
  });

  d3.selectAll("input[name='angina']").on("change", function() {
    angina = getValueFromRadioButton("angina")
    update(age, gender, angina, tni, assay);
  });

  d3.selectAll("input[name='troponinAssay']").on("change", function() {
    assay = getValueFromRadioButton("troponinAssay")
    update(age, gender, angina, tni, assay);
  });

// Initial starting age
  age = 50;
  gender = "male";
  angina = "atypical";
  tni = 1.5
  assay = "Abbot Architect"
  update(age, gender, angina, tni, assay)

  function update(age, gender, angina, tni, assay) {
    d3.select("#age-value").text(age);
    d3.select("#age").property("value", age);

    d3.select("#gender-value").text(gender);
    // d3.selectAll("input[name=gender]").property("checked", true);

    d3.select("#tni-value").text(tni);
    // for(var i = 0; i < d3.selectAll("input[name=angina]")._groups.length; i++) {
    //   var current_radio_button = d3.selectAll("input[name=angina]")._groups[i]
    //   if (current_radio_button == tni) {
    //     current_radio_button.checked==true;
    //   }
    // }
    // d3.selectAll("input[name=tni]").property("value", tni);

    d3.select("#troponinAssay-value").text(assay)

    d3.select("#angina-value").text(angina);
    d3.select("#angina").property("value", angina);
    updateCadscore(age, gender, angina, tni, assay)
    updateEscscore(age, gender, angina)
  }

  function updateCadscore(age, gender, angina, tni, assay) {
    cadScore = CADRisk(age, gender, angina, tni, assay)

    svg.select(".cadScoreBar")
      .data([cadScore])
      .attr("cy", function(d) { return yScale(d) })

     //add the cadScore to the header
     d3.select("#cadScore").text(cadScore);
  }

  function updateEscscore(age, gender, angina) {
    escScore = ESCRisk(age, gender, angina)

    svg.select(".escScoreBar")
      .data([escScore])
      .attr("cy", function(d) { return yScale(d); })

     //add the cadScore to the header
     d3.select("#escScore").text(escScore);
  }
})

Template.Calculator.events({

});

Template.Calculator.helpers({

})
