var app = new App();

document.querySelectorAll('[data-loader]').forEach(function(el) {
    app[el.dataset.loader](el);
});

function DB() {
    var db = JSON.parse(localStorage.getItem('db')) || {};

    function createUuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function get(type, id) {
        return db[type][id];
    }

    function save(type, data) {
        if (!db[type]) db[type] = {};
        db[type][data.id] = data;
        localStorage.setItem('db', JSON.stringify(db));
    }

    return {
        createUuid,
        get,
        save
    };
}

function App() {
    var db = new DB();

    function loadFormData(formEl) {
        var id = new URLSearchParams(window.location.search).get('id');
        if (id) var data = db.get(formEl.dataset.type, id);
    }

    function saveFormData(formEl) {
        var formData = new FormData(formEl);
        if (formData.get('id') === '') {
            formData.set('id', db.createUuid());
        }
        var data = {};
        for (var pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }
        db.save(formEl.dataset.type, data);
    }

    return {
        loadFormData,
        saveFormData
    };
}
