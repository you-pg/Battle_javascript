const damageRenge = 0.2,
			criticalHitRete = 0.1;
let logIndex = 0,
		nowKillNumber = 0,
		targetKillNumber = 3;

const playerData = {
	name: "プレイヤー",
	HP: 100,
	attack: 5,
	defence: 2
}

const enemysData = [
	{
		name: "スライム",
		maxHp:60,
		HP: 60,
		attack: 4,
		defence: 1
	},
	{
		name: "フェアリー",
		maxHp:50,
		HP: 50,
		attack: 3,
		defence: 2
	},
	{
		name: "ガーゴイル",
		maxHp:100,
		HP: 100,
		attack: 5,
		defence: 2
	}
];

// for (let i = 0; i < enemysData.length; i++){
// 	enemysData[i]["maxHp"] = enemysData[i]["HP"];
// }
let enemyData = enemysData[Math.floor(Math.random() * enemysData.length)];

console.log(enemyData);
playerData["maxHp"] = playerData["HP"];

function insertText(id,text){
	document.getElementById(id).textContent = text;
}
function damageCalculation(attack,defence){
const maxDamage = attack * (1+damageRenge);
const minDamage = attack * (1-damageRenge);
const attackDamage = Math.floor(Math.random() * (maxDamage - minDamage) +minDamage );

const damege = attackDamage - defence;
if (damege < 1){
	return 1
}else {
	return damege;
}
}
function insertLog(texts){
	const logsElement = document.getElementById("logs"),
	createLog = document.createElement("li");
	logIndex ++;
	createLog.innerHTML = logIndex +":"+ texts;
	logsElement.insertBefore(createLog, logsElement.firstChild)
}

function showModal(title,hiddenNextButton = false){
	document.getElementById("mask").classList.add("active");
	document.getElementById("modal").classList.add("active");
	document.getElementById("modalTitle").textContent = title;
	if(hiddenNextButton){
		document.getElementById("modalNextButton").classList.add("hidden");
	}
}

insertText("playerName",playerData["name"]);
insertText("currentPlayerHp",playerData["HP"]);
insertText("maxPlayerHp",playerData["HP"]);


insertText("enemyName",enemyData["name"]);
insertText("currentEnemyHp",enemyData["HP"]);
insertText("maxEnemyHp",enemyData["HP"]);


insertText("nowKilledNumber",nowKillNumber);
insertText("targetKillsNumber",targetKillNumber);

document.getElementById("attack").addEventListener("click", function() {
	
	let victory = false,
			defeat = false;

	const enemyName = '<span = style="color:red">'+enemyData["name"] + "</span>";
	const playerName = '<span = style="color:blue;">'+playerData["name"] + "</span>";

	//敵への攻撃処理
	let playerDamage = damageCalculation(playerData["attack"],enemyData["defence"])
	if (Math.random()*criticalHitRete){
		playerDamage *= 2;
		insertLog(playerName+"の攻撃！クリティカルヒット!" + enemyName + "に"+playerDamage+"のダメージを与えた！");

	}else{
		insertLog(playerName+"の攻撃！" + enemyName + "に"+playerDamage+"のダメージを与えた！");
	}
	enemyData["HP"] -= playerDamage;
	insertText("currentEnemyHp",enemyData["HP"]);
	document.getElementById("currentEnemyHpGaugeValue").style.width = (enemyData["HP"] / enemyData["maxHp"]*100) + "%";


	if(enemyData["HP"] <= 0 ){
		victory = true;

		enemyData["HP"] = 0;
		insertText("currentEnemyHp",enemyData["HP"]);
		document.getElementById("currentEnemyHpGaugeValue").style.width = "0%";

			showModal(enemyData["name"]+"を倒した！");

	}

	//プレイヤーへの攻撃処理

	if(!victory){
		let enemyDamage = damageCalculation(enemyData["attack"],playerData["defence"])
		if(Math.random() < criticalHitRete){
			enemyDamage *= 2;
			insertLog(enemyName+"の攻撃！クリティカルヒット!" + playerName + "に"+enemyDamage+"のダメージを与えた！");

		}else{
			insertLog(enemyName+"の攻撃！" + playerName + "に"+enemyDamage+"のダメージを与えた！");
		}
		playerData["HP"] -= enemyDamage;
		insertText("currentPlayerHp",playerData["HP"]);
		document.getElementById("currentPlayerHpGaugeValue").style.width = (playerData["HP"] / playerData["maxHp"]*100) + "%";
		
	if(playerData["HP"] <= 0){
		defeat = true;

		playerData["HP"] = 0;
		insertText("currentPlayerHp",playerData["HP"]);
		document.getElementById("currentPlayerHpGaugeValue").style.width = "0%";

		showModal(enemyData["name"]+"に負けた・・・",true);
	}
}
	if(victory || defeat){
		this.classList.add("deactive");

	}
	if(victory){
		nowKillNumber++;
		insertText("nowKilledNumber",nowKillNumber);
		if(nowKillNumber === targetKillNumber){
			showModal("おめでとう！魔物を全て倒したぞ！",true)
		}
	}
})

document.getElementById("modalNextButton").addEventListener("click",function(){
	enemyData["HP"] = enemyData["maxHp"]
	enemyData = enemysData[Math.floor(Math.random() * enemysData.length)];
	insertText("enemyName",enemyData["name"]);
	insertText("currentEnemyHp",enemyData["HP"]);
	insertText("maxEnemyHp",enemyData["maxHp"]);
	document.getElementById("currentEnemyHpGaugeValue").style.width = "100%";


	document.getElementById("mask").classList.remove("active");
	document.getElementById("modal").classList.remove("active");
	document.getElementById("attack").classList.remove("deactive");
})