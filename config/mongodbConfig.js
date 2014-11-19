
var db = new MongoDB(config.db.name, new Server(config.db.host, config.db.port, {
    auto_reconnect: true
}), {
    w: 1
});
db.open(function(e, d) {
    if (e) {
        console.log(e);
    }
    else {
        console.log('connected to database');
    }
})

module.exports = db;