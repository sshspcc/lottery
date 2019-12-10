// let data = decodeURI(location.search).replace('?json=', '');
let data = localStorage.getItem('present')

if (data == "") {
    presents = []
} else {
    presents = JSON.parse(data);
}



let showPresent = function () {
    $('#start').prop('disabled', true);
    if (presents.length == 0) {
        alert('抽選は終了しました．')
        return;
    }
    // let random = Math.floor(Math.random() * presents.length);
    let random = lot();

    while (presents[random].number == 0) {
        // random = Math.floor(Math.random() * presents.length);
        random = lot();
    }
    showBall();
    setTimeout(() => {
        rotateBall();
    }, 500);
    setTimeout(() => {
        openBall();

        document.getElementById('present').innerHTML = presents[random].name;
        presents[random].number--;

        if (presents[random].number == 0) {
            // if (presents.length == 1) {
            //     presents = [];
            // }
            presents.splice(random, 1);
        }
        localStorage.setItem('present', JSON.stringify(presents));
    }, 2000);
    $('.okey').removeClass('display-none')

}

let showBall = function () {
    $('.ball').addClass('fall');

}

let openBall = function () {
    $('#up').addClass('up');
    $('#down').addClass('down');
}

let rotateBall = function () {
    $('.balls').addClass('rotate');
}

let hideBall = function () {
    $('#start').prop('disabled', false);
    $('.balls').addClass('display-none');
    setTimeout(() => {
        $('.balls').removeClass('display-none');
    }, 600);
    $('.balls').removeClass('rotate');
    $('.ball').removeClass('fall');
    $('#up').removeClass('up');
    $('#down').removeClass('down');
    document.getElementById('present').innerHTML = '';
    $('.okey').addClass('display-none')
}

let reset = function () {
    conf = confirm('本当にリセットしますか？')
    if (conf) {
        presents = JSON.parse(localStorage.getItem('default'));
        localStorage.setItem('present', JSON.stringify(presents));
        alert('リセットされました．')
    } else {
        return;
    }
}

let lot = function () {
    let total = presents.reduce((t, p) => t += Number(p.number), 0);
    const random = Number(Math.random().toFixed(2));
    let searchPosition = 0;
    for (let i = 0; i < presents.length; i++) {
        const present = presents[i];
        searchPosition += Number((present.number/total).toFixed(2));
        if (random < searchPosition) {
            return i;
        }
    }
}