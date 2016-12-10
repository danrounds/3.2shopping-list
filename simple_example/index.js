// Single state object
var state = {
    items: []
};

// State modification functions
var addItem = function(state, item) {
    state.items.push(item);
};

// Render functions
var renderList = function(state, element) {
    var itemsHTML = state.items.map(function(item) {
        return '<li>' + item + '</li>';
    });
    element.html(itemsHTML);
};

// Event listeners
$('.shopping-list-add').submit(function(event) {
    event.preventDefault();
    addItem(state, $('.shopping-list-add-input').val());
    renderList(state, $('.shopping-list'));
});
