import loadComponents from "./GUI/Loader.js"
import SimpleDataFrame from "./Libs/LUI/SimpleDataFrame.js"
import Component from "./Libs/LUI/Component.js"
import DataFrameRegistry from "./Libs/LUI/DataFrameRegistry.js"
import MainComponent from "./Libs/LUI/MainComponent.js"
import Button from "./Libs/LUI/Button.js"
import MathInstance from "./Libs/LMath/MathInstance.js"

function Initialize() {
  loadComponents()
  createDataFrames()
  createGraph()
  addDoItInteraction()

  MainComponent.getComponentByName("Input").fill({
    Formula: "e^(cos x+sin x)",
    //Formula: "3cos(15x)",
    odd: true,
    n: 3,
  })
}

function doWork(mathData) {
  console.log({ mathData })
  if (!validateData(mathData)) return
  console.log("Data Validation Passed")

  clearGraph()

  const instance = new MathInstance()
  instance.execute("n = " + mathData.n)
  instance.execute("f = " + mathData.Formula)
  instance.execute(`
  prec = 4
  pi = 3.14159265359
  e = 2.71828182846
  points = 200
  -x = [0,pi/2,pi]
  -y = [-2,3,1]
  x = []
  y = []
  `)
  instance.execute("e = 2.71828182846")
  if (mathData.odd) instance.execute("m = 2n+1")
  else instance.execute("m = 2n")

  instance.execute(`
for(i:=0,i < m,i = i+1, {x_i = 2 * pi /(m) * i # prec})
for(i:=0,i < m,i = i+1, {x= x_i, y_i = f # prec})
;p = if(m%2 == 1,{
;   a = 2/m * sum(j,0,2n,y_j*cos(k*x_j)) # prec
;   b = 2/m * sum(j,0,2n,y_j*sin(k*x_j)) # prec
;   k = 0
;   p = a/2 + sum(k,1,n,a* cos(k*v)) + sum(k,1,n,b* sin(k*v))
;   return p
;},{
;   a = 1/n * sum(j,0,2n-1,y_j*cos(k*x_j)) # prec
;   b = 1/n * sum(j,0,2n-1,y_j*sin(k*x_j)) # prec
;   k = 0
;   p = a/2 + sum(k,1,n,a* cos(k*v)) + sum(k,1,n-1,b* sin(k*v))
;   return p
;})
out p 
  `)
  console.log(instance)

  //generating interpolation table
  let pointsDf = DataFrameRegistry.getDataFrame("points")
  pointsDf.clearAll()

  pointsDf.addColumn("x", instance.getVariable("x"))

  pointsDf.addColumn("y", instance.getVariable("y"))
  pointsDf.refreshTable()

  instance.execute("m = points")
  instance.execute("for(i:=0,i < m,i = i+1, {x_i = 2 * pi /(m-1) * i # prec})")
  instance.execute("for(i:=0,i < m,i = i+1, {x= x_i, y_i = f # prec})")
  drawGraph(instance.getVariable("x"), instance.getVariable("y"), "Формула")
  instance.execute("for(i:=0,i < m,i = i+1, {v= x_i, y_i = p # prec})")
  drawGraph(instance.getVariable("x"), instance.getVariable("y"), "Поліном")
  drawPoints(pointsDf.getColumn("x"), pointsDf.getColumn("y"), "Вузли")
}

function validateData(mathData) {
  if (mathData.n < 1) return false
  if (!(mathData.odd || mathData.even)) return false
  return true
}

function createGraph() {
  let graphContainer = MainComponent.getComponentByName("grapthDisplay")
  let graphDiv = graphContainer.getContainer()
  Plotly.newPlot(graphDiv, [], {
    tickmode: "array",
    paper_bgcolor: "rgba(0,0,0,0)",
    connectgaps: true,
    bargap: 0,
    showlegend: false,
  })
  Plotly.addTraces(graphDiv, [])
  graphContainer.addEventListener(Component.events.resizeEnd, () => {
    let size_ = graphContainer.getSizeInPixels()
    let m_mult = 0.09
    Plotly.update(
      graphContainer.getContainer(),
      {},
      {
        plot_bgcolor: "rgba(0,0,0,0)",
        width: size_.x,
        height: size_.y,
        margin: {
          l: size_.x * m_mult,
          r: size_.x * m_mult,
          t: size_.y * m_mult,
          b: size_.y * m_mult * 1.2,
        },
        xaxis: {
          tickfont: {
            color: "black",
            size: size_.x * 0.03,
          },
          linecolor: "black",
          tickcolor: "black",
        },
        yaxis: {
          tickfont: {
            color: "black",
            size: size_.x * 0.03,
          },
          linecolor: "black",
          tickcolor: "black",
        },
      }
    )
  })

  graphContainer.resize()
}

function drawGraph(x, y, name) {
  console.log({ x, y })
  const trace = {
    x,
    y,
    name,
  }
  Plotly.addTraces(
    MainComponent.getComponentByName("grapthDisplay").getContainer(),
    [trace]
  )
}
function drawPoints(x, y, name) {
  const trace = {
    x,
    y,
    name,
    mode: "markers",
  }
  Plotly.addTraces(
    MainComponent.getComponentByName("grapthDisplay").getContainer(),
    [trace]
  )
}

function clearGraph() {
  let graphContainer = MainComponent.getComponentByName("grapthDisplay")
  let graphDiv = graphContainer.getContainer()
  while (graphDiv.data.length > 0) {
    Plotly.deleteTraces(graphDiv, [0])
  }
}

function addDoItInteraction() {
  let button = MainComponent.getComponentByName("DO IT")
  let form = MainComponent.getComponentByName("Input")
  button.addEventListener(Button.events.mousedown, () => {
    let data = form.getData()
    if (data) doWork(data)
  })
}

function createDataFrames() {
  let pointsTable = new SimpleDataFrame(["x", "y"])
    .setName("points")
    .setFontSize(0.8)
    .setCellDecoration({
      color: "black",
      border: "black 1px solid",
      "box-sizing": "border-box",
    })
    .loadOptions({ allowEditing: true })
    .getTable()
    .setSize("80%", 3)
    .setPosition("10%", 1.1)
  MainComponent.getComponentByName("PointsDisplay").addComponent(pointsTable)
}

Initialize()
