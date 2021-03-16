export const renderHeroCard = function(hero) {
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
    var $card = $('<div id="card" class="column" style="height: 420px;float: left; width: 375px; background-color:'+hero.backgroundColor+';">');
    $card.append('<img src='+hero.img+ '>');
    $card.append('<div id="name"   style="color:'+hero.color+';">'+hero.name+'</div>');
    $card.append('<div id="subtitle" style="font-style: italic;">"'+hero.subtitle+'"</div>');
    $card.append('<div id="real name">Alter<span> </span>ego: '+hero.first+' '+hero.last+'</div>'); 
    $card.append('<div id="date">'+hero.firstSeen+'</div>');
    $card.append('<p id="description">'+hero.description+'</p>');
    $card.append('<button type="button" style="position:relative;">Edit</button>');
    return $card
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    var $form=$('<div id="form">');
    var $upper=$('<div id="top" class="column" style="float: left; width: 375px; background-color:'+hero.backgroundColor+';">');
    $upper.append('<img src='+hero.img+ '>');
    var $lower=$('<div id="bot" style="background-color: #F8F8FF;>');
    var $homePage=$('<form></form>');
    $homePage.append('Hero Name:<br><input type="text" name="herotname" value="'+ hero.name +'"><br>')
    $homePage.append('First Name:<br><input type="text" name="firstname" value="'+ hero.first +'"><br>')
    $homePage.append('Last Name:<br><input type="text" name="lastname" value="'+ hero.last +'"><br>')
    $homePage.append('Subtitle Name:<br><input type="text" name="subtitle" value="'+ hero.subtitle +'"><br>')
    $homePage.append('Description:<br><textarea name="message" style="width:200px;">'+ hero.description +'</textarea><br>')
    var date = hero.firstSeen.toISOString().slice(0,10);
    $homePage.append('First Seen:<br><input type="date" id="start" name="trip-start"value="'+date+'"min="1940-01-01" max="2018-12-31"><br>')
    //+hero.firstSeen.getFullYear()+'-'+hero.firstSeen.getMonth()+'-'+hero.firstSeen.getDate()+
    $homePage.append('<button type="reset" value="Cancel">Cancel</button>')
    $homePage.append('<button type="submit" value="Save">Save</button>')  
    $lower.append($homePage);
    $form.append($upper);
    $upper.append($homePage);
    return $form;
};



/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    // TODO: Append the hero cards to the $root element
    for(let i=0;i<heroes.length;i++){
        $root.append(renderHeroCard(heroes[i]));
    }

    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
    const editForm = renderHeroEditForm(randomHero);
    $root.append(editForm);
    // TODO: Generate the hero edit form using renderHeroEditForm()

    // TODO: Append the hero edit form to the $root element
};

$(function() {
    loadHeroesIntoDOM(heroicData);
});

/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
