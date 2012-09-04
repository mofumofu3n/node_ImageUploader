var socket = io.connect('http://localhost:3000');
socket.on('connect', function(msg) {
    console.log('connect');
    socket.emit('my other event', { my : 'data' });
});

// イベントの検知
socket.on('message', function(imgName) {
    $("#receiveImg").append("<img src=\"" + imgName.value + "\">");
});

var sendImg = function () {
    imgName = $("img").attr("src");
    socket.emit('message', { value : imgName });
};
