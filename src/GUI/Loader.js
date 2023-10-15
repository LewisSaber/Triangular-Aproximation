import BackGround from "../Libs/LUI/Background.js"
import Button from "../Libs/LUI/Button.js"
import Component from "../Libs/LUI/Component.js"
import Form from "../Libs/LUI/Form.js"
import Input from "../Libs/LUI/Input.js"
import Label from "../Libs/LUI/Label.js"
import MainComponent from "../Libs/LUI/MainComponent.js"
import patterns from "./Patterns.js"

export default function loadComponents() {
  new MainComponent(20)
    .setDecoration({ "font-family": "arial" })
    .addComponent(
      new BackGround()
        .setImg("../Images/Background.jpg")
        .setSize("100%", "120%")
    )

  let inputForm = new Form()
    .setName("Input")
    .setDecoration({
      "background-color": "lightgray",
      border: "inset 10px lightblue",
    })
    .setSize("10", 10)
    .setFontSize(1)
    .setFloat("left")
    .setMargin(0.5, 1, 0.5, 1)
    .addComponent(
      new Label().setText("Формула").setSize("100%", 1).setFloat("left")
    )
    .addInput(
      new Input()
        .setName("Formula")
        .setFloat("left")
        .setSize("80%", 1)
        .setMargin(0, 0.5, "10%"),
      true,
      "none",
      false
    )
    .addComponent(
      new Label()
        .setText("Точок")
        .centerText()
        .setFloat("left")
        .setSize("100%", 1)
    )
    .addComponent(
      patterns.radioInput
        .create("evenPoints", "odd", "Непарна к-сть")
        .setSize("90%", 1.2)
        .setMargin(0, 0, "6%")
        .setName("oddRadio")
    )
    .addComponent(
      patterns.radioInput
        .create("evenPoints", "even", "Парна к-сть")
        .setSize("90%", 1.2)
        .setMargin(0, 0.5, "6%")
        .setName("evenRadio")
    )
    .addComponent(
      new Label()
        .setText("n:")
        .centerText()
        .setFloat("left")
        .setSize("20%", 1)
        .setMargin(0.5, 0, "30%")
    )
    .addInput(
      new Input()
        .setName("n")
        .setType("number")
        .setFloat("left")
        .setSize("20%", 1)
        .setMargin(0.5),
      true,
      "none",
      false
    )
    .addComponent(
      new Button()
        .setText("DO IT", 0.9)
        .setSize("60%", 1)
        .setMargin(0.5, 0, "20%")
        .setFloat("left")
        .setName("DO IT")
    )
    .attachToParent(new MainComponent())
  inputForm.addInput(inputForm.getComponentByName("oddRadio").radio, false)
  inputForm.addInput(inputForm.getComponentByName("evenRadio").radio, false)
  console.log(inputForm)

  //   let resultDisplay = new Component()
  //     .setName("ResultDisplay")
  //     .setSize(22, 4)
  //     .setFloat("left")
  //     .setDecoration({
  //       "background-color": "lightgray",
  //       border: "inset 10px lightblue",
  //     })
  //     .addComponent(
  //       new Label()
  //         .setText("Поліноми Інтерполяції")
  //         .setSize("100%", 1)
  //         .centerText()
  //         .setFontSize(0.9)
  //     )
  //     .addComponent(
  //       new Label()
  //         .setText("Лагранж")
  //         .setSize("10%", 1)
  //         .setPosition(0.2, 1)
  //         .setFontSize(0.8)
  //     )
  //     .addComponent(
  //       new Label().setText("Ньютон").setPosition(0.2, 2).setFontSize(0.8)
  //     )
  //     .addComponent(
  //       new Label()
  //         .setName("lagrangeResult")
  //         .setPosition(4.5, 1)
  //         .setFontSize(0.8)
  //         .setSize("70%", 1)
  //         .centerText(false)
  //         .setDecoration({ "overflow-x": "auto", "overflow-y": "hidden" })
  //     )
  //     .addComponent(
  //       new Label()
  //         .setName("newtonResult")
  //         .setSize("70%", 1)
  //         .setPosition(4.5, 2)
  //         .setFontSize(0.8)
  //         .centerText(false)
  //         .setDecoration({ "overflow-x": "auto", "overflow-y": "hidden" })
  //     )
  //     .setMargin(0.5, 1, 0.5, 1)
  //     .setFontSize(1)
  //     .attachToParent(new MainComponent())

  new Component()
    .setSize(22, 15.5)
    .setDecoration({
      "background-color": "lightgray",
      border: "inset 10px lightblue",
    })
    .setMargin(0.5, 1, 0.5, 1)
    .setFloat("left")
    .setName("grapthDisplay")
    .attachToParent(new MainComponent())

  new Component()
    .setName("PointsDisplay")
    .setSize(inputForm.size.x, 4)
    .setFloat("left")
    .setDecoration({
      "background-color": "lightgray",
      border: "inset 10px lightblue",
    })
    .setMargin(0.5, 1, 0.5, 1)
    .addComponent(
      new Label().setSize("100%", 1).setText("Вузли Інтерполяції").centerText()
    )
    .setFontSize(1)
    .attachToParent(new MainComponent())
}
