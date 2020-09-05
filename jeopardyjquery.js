let titles = []
let newobj = new Object();
const dataArr = [];
const $width = 6;
const $height = 6;
const $categories = new Array();
let $clues = new Array();
let result = [];
let practiearr = new Array();
var $gameboard = []; /*do not delete need for table*/

const $spinner = `<div id="spinner" class="spinner-border" role="status">
<span class="sr-only">Loading...</span>
</div>`;


$(document).ready(function() {
    $getCategoryId();
    $beginPlay();
    //insertQA()

    function $beginPlay() {
        $('#startbtn').on('click', $handleClick);


    }

    function $handleClick() {
        $('#startbtn').html($spinner).fadeOut(1000);
        $makeHtmlTable();
        $addClues()
    }

    async function $getCategoryId() { //return the question and anwser like 1
        const response = await axios.get(`http://jservice.io/api/random`, { params: { count: $width } });
        const { data } = response;
        for (let x in data) {
            result.push(data[x].category_id);
            findCategoryInfo(result, x);
            newobj.clues = (titles)
        }
        $categories.push(newobj.clues);
    }

    async function findCategoryInfo(result, x) { //creates array of information for the board
        const response = await axios.get('http://jservice.io/api/category', { params: { id: result[x] } });
        const { data } = response;
        const { clues } = data;
        practiearr.push(clues)
        practiearr.title = data.title
        $clues.push(data.title);
        let questions;
        let answer;
        for (var key in clues) {
            question = clues[key].question;
            answer = clues[key].answer;
            practiearr.clues = [clues]
        }
        //$addClues()
        titles.push({ question, answer });
    }

    function insertQA(result, x) {
        const response = axios.get('http://jsevice.io/api/clues', { params: { category: result[x] } });
        console.log(response);
    }
    /*
    {
        x,y
        0,0 - 0,1 - 0,2 - 0,3 - 0,4 - 0,5
        1,0 - 1,1 - 1,2 - 1,3 - 1,4 - 1,5
        2,0 - 2.1 - 2,2 - 2,3 - 2,4 - 2,5
        3.0 - 3.1 - 3,2 - 3,3 - 3,4 - 3,5
        4.0 - 4.1 - 4,2 - 4,3 - 4,4 - 4,5

        for(let x=0;x<$width;x++){
            let y = 0;
            let cell1  = $(`${x}`,"0");
            cell1.addEventListenter
        }
    title: "Math",
    clues: [
      { question: "2+2", answer: 4, showing: null },
     { question: "1+1", answer: 2, showing: null }
     */
    function $makeTable() {
        for (let x = 0; x <= $height; x++) {
            $gameboard.push(Array.from({ length: $width }))
        }
    }

    function $makeHtmlTable() { //$makeHtmlTable load after the async function in  order to have the titles loaded after the spinning effect
        const $board = $("#table")
        const $trow = document.createElement('tr');
        $trow.id = "top_row";
        for (let x = 0; x < $width; x++) {
            const $CatCell = document.createElement('td');
            $CatCell.id = x;
            $CatCell.innerText = ($clues.shift());
            $trow.append($CatCell);
        }
        $board.append($trow);
        for (let x = 0; x < $height - 1; x++) {
            const $cluerows = document.createElement('tr');
            let startingMoney = 200 + (x * 200);
            $cluerows.id = "clue";
            // for (let y = 0; y < $width; y++) {
            for (let y = 0; y < $width; y++) {
                const $qacells = document.createElement('td');
                $qacells.id = `${x} ${y}`; //newobj.clues.category_id;
                $qacells.innerText = startingMoney; /*($questionmark); .click(addClues);*/
                //$qacells.addEventListener('click', )
                $cluerows.append($qacells);
                $addClues();

            }
            $board.append($cluerows);
        }
        $makeTable();
    }



    function $addClues() {
        const table = $('#table');
        let count = 0;
        for (let y = 0; y < $width; y++) {
            for (let x = 0; x < $height; x++) {
                table.click(function(event) {
                        let target1 = event.target;
                        if (target1.id === `${x} ${y}`) {
                            if (target1.innerText == practiearr[y][x].question) {
                                target1.innerText = practiearr[y][x].answer;
                            } else {
                                target1.innerText = practiearr[y][x].question;
                            }
                        }
                    })
                    //table.click($addAnswers)
            }
        }

    }

    function $addAnswers() {
        const table = $('#table');
        for (let y = 0; y < $width; y++) {
            for (let x = 0; x < $height; x++) {
                table.click(function(event) {
                    let target = event.target;
                    console.log(practiearr[y][x]);
                    target.innerText = practiearr[y][x].answer;
                })
            }
        }
    }
});