/**
 * Course: COMP 426
 * Assignment: a05
 * Author: Ben Clayton
 *
 * This script uses jQuery to build an HTML page with info taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "heroCard" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
 export const renderHeroCard = function (hero) {
    // TODO: Copy your code from a04 to render the hero heroCard
    var $heroCard = $(`<div id="${hero.id}" class="column" style="padding:12px;margin:8px; height: 450px;float: left; width: 375px; background-color:${hero.backgroundColor};">`);
    $heroCard.append('<img src=' + hero.img + '>');
    $heroCard.append('<div name="name"   style="color:' + hero.color + ';">' + hero.name + '</div>');
    $heroCard.append('<div name="subtitle" style="font-style: italic;">"' + hero.subtitle + '"</div>');
    $heroCard.append('<div name="real name">Alter<span> </span>ego: ' + hero.first + ' ' + hero.last + '</div>');
    let day =new Date();
    day = hero.firstSeen.toISOString().slice(0, 10);
    $heroCard.append('<div name="day">First apperence: ' + day + '</div>');
    $heroCard.append('<p name="description">' + hero.description + '</p>');
    $heroCard.append(`<button class="edit" type="button" style="position:relative;">Edit</button>`);

    return $heroCard
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function (hero) {
    var $topPage = $(`<div  id="${hero.id}" class="column" style="padding:12px;margin:8px;float: left;height: 450px; width: 375px; background-color:${hero.backgroundColor};">`);
    $topPage.append('<img src=' + hero.img + '>');
    var $info = $('<form class="form"></form>');
    $info.append('Hero Name:<br><input class ="hn" type="text" name="herotname" value="' + hero.name + '"><br>')
    $info.append('First Name:<br><input class = "fn" type="text" name="firstname" value="' + hero.first + '"><br>')
    $info.append('Last Name:<br><input class = "ln" type="text" name="lastname" value="' + hero.last + '"><br>')
    $info.append('Subtitle Name:<br><input class = "sub" type="text" name="subtitle" value="' + hero.subtitle + '"><br>')
    $info.append('Description:<br><textarea class = "des" name="message" style="width:200px;">' + hero.description + '</textarea><br>')
    var day = hero.firstSeen.toISOString().slice(0, 10);
    $info.append(`First Seen:<br><input class="fs" type="day" id="day" name="trip-start"value="${day}"min="1900-01-01" max="2018-12-31"><br>`)
    $info.append('<button class="cancel" type="button">Cancel</button>')
    $info.append('<button class="submit" type="submit">Save</button>')
    $topPage.append($info);

    return $topPage;
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function (event) {
    let hero = event.target.parentNode
    $(`#${hero.id}`).replaceWith(renderHeroEditForm(heroicData.find(h => h.id == hero.id)))

};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function (event) {
    let hero = event.target.parentNode.parentNode
    $(`#${hero.id}`).replaceWith(renderHeroCard(heroicData.find(h => h.id == hero.id)))
};



/*
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function (event) {
    event.preventDefault();
    let newHeroName = $('.hn').val();
    let newFirstName = $('.fn').val();
    let newLastName = $('.ln').val();
    let newSubtitle = $('.sub').val();
    let newDescription = $('.des').val();
    let newFirstSeen = new Date($('.fs').val());
    let hero = event.target.parentNode.parentNode
    let theHero = heroicData.find(h => h.id == hero.id)
    theHero.name = newHeroName;
    theHero.first = newFirstName;
    theHero.last = newLastName;
    theHero.subtitle = newSubtitle;
    theHero.description = newDescription;
    theHero.firstSeen = new Date(newFirstSeen.getTime()+Math.abs(newFirstSeen.getTimezoneOffset()*60000));
    $(`#${hero.id}`).replaceWith(renderHeroCard(theHero))
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function (heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');
    for (let i = 0; i < heroes.length; i++) {
        $root.append(renderHeroCard(heroes[i]));

    }

    $root.on('click', ".edit", function (e) {//NOTE that we use event delegation here.
        handleEditButtonPress(e);

        $(".cancel").on('click', function (event) {
            handleCancelButtonPress(event);
        });

        $(".submit").on('click', function (event) {
            handleEditFormSubmit(event);

        });

    });
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function () {
    loadHeroesIntoDOM(heroicData);
});