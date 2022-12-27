
function choosePage(pageChoosen) 
{
    if(pageChoosen==1)
    {
        $(function()
        {
            $('#main').load("person.html");
        });
    }
    else if(pageChoosen==2)
    {
        $(function()
        {
            $('#main').load("diet.html");
        })
    }
    else
    {
        $(function()
        {
            $('#main').load("entry_food.html");
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
        result = data[4].value* (88.4 + (13.4 * data[1].value) + (4.8 * data[2].value) - (5.68 * data[3].value))

        // BMR Male: (88.4 + 13.4 x weight in kilograms) + (4.8 x height in centimeters) – (5.68 x age)
        //result(AMR) = Active_Factor * BMR

    }
    else
    {
        // BMR Female: (447.6 + 9.25 x weight in kilograms) + (3.10 x height in centimeters) – (4.33 x age)
        //result(AMR) = Active_Factor * BMR
        result = data[4].value*(447.6 + (9.25 * data[1].value) + (3.10 * data[2].value) - (4.33*data[3].value));
    }
    document.getElementById('Caloric_Expenditure').innerHTML = ((result.toFixed(3))+"Kcal");
    document.getElementById("FA").innerHTML = data[4].value;
}

$(function()
{
    $('#footer').load('footer.html')
})



choosePage(1)
document.getElementById("user").addEventListener("click",function(){choosePage(1)});
document.getElementById("dietary").addEventListener("click",function(){choosePage(2)});
document.getElementById("entryFood").addEventListener("click",function(){choosePage(3)});


