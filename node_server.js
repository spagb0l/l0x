import http from "node:http";
import url from "node:url";

const port = 8001;

http.createServer(async (req, res) => {
    const uri = url.parse(req.url).pathname;
    
    switch(uri) {

        case "/random":
            sseStart(res);
            sseRandom(res);
            break;
    }
}).listen(port);

console.log(`server running: http://localhost:${port}\n\n`);

function sseStart(res) {
    res.writeHead(200, {
        'Content-Type': "text/event-stream",
        'Cache-Control': "no-cache",
        'Connnection': "keep-alive",
        'Access-Control-Allow-Origin': "*"
    });
}
//TODO: write the same loop as below but going from 8 back to 1
async function sseRandom(res) {

    for (const x of Array(5).keys()) {
        
        res.write("data: " + x + "\n\n");
        await sleep(40);
    }

    for(let x = 5; x > 0; x--) {
        res.write("data: " + x + "\n\n");
        await sleep(40);
    }
    
    setTimeout(() => sseRandom(res), 5);
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}