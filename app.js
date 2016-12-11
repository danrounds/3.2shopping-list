'use strict';

// State & state manipulation
var state = {
    //items are of the form { itemName: apples, checked: false }
    items: $('.shopping-item').map(function(){
        var checked =  $(this).hasClass('shopping-item__checked');
        return { itemName: $(this).text(), 'checked': checked };
    }).get()
};

function getItem(state, item) {
    for (var i in state.items) {
        if (state.items[i].itemName === item) {
            return i;
        }
    }
    return -1;
}

function addItem(state, item) {
    if (item.length > 0) {
        if (!(getItem(state, item) + 1)) {
            state.items.push({ 'itemName':item, 'checked':false });
        }
    }
}

function removeItem(state, item) {
    // Semi-useless error handling, but let's pretend might extend
    // this app
    var i = getItem(state, item);
    if (i + 1) {
        state.items.splice(i, 1);
    }
}

function checkItem(state, item) {
    var i = getItem(state, item);
    state.items[i].checked = !state.items[i].checked;
}

////

// HTML for ITEM we're adding, when we click 'Add item'
var itemTemplate = (
    '<li>' +
        '<span class="shopping-item">ITEM</span>' +
        '<div class="shopping-item-controls">' +
        '<button class="shopping-item-toggle">' +
        '<span class="button-label">check</span>' +
        '</button>' +
        '<button class="shopping-item-delete">' +
        '<span class="button-label">delete</span>' +
        '</button>' +
        '</div>' +
        '</li>'
);

// Page update
function renderList(state, itemTemplate, element) {
    var itemsHTML = state.items.map(function(item){
        var listItem = $(itemTemplate);
        listItem.find('.shopping-item').text(item.itemName);

        var i = getItem(state, item.itemName);
        if (state.items[i].checked) {
            listItem.find('.shopping-item')
                .addClass('shopping-item__checked');
        }
        return listItem;
    });
    element.html(itemsHTML);
};

////

// Event listeners
function submitFormAddItem() {
    $('#js-shopping-list-form').submit(function(event) {
        event.preventDefault();
        addItem(state, $('#shopping-list-entry').val().trim());
        renderList(state, itemTemplate, $('.shopping-list'));
        getFormFocus();
    });
}

function deleteButton() {
    $('.shopping-list').on('click', '.shopping-item-delete', function(event){
        var itemText = $(this).parents('li').find('.shopping-item').text();
        removeItem(state, itemText);
        renderList(state, itemTemplate, $('.shopping-list'));
    });
}

function checkButton() {
    $('.shopping-list').on('click', '.shopping-item-toggle', function(event){
        var listItem = $(this).parents('li').find('.shopping-item');
        checkItem(state, listItem.text());
        listItem.toggleClass('shopping-item__checked');
    });
}

function getFormFocus() {
    $('input[name=shopping-list-entry]').focus();
    $('#shopping-list-entry').val('');
}

$(document).ready(
    function() {
        submitFormAddItem();
        deleteButton();
        checkButton();
        getFormFocus();
});
