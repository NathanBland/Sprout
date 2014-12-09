var lessonInput = $('.lesson').clone().html();

$('#add_lesson').click(function(){
    console.log("copied");
    $('#lessons').append(lessonInput);
});