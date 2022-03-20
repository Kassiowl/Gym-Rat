
function choosePage(pageChoosen) 
{
    if(pageChoosen==1)
    {
        $(function()
        {
            $('#main').load("person.html");
        });
    }
    else
    {
        $(function()
        {
            $('#main').load("diet.html");
        })
    }
}


function personFormulary(form) //calculate metabolism based on the form data
{
    const data = ($(form).serializeArray())
    console.log(data)
     $(form).submit(function(e) {
        e.preventDefault();
    });
    if(data[0].value=='male')
    {
        result = 1.5*(88.362 + (13.397 * data[1].value) + (4.799 * data[2].value) - (5.677 * data[3].value))
    }
    else
    {
        result = 1.5*(655 + (9.6 * data[1].value) + (1.8 * data[2].value) - (4.7*data[3].value));
    }
    document.getElementById('Caloric_Expenditure').innerHTML = ((result.toFixed(3))+"Kcal")
}

$(function()
{
    $('#footer').load('footer.html')
})



choosePage(1)
document.getElementById("user").addEventListener("click",function(){choosePage(1)});
document.getElementById("dietary").addEventListener("click",function(){choosePage(2)});


