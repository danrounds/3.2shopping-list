'use strict';

// State. Duh.
var state = {
    // items: []
    items:
      $('.shopping-item').map(function(){
          return $(this).text();
      }).get()
    // items: $('.shopping-item').map(
    //     function(){
    //         if ($(this).hasClass('shopping-item__checked'))
    //             var value = 'shopping-item__checked';
    //         else
    //             value = '';
    //         var text = this.text();
    //         return { text : value };
    //     }).get()
};

var itemTemplate = (
    // HTML for ITEM we're adding, when we click 'Add item'
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

function addItem(state, item) {
    if (!(state.items.indexOf(item) + 1)) {
        if (item.length > 0) {
            state.items.push(item);
        }
    }
}

function removeItem(state, item) {
    // semi-useless error handling, but let's pretend we
    // might extend this app
    var i = state.items.indexOf(item);
    if (i + 1) {
        state.items.splice(i, 1);
    }
}
////

// Page update
function renderList(state, itemTemplate, element) {
    var itemsHTML = state.items.map(function(item){
        var listItem = $(itemTemplate);
        listItem.find('li').addClass(item);
        listItem.find('.shopping-item').text(item);
        return listItem;
    });
    element.html(itemsHTML);
};


// Event listeners
function submitFormAddItem() {
    $('#js-shopping-list-form').submit(function(event) {
        event.preventDefault();
        addItem(state, $('#shopping-list-entry').val());
        renderList(state, itemTemplate, $('.shopping-list'));
        $('#shopping-list-entry').val('');
        getFocus();
    });
}

function deleteButton() {
    $('.shopping-list').on('click', '.shopping-item-delete', function(event){
        var item = $(this).parents('li').find('.shopping-item').text();
        removeItem(state, item);
        renderList(state, itemTemplate, $('.shopping-list'));
    });
}

function checkButton() {
    $('.shopping-list').on('click', '.shopping-item-toggle', function(event){
        $(this).parents('li').find('.shopping-item').toggleClass('shopping-item__checked');
    });
}

function getFocus() {
    $('input[name=shopping-list-entry]').focus();
}

$(document).ready(
    function() {
        submitFormAddItem();
        deleteButton();
        checkButton();
        getFocus();
});
