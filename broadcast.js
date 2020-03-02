module.exports = {broadcast, addqueue}

let steem = require("steem")

let config = require("./config.js")
let queue = []

function broadcast(){
  let addstep = require("./main.js").addstep
  console.log("transaction queue length: " + queue.length)
 if(queue.length === 0){
  console.log("done renewing this order...")
  addstep();
  return;
 };
 let wholetx = [
  "custom_json",
  {
    "required_auths": [config.account],
    "required_posting_auths": [],
    "id": "ssc-mainnet1",
    "json": JSON.stringify(queue.splice(0, config.ops))
  }
 ]
 steem.broadcast.send({
   extensions: [],
   operations: [wholetx]}, [config.wif], (err, result) => {
    if(err){setTimeout(addqueue, 3000, JSON.parse(wholetx[1].json));return;}
    if(result){setTimeout(broadcast, 3000);}
  });
}

function addqueue(jsons){
 for(var i=0;i<jsons.length;i++){
  queue.push(jsons[i])
  if(i === jsons.length - 1){
    broadcast();
  }
 }
}

