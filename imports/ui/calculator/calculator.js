import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Template } from 'meteor/templating';
import './calculator.html';
import { CADRisk } from './scotheartFormula.js'
import { ESCRisk } from './escformula.js'
import * as d3 from "d3";
import { getValueFromRadioButton } from '../helpers/getValueFromRadioButton'

Template.Calculator.onCreated(function() {
  let cadScore = CADRisk(50, "male", "typical", 5, "Singulex Erenna")
  let escScore = ESCRisk(50, "male", "typical", 5)

  this.age = new ReactiveVar( 50 );
  this.gender = new ReactiveVar( "male" );
  this.angina = new ReactiveVar( "typical" )
  this.tni = new ReactiveVar( 5 );
  this.assay = new ReactiveVar( "Singulex Erenna" );
  this.cadScore = new ReactiveVar( cadScore )
  this.escScore = new ReactiveVar( escScore)
})

Template.Calculator.onRendered(function() {
  // if(window.innerHeight > window.innerWidth) {
  //   alert("Please view in landscape");
  // }

  var w = 320;
	var h = 350;
  var padding = 30;
  var logoHeight = 16

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

//attach scotheart score
  svg.selectAll("image")
    .select("b")
    .data([Template.instance().cadScore.get()])
    .enter()
    .append("image")
    .attr("href", "scotheart-nobackground.png")
    .attr("x", function() { return w / 3 + 15 - logoHeight; })
    .attr("y", function(d) { return yScale(d) - logoHeight; })
    .attr("height", 32)
    .attr("width", 32)
    .attr("class", "cadScoreBar")

//attach ESC score
  svg.selectAll("image")
    .select("c")
    .data([Template.instance().escScore.get()])
    .enter()
    .append("image")
    .attr("href", "ESClogo-32x32.png")
    .attr("x", function() { return (2 * w) / 3 + 15 - logoHeight; })
    .attr("y", function(d) { return yScale(d) - logoHeight; })
    .attr("height", 31)
    .attr("width", 31)
    .attr("class", "escScoreBar");

  svg.append("g")
     .attr("class", "axis")
     .attr("transform", function() { return "translate(" + padding + ",0)"})
     .call(yAxis);

  //add X axis labels
  svg.append("text")   //add scotheart text
    .attr("class", "x-label")
    .attr("text-anchor", "end")
    .attr("x", w / 3 + 60 - logoHeight)
    .attr("y", h - 12)
    .text("Scotheart")

  // svg.append("text")   //add scotheart value
  //    .attr("class", "x-value-cad")
  //    .attr("text-anchor", "end")
  //    .attr("x", w / 3 + 50 - logoHeight)
  //    .attr("y", h)
  //    .text(`${Template.instance().cadScore.get()}%`)

  svg.append("text") //add ECS text
    .attr("class", "x-label")
    .attr("text-anchor", "end")
    .attr("x", (2 * w) / 3 + 42 - logoHeight)
    .attr("y", h - 10)
    .text("ESC");

  // svg.append("text")   //add ESC value
  //    .attr("class", "x-value-esc")
  //    .attr("text-anchor", "end")
  //    .attr("x", (2 * w) / 3 + 52 - logoHeight)
  //    .attr("y", h)
  //    .text(`${Template.instance().escScore.get()}%`)

  update = function() {
    updateCadscore()
    updateEscscore()
  }

  function updateCadscore() {
    Template.instance().cadScore.set(CADRisk(Template.instance().age.get(), Template.instance().gender.get(), Template.instance().angina.get(), Template.instance().tni.get(), Template.instance().assay.get()))

    svg.select(".cadScoreBar")
      .data([Template.instance().cadScore.get()])
      .attr("y", function(d) { return yScale(d) - logoHeight; })

    svg.select(".x-value-cad")
       .text(`${Template.instance().cadScore.get()}%`)
  }

  function updateEscscore() {
    Template.instance().escScore.set(ESCRisk(Template.instance().age.get(), Template.instance().gender.get(), Template.instance().angina.get()))

    svg.select(".escScoreBar")
      .data([Template.instance().escScore.get()])
      .attr("y", function(d) { return yScale(d) - logoHeight; })

    svg.select(".x-value-esc")
       .text(`${Template.instance().escScore.get()}%`)

  }

})

Template.Calculator.events({
  'change input[name="gender"]'(event, template) {
    template.gender.set(getValueFromRadioButton("gender"));
    //could remove the below and put them into the global function...
    update();
  },
  'change input[name="angina"]'(event, template) {
    template.angina.set(getValueFromRadioButton("angina"));
    update();
  },
  'change input[name="troponinAssay"]'(event, template) {
    template.assay.set(getValueFromRadioButton("troponinAssay"));
    update();
  },
  'input #age'(event, template) {
    template.age.set(event.target.value)
    update();
  },
  'input #tni'(event, template) {
    template.tni.set(event.target.value)
    update();
  }
});

Template.Calculator.helpers({
  age: () => {
    return Template.instance().age.get()
  },
  gender: () => {
    return Template.instance().gender.get()
  },
  angina: () => {
    return Template.instance().angina.get()
  },
  tni: () => {
    return Template.instance().tni.get()
  },
  assay: () => {
    return Template.instance().assay.get()
  },
  cadScore: () => {
    let cadScore = Template.instance().cadScore.get()
    if (cadScore >= 10) {
      return cadScore.toString().padEnd(4, ".0")
    }
    else {
      return cadScore.toString().padEnd(3, ".0")
    }  },
  escScore: () => {
    let escScore = Template.instance().escScore.get()
    if (escScore >= 10) {
      return escScore.toString().padEnd(4, ".0")
    }
    else {
      return escScore.toString().padEnd(3, ".0")
    }
  }
})
