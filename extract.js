
const fs = require("fs");
const sysInfo = require("systeminformation");
const { config } = require("dotenv");

config({ path: ".env" });


async function getStats(){
    const cpu = await sysInfo.currentLoad();
    const mem = await sysInfo.mem();
    const disk = await sysInfo.disksIO();
    const diskSpace = await sysInfo.fsSize();
    const net = await sysInfo.networkStats();

    return `cpu load=${cpu.currentLoad}
mem usage=${mem.used / mem.total * 100}
dsk usage=${diskSpace[0].use} total_wait_percent=${disk.tWaitPercent}
net transfer=${net[0].tx_bytes} receive=${net[0].rx_bytes}`;
}


// record stats every 2 seconds
(async () => {
    while (true){
        fs.writeFileSync(process.env.PIPE + "\n", await getStats());
        await new Promise((res) => setTimeout(res, 2000));
    }
})();
