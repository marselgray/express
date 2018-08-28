$(document).ready(function(){
    $('.deleteBook').on('click', deleteBook);
})

function deleteBook(){
    var confirmation = confirm('are you sure?');

    if(confirmation){
        $.ajax({
            type: 'DELETE',
            url: '/users/delete/'+$(this).data('id')
        }).done(function(response){
    
        });
        window.location.replace('/')
    } else {
        return false;
    } 
}