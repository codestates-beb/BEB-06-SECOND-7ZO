const cron = require("node-cron");
const models = require("./models");

// Ganache 블록체인 접근
const Web3 = require("web3");
const web3 = new Web3('HTTP://127.0.0.1:7545');

// 노드의 최신블록넘버 조회
var getLatestBlock = async () => {
	return await web3.eth.getBlockNumber();
}


// 매 초마다 실행 (실행주기를 설정할 수 있습니다.)
const task = cron.schedule(
	"0-59 * * * * *",
	async () => {
		// 주기적으로 실행하고자 하는 함수
		const recentBlock = await web3.eth.getBlockNumber(); // 최근 블록 넘버를 주기적으로 받아옴
        if(getLatestBlock != recentBlock) { // 최근 블록을 조회했을 때 기존 블록 넘버와 다르다면 : 새로운 트랜잭션 발생이기 때문에 작동
            const recentTx = await web3.eth.getBlock(recentBlock) //블록정보
            .then((blockInfo) => {
                return blockInfo.transactions[0] // 블록안 Tx 정보 : ganache의 경우 한 블록에 트랜잭션 하나라 0번째 가져옴
            })
            var txInfo = await web3.eth.getTransaction(recentTx); // 트랜잭션 정보 가져오기
            console.log(txInfo)   

            getLatestBlock = recentBlock; // 기존 블록 업데이트
        }

	},
	{
		scheduled: true,
	}
);

task.start();