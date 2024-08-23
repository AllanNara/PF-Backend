const n = process.argv[2] || 3e9;
const numbers = {};
for (let i = 0; i < n; i++) {
	let randomNum = Math.floor(Math.random() * 1000);
	if (!numbers[randomNum]) numbers[randomNum] = 1;
	else numbers[randomNum]++;
}

process.send({ numbers });
