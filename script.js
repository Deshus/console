let command_inp = document.getElementById("command");
let clear = document.getElementById("clear");
let cmd = document.getElementById("console")
let sort = document.getElementById("sort");

let commandstack = []
let currentpos = 0

let typelists = []
let typelist = [{name: "All", color:"#fff"}]
let messages = []

function addMessage(message, color, type) {
	let date = new Date().toISOString()
	let div = document.createElement('div');
	div.className = "message";
	div.innerHTML = "["+type+"] ("+date + ") " + message;
	div.style.color = color;
	cmd.appendChild(div);
	messages.push({type: type, message: message, color: color});

	if (typelists.includes(type) === false) {
		typelist.push({name:type,color:color})
		typelists.push(type)
		let option = document.createElement('option');
		option.value = type
		option.name = type
		option.innerHTML = type
		option.style.color = color;
		sort.appendChild(option);
	}
}

function clearConsole()	{
	cmd.innerHTML = "";
	commandstack = []
	typelist = [{name: "All", color:"#fff"}]
	typelists = []
	sort.innerHTML = "";
	for (var i = 0; i < typelist.length; i++) {
		let option = document.createElement('option');
		option.value = typelist[i].name
		option.innerHTML = typelist[i].name
		option.name = typelist[i].name
		option.style.color = typelist[i].color;
		sort.appendChild(option);
	}
}

function sendCommand(command,color,type) {
	addMessage(">" + command, color, type);
	if (command != commandstack[commandstack.length-1]) {
		if (command === "") return;
		commandstack.push(command);
	} 

	currentpos = commandstack.length-1
	command_inp.value="";
}


command_inp.addEventListener("keypress", function(e) {
	if (e.key === "Enter") {
		sendCommand(command.value, "#bbb", "input");
		
	} 
});

command_inp.addEventListener('keydown', (e) => {
	if (e.repeat) return
	if (commandstack.length === 0) return
	
	if (e.key === "ArrowUp") {
		currentpos += 1;
		if (currentpos>commandstack.length-1) {
			currentpos = 0
		}
		command_inp.value=commandstack[currentpos];
	} else if (e.key === "ArrowDown") {
		currentpos -= 1;
		if (currentpos<0) {
			currentpos = commandstack.length-1
		}
		command_inp.value=commandstack[currentpos];
	}	  
})

clear.addEventListener("click", function() {
	clearConsole()
});

function sortList() {
	let value = sort.value
	if (value === "All") {
		cmd.innerHTML = "";
		for (let i = 0; i < messages.length; i++) {
			let date = new Date().toISOString()
			let div = document.createElement('div');
			div.className = "message";
			div.innerHTML = "["+messages[i].type+"] ("+date + ") " + messages[i].message;
			div.style.color = messages[i].color;
			cmd.appendChild(div);
		}
	} else {
		cmd.innerHTML = "";
		for (let i = 0; i < messages.length; i++) {
			if (messages[i].type === value) {
				let date = new Date().toISOString()
				let div = document.createElement('div');
				div.className = "message";
				div.innerHTML = "["+messages[i].type+"] ("+date + ") " + messages[i].message;
				div.style.color = messages[i].color;
				cmd.appendChild(div);
			}
		}
	}
}