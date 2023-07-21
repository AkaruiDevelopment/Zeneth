const fs = require("fs");
const path = require("path");
const d3_hypertreePath = path.join(process.cwd(),"/node_modules/d3-hypertree/dist/js/components/layers/interaction-layer-2.js");
const customD3_hypertreePath = path.join(process.cwd() ,"../packers/scripts/customd3-hypertree.js");

const d3_hypertree = fs.readFileSync(customD3_hypertreePath, "utf8");

fs.writeFileSync(d3_hypertreePath, d3_hypertree);