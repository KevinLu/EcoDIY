[].forEach.call(document.getElementsByClassName('tags-input'), function (el) {
    let hiddenInput = document.createElement('input'),
        mainInput = document.createElement('input'),
        tags = [];

    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', el.getAttribute('data-name'));

    mainInput.setAttribute('type', 'text');
    mainInput.classList.add('main-input');
    mainInput.addEventListener('input', function () {
        let enteredTags = mainInput.value.split(',');
        if (enteredTags.length > 1) {
            enteredTags.forEach(function (t) {
                let filteredTag = filterTag(t);
                if (filteredTag.length > 0)
                    addTag(filteredTag);
            });
            mainInput.value = '';
        }
    });

    mainInput.addEventListener('keydown', function (e) {
        let keyCode = e.which || e.keyCode;
        if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    });

    el.appendChild(mainInput);
    el.appendChild(hiddenInput);

    function addTag(text) {
        let tag = {
            text: text,
            element: document.createElement('span'),
        };

        tag.element.classList.add('tag');
        tag.element.textContent = tag.text;

        let closeBtn = document.createElement('span');
        closeBtn.classList.add('close');
        closeBtn.addEventListener('click', function () {
            removeTag(tags.indexOf(tag));
        });
        tag.element.appendChild(closeBtn);

        tags.push(tag);

        el.insertBefore(tag.element, mainInput);

        refreshTags();
    }

    function removeTag(index) {
        let tag = tags[index];
        tags.splice(index, 1);
        el.removeChild(tag.element);
        refreshTags();
    }

    function refreshTags() {
        let tagsList = [];
        tags.forEach(function (t) {
            tagsList.push(t.text);
        });
        hiddenInput.value = tagsList.join(',');
    }

    function filterTag(tag) {
        return tag.replace(/[^\w -]/g, '').trim().replace(/\W+/g, '-');
    }

    document.getElementById('submit').onclick = function () {
        var list = tags.map(function (item) {
            return item['text'];
        });
        console.log(list);
        var indexs = [];

        $.getJSON('https://api.myjson.com/bins/iwkml', function (data) {
            for (var j = 0; j < data.length; j++) {
                var matches = 0;
                for (var k = 0; k < data[j].materials.length; k++) {
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].toUpperCase() === data[j].materials[k].toUpperCase()) {
                            matches++;
                        }
                    }
                }
                console.log(matches / data[j].materials.length);
                if (matches / data[j].materials.length >= 0.3) {
                    indexs.push(j);
                }
            }
        });
        console.log(indexs);
        localStorage.setItem("projectIndex", JSON.stringify(indexs));
        setTimeout(function () {
            window.location.href = 'page2.html';
        }, 1000);
    }
});