const http = require('http');
const fs = require('fs').promises;
const path = require("path");
const url = require('url');
const clients = [];
const bets = [];

const server = http.createServer(async function(request, response){
	const parseUrl = url.parse(request.url, true);
	console.log(parseUrl);
	switch(parseUrl.pathname){
		case '/':
			mainPage(request, response, parseUrl.query);
			break;
		// case '/bets':
		// 	await betsStream(request, response, parseUrl.search);
		// 	break;
		default:
			response.writeHead(404);
			response.end('Page not found');
	}
});

server.listen(3000);

async function mainPage(request, response){
	const htmlPath = path.join(__dirname, 'index.html');
	const html = await fs.readFile(htmlPath, 'utf8');
	response.writeHead(200, {
		"Content-Type": 'text/html; charset=utf8',
		'Cache-Control': 'no-cache',
	});
	response.end(html);
}

async function betsStream(request, response){
	const bet = new Promise((res, rej) => {
		randomBet();
	});
	bets.push(bet);
	response.writeHead(200, {
		'Content-Type': 'application/json',
	});
	console.log(JSON.stringify(bets));
	response.end(JSON.stringify(bets));
}

function randomBet(){
	setTimeout(() => {
		let id = bets.length > 0 ? bets[bets.length - 1].id : 0;
		++id;
		bets.push({ id, value: id * 1000, time: Date.now() });
		randomBet();
	}, 1000 * ( Math.floor(Math.random() * 20) + 20 ));
}

randomBet();