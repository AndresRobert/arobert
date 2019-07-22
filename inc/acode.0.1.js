// Base

function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

let toggle = {};
toggle.class = (id, className) => {
    let element = document.getElementById(id);
    element.classList.toggle(className);
};

let add = {};
add.class = (id, className) => {
    let element = document.getElementById(id);
    element.classList.add(className);
};

let remove = {};
remove.class = (id, className) => {
    let element = document.getElementById(id);
    element.classList.remove(className);
};

let on = {};
on.click = (id, handler) => {
    let element = document.getElementById(id);
    element.addEventListener('click', handler);
};
on.change = (id, handler) => {
    let element = document.getElementById(id);
    element.addEventListener('change', handler);
};
on.keyup = (id, handler) => {
    let element = document.getElementById(id);
    element.addEventListener('keyup', handler);
};
on.mousedown = (id, handler) => {
    let element = document.getElementById(id);
    element.addEventListener('mousedown', handler);
};
on.focus = (id, handler) => {
    let element = document.getElementById(id);
    element.addEventListener("focus", handler);
};
on.blur = (id, handler) => {
    let element = document.getElementById(id);
    element.addEventListener("blur", handler);
};

// Components

let init = {};
init.counter = id => {
    on.keyup(id, event => {
        event.target.nextElementSibling.innerHTML = event.target.value.length;
    });
};

init.checkbox = () => {
    let all = document.querySelectorAll('input[type="checkbox"]');
    [].forEach.call(all, chkbox => {
        let divCheckbox = document.createElement('div');
        divCheckbox.classList.add('checkbox');
        if (chkbox.checked) {
            divCheckbox.classList.add('checked');
        }
        let divLabel = document.createElement('div');
        divLabel.classList.add('checkboxLabel');
        divLabel.innerHTML = chkbox.getAttribute('label');
        chkbox.parentNode.insertBefore(divLabel, chkbox.nextSibling);
        chkbox.parentNode.insertBefore(divCheckbox, chkbox.nextSibling);
        divCheckbox.addEventListener("click", event => {
            event.target.classList.toggle('checked');
            if (event.target.classList.contains('checked')) {
                event.target.previousElementSibling.checked = true;
            } else {
                event.target.previousElementSibling.checked = false;
            }
        });
    });
};

init.radio = () => {
    let all = document.querySelectorAll('input[type="radio"]');
    [].forEach.call(all, radio => {
        let divRadio = document.createElement('div');
        divRadio.classList.add('radio');
        if (radio.checked) {
            divRadio.classList.add('checked');
        }
        let divLabel = document.createElement('div');
        divLabel.classList.add('radioLabel');
        divLabel.innerHTML = radio.getAttribute('label');
        radio.parentNode.insertBefore(divLabel, radio.nextSibling);
        radio.parentNode.insertBefore(divRadio, radio.nextSibling);
        divRadio.addEventListener("click", event => {
            let inputs = document.querySelectorAll('input[name="radio"]');
            [].forEach.call(inputs, input => {
                input.nextElementSibling.classList.remove('checked');
            });
            event.target.classList.add('checked');
            let clickEvent = document.createEvent('HTMLEvents');
            clickEvent.initEvent('click', true, false);
            event.target.previousElementSibling.dispatchEvent(clickEvent);
        });
    });
};

init.range = () => {
    let all = document.querySelectorAll('input[type="range"]');
    [].forEach.call(all, range => {
        range.addEventListener("input", event => {
            event.target.previousElementSibling.getElementsByClassName('rangeValue')[0].innerHTML = event.target.value;
        });
    });
};

init.collapse = () => {
    let all = document.querySelectorAll('.collapse-next');
    [].forEach.call(all, collapser => {
        collapser.addEventListener("click", event => {
            event.target.classList.toggle('close');
        });
    });
};

init.bottomMenu = id => {
    let menu = document.getElementById(id);
    let items = menu.getElementsByClassName('items')[0].getElementsByTagName('div');
    [].forEach.call(items, (item, index) => {
        item.addEventListener("click", event => {
            let sub_items = menu.getElementsByClassName('items')[0].getElementsByTagName('div');
            [].forEach.call(sub_items, sub_item => {sub_item.classList.remove('active');});
            event.target.classList.add('active');
            let sub_contents = menu.getElementsByClassName('contents')[0].getElementsByTagName('div');
            [].forEach.call(sub_contents, sub_content => {sub_content.classList.remove('active');});
            sub_contents[index].classList.add('active');
        });
    });
};

let snackbar = {};
let timeUp;
snackbar.show = (message, classes, duration) => {
    if (document.getElementsByClassName('snackbar').length > 0) {
        document.getElementsByClassName('snackbar')[0].remove();
        clearTimeout(timeUp);
    }
    let snackbar = document.createElement('div');
    snackbar.classList.add('snackbar');
    snackbar.classList.add(classes);
    snackbar.appendChild(document.createTextNode(message));
    document.body.appendChild(snackbar);
    let timeout = 3000;
    if (typeof duration === 'number') {
        timeout = duration;
    }
    timeUp = setTimeout(() => {
        document.getElementsByClassName('snackbar')[0].classList.add('close');
        setTimeout(() => {
            document.getElementsByClassName('snackbar')[0].remove();
        }, 500);
    }, timeout);
};

let ajax = {};
ajax.post = (url, data) => {
    return fetch(url, {
        method: 'POST',
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {'Content-Type': 'application/json'}, // 'Content-Type': 'application/x-www-form-urlencoded',
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then(response => response.json()); // parses JSON response into native JavaScript objects
};
/*
How to use
ajax.post('http://example.com/answer', {answer: 42})
    .then(data => console.log(JSON.stringify(data)))
    .catch(error => console.error(error));
*/

window.addEventListener('load', function () {
    document.body.style.display = 'inline-block';
});