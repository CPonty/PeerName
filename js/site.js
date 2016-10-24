// DOM bindings
var dom = {
	name: document.getElementById("name"),
	ip: document.getElementById("ip"),
	info: document.getElementById("info"),
	translate: document.getElementById("translate"),
	table: document.getElementById("table"),
	
	ipControls: document.querySelectorAll(".ip-control"),
	ip1: document.getElementById("ip1"),
	ip2: document.getElementById("ip2"),
	ip3: document.getElementById("ip3"),
	ip4: document.getElementById("ip4"),
			
	infoBtn: document.getElementById("infoBtn"),
	translateBtn: document.getElementById("translateBtn"),
	shuffleBtn: document.getElementById("shuffle")
};

function show(elem){ elem.classList.remove("hidden"); }
function hide(elem){ elem.classList.add("hidden"); }

// Set the user's name
function IPChange() {
	if (!!dom.ip1.value && !!dom.ip2.value && !!dom.ip3.value && !!dom.ip4.value) {
		var ip = [parseInt(dom.ip1.value), parseInt(dom.ip2.value), parseInt(dom.ip3.value), parseInt(dom.ip4.value)]
		dom.name.innerHTML = adjectives[ip[0]] + ' ' + adjectives[ip[1]] + ' ' +  nouns[ip[2]] + ' ' +  nouns[ip[3]];
	}
}

// Setup table
for (var i=0; i<256; i++) {
	
	var row = dom.table.insertRow();
	
	var th = document.createElement("th");
    th.innerText = i + '';
    row.appendChild(th);
	
	row.insertCell(1).innerHTML = adjectives[i];
	row.insertCell(2).innerHTML = adjectives[i];
	row.insertCell(3).innerHTML = nouns[i];
	row.insertCell(4).innerHTML = nouns[i];
}

// Bind change events
function bind() {
	dom.infoBtn.onclick = function() { 
		show(dom.info);
		hide(dom.translate);
	};
	
	dom.translateBtn.onclick = function() { 
		hide(dom.info);
		show(dom.translate);
	};
	
	dom.shuffleBtn.onclick = function() { 
		dom.ip1.value = Math.round(Math.random()*255);
		dom.ip2.value = Math.round(Math.random()*255);
		dom.ip3.value = Math.round(Math.random()*255);
		dom.ip4.value = Math.round(Math.random()*255);
		IPChange();
	};
	
	for (var i = 0, len = dom.ipControls.length; i < len; i++) {
		dom.ipControls[i].addEventListener('change', IPChange);
	}
}

//Wait for user IP
$.getJSON('https://jsonip.com', function(data) {
	console.log(data.ip);
	dom.ip.innerHTML = data.ip;
	
	var parts = data.ip.split('.');
	dom.ip1.value = parts[0];
	dom.ip2.value = parts[1];
	dom.ip3.value = parts[2];
	dom.ip4.value = parts[3];
	
	bind();
	IPChange();
});
