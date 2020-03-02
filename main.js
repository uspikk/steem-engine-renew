let tokens = require("./tokens.js")
let renewshort = require("./renew.js").renewshort
let renewlong = require("./renew.js").renewlong

let step = 0;

function tokeniterator(){
	if(tokens[step].mode === "long"){
     renewlong(tokens[step].symbol, 0, []);
     return;
	}
	if(tokens[step].mode === "short"){
     renewshort(tokens[step].symbol, 0, []);
     return;
	}
}

function addstep(){
	step++
	if(step === tokens.length){console.log("script finished.");return;}
	tokeniterator();
	return;
}
tokeniterator();

module.exports = {addstep}