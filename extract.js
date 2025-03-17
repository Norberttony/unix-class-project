
const fs = require("fs");
const sysInfo = require("systeminformation");
const { config } = require("dotenv");

config();


async function getStats(){
    const cpu = await sysInfo.currentLoad();
    const mem = await sysInfo.mem();
    const disk = await sysInfo.disksIO();
    const diskSpace = await sysInfo.fsSize();
    const net = await sysInfo.networkStats();

    return `cpu load=${cpu.currentLoad} load_max=100
mem usage=${mem.free} usage_max=${mem.total}
dsk usage=${diskSpace[0].used} usage_max=${diskSpace[0].size} total_wait_percent=${disk.tWaitPercent}
net transfer=${net[0].tx_bytes} receive=${net[0].rx_bytes}`;
}


const writeStream = fs.createWriteStream(process.env.PIPE);

// record stats every 2 seconds
(async () => {
    while (true){
        writeStream.write((await getStats()) + "\n");
        await new Promise((res) => setTimeout(res, 2000));
    }
})();
