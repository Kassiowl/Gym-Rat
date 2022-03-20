if (typeof total === 'undefined' || total === null) { //declare variables if its undefined
    var total = {"kcal":0, "protein":0, "carbo":0, "fat":0}
    var data;
    var arrayData;
    var previous,previousGrams = 0
    var grams = 0;
    var option;
    var sameValue = true;
    var firstChoice = true;
}

async function getData() //get Json data with food information
{
    return fetch('../food_data/food.json')
    .then(res => res.json())
    
}
(async function() //populate meal options       //this executes when the user click on the meal icon
{
    data = await getData()  //Get Json data
    arrayData = Object.values(data);    //Parse Json data Into Array
    
    for (var i = 0; i <= arrayData.length-1; i++) {
        $('select').append(`<option value="${arrayData[i].id}">${arrayData[i].name}</option>`);
    }
    reset() //when refreshing page set all elements to 0
}());

function reset()        //reset all options and value
{
    total = {"kcal":0, "protein":0, "carbo":0, "fat":0}
    setElement(total);
    sameValue = false;
    $('input').val('');  
    $('select').val('Choose');
}

function addDiet(totalInFunction,value,gramsInFunction) //Calculate total kcal in diet
{

    if(value=='Choose')
    {
        totalInFunction['kcal'], totalInFunction['protein'], totalInFunction['carbo'], totalInFunction['fat'] = 0;
        return totalInFunction;
    }
    gramsInFunction = gramsInFunction/100
  
    if(typeof total==='undefined')
    {
        total = {"kcal":0, "protein":0, "carbo":0, "fat":0}
    }
    for (var i = 0; i <= arrayData.length-1; i++) {
        if(value==arrayData[i].id)
        {
            totalInFunction["kcal"]+=arrayData[i].kcal*gramsInFunction
            totalInFunction["protein"]+=arrayData[i].protein*gramsInFunction
            totalInFunction["carbo"]+=arrayData[i].carbo*gramsInFunction
            totalInFunction["fat"]+=arrayData[i].fat*gramsInFunction
            return totalInFunction;
        }
       
    }
}

function subDiet(totalInFunction,value,gramsInFunction)
{

    gramsInFunction = gramsInFunction/100
    for (var i = 0; i <= arrayData.length-1; i++) {
        if(value==arrayData[i].id)
        {   
            totalInFunction["kcal"]-=arrayData[i].kcal*gramsInFunction
            totalInFunction["protein"]-=arrayData[i].protein*gramsInFunction
            totalInFunction["carbo"]-=arrayData[i].carbo*gramsInFunction
            totalInFunction["fat"]-=arrayData[i].fat*gramsInFunction
            return totalInFunction;
        }
       
    }

    return totalInFunction;

}

function setElement(total)
{

    document.getElementById('food_kcal').innerHTML = total['kcal'].toFixed(3) + 'Kcal';
    document.getElementById('food_protein').innerHTML = total['protein'].toFixed(3) + 'g';
    document.getElementById('food_carbo').innerHTML = total['carbo'].toFixed(3) + 'g';
    document.getElementById('food_fat').innerHTML = total['fat'].toFixed(3) + 'g';
}

$('select').on('focus',function()   //get previous value in the select tag
{

    sameValue = false;
    if(this.value=='Choose')
    {
        firstChoice = true;
    }
    previous = this.value;
    previousGrams = grams;
    $(':focus').blur()      //force select element to lose focus, this way previous = this.value will not bug
})


$(document).on('focusin', 'input', function(){          //get actual grams and previous grams
    $(this).data('val', $(this).val()); 
}).on('change','input', function(){
    previousGrams = $(this).data('val');
    grams = $(this).val();
    sameValue = false;
});



function mealForm(form)
{
    const data = ($(form).serializeArray());
    $(form).submit(function(e) {
        e.preventDefault();
    });
    if(!sameValue) //only addDiet, subDiet and setElement if it isnt sameValue;
    {
        if(firstChoice) //enter here only if is the first choice or previous=='Choose' is choose, 
        {                                     //therefore does not need to call subDiet
            total = addDiet(total,data[0].value, grams);
            setElement(total);
            firstChoice = false;
            sameValue = true;
            return;
        }
        total = addDiet(total,data[0].value, grams);
        if(previous=='Choose')
        {
            total = subDiet(total,data[0].value, previousGrams); 
            setElement(total);
            sameValue = true;
            return;
        }
        total = subDiet(total,previous, previousGrams);    
        total['kcal'] = Math.max(0, total['kcal']);
        total['carbo'] = Math.max(0, total['carbo']);
        total['fat'] = Math.max(0, total['fat']);
        total['protein'] = Math.max(0, total['protein']);
        setElement(total);
    }
    sameValue = true;
}
