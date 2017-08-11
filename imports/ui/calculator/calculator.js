import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Template } from 'meteor/templating';
import './calculator.html';
import { CADRisk } from './scotheartFormula.js'
import { ESCRisk } from './escformula.js'
import * as d3 from "d3";
import { getValueFromRadioButton } from '../helpers/getValueFromRadioButton'

var update;

Template.Calculator.onRendered(function() {
  let age, gender, angina, tni, cadScore, escScore, assay;
  this.age = new ReactiveVar( 50 );
  this.gender = new ReactiveVar( "male" );
  this.angina = new ReactiveVar( "typical" )
  this.tni = new ReactiveVar( 5 );
  this.assay = new ReactiveVar( "Singulex Erenna" );
  console.log(this.age)

  cadScore = CADRisk(50, "male", "typical", 5, "Singulex Erenna")
  escScore = ESCRisk(50, "male", "typical", 5)

  this.find("#cadScore").innerHTML = cadScore;
  this.find("#escScore").innerHTML = escScore;

  var w = 400;
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

  update = function(age, gender, angina, tni, assay) {
    d3.select("#age-value").text(age);
    d3.select("#age").property("value", age);

    d3.select("#gender-value").text(gender);

    d3.select("#tni-value").text(tni);

    d3.select("#troponinAssay-value").text(assay)

    d3.select("#angina-value").text(angina);
    d3.select("#angina").property("value", angina);
    updateCadscore(age, gender, angina, tni, assay)
    updateEscscore(age, gender, angina)
  }

// Initial starting age
  update(this.age.get(), this.gender.get(), this.angina.get(), this.tni.get(), this.assay.get())

  update = function(age, gender, angina, tni, assay) {
    d3.select("#age-value").text(age);
    d3.select("#age").property("value", age);

    d3.select("#gender-value").text(gender);

    d3.select("#tni-value").text(tni);

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
  'change input[name="gender"]'(event, template) {
    template.gender.set(getValueFromRadioButton("gender"));
    update(template.age.get(), template.gender.get(), template.angina.get(), template.tni.get(), template.assay.get());
  },
  'change input[name="angina"]'(event, template) {
    template.angina.set(getValueFromRadioButton("angina"));
    update(template.age.get(), template.gender.get(), template.angina.get(), template.tni.get(), template.assay.get());
  },
  'change input[name="troponinAssay"]'(event, template) {
    template.assay.set(getValueFromRadioButton("troponinAssay"));
    update(template.age.get(), template.gender.get(), template.angina.get(), template.tni.get(), template.assay.get());
  },
  'input #age'(event, template) {
    template.age.set(event.target.value)
    update(template.age.get(), template.gender.get(), template.angina.get(), template.tni.get(), template.assay.get());
  },
  'input #tni'(event, template) {
    template.tni.set(event.target.value)
    update(template.age.get(), template.gender.get(), template.angina.get(), template.tni.get(), template.assay.get());
  }
});

Template.Calculator.helpers({

})
