
        /////////////////////////////////////////////////////////
        const scores = document.querySelector('.Score');
        const startscreen = document.querySelector('.StartScreen');
        const gamearea = document.querySelector('.GameArea');
        const CarGame = document.querySelector('.CarGame');
        const Question_form = document.querySelector('.Question_form');
        const explanationbox = document.querySelector('.explanationbox');
        const Explaining = document.querySelector('.Explaining');
        const status = document.querySelector('.status');
        const status1 = document.querySelector('.status1');
        const Explain = document.querySelector('.Explain');
        const btn1 = document.querySelector('.btn1');
        const question = document.querySelector(".q");
        const option1 = document.querySelector("#option1");
        const option2 = document.querySelector("#option2");
        const option3 = document.querySelector("#option3");
        const option4 = document.querySelector("#option4");
        const submit = document.querySelector("#submit");
        const timerArea = document.querySelector("#timerArea");
        const answers = document.querySelectorAll(".answer");
        let player = { speed: 5, score: 0 };
        let highest = 0;
        let ps;
        let s;
        let timer = 9;
        let runningTimer;

        startscreen.addEventListener('click', start);
      


        let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false };

        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);
        function keyDown(ev) {
            ev.preventDefault();
            keys[ev.key] = true;


        }
        ///////////////////////////////////////

        function keyUp(ev) {
            ev.preventDefault();
            keys[ev.key] = false;
            console.log(ev.key);
        }

        /////////////////////////////////////////////
        function isCollide(a, b) {
            aRect = a.getBoundingClientRect(); //to measure all dimension of object
            bRect = b.getBoundingClientRect();

            return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
        }

        //////////////////////////////////////////////
        function moveLines() {
            let lines = document.querySelectorAll('.lines');
            lines.forEach(function (item) {
                if (item.y >= 800) {
                    item.y -= 800;
                }
                item.y += player.speed;
                item.style.top = item.y + 'px';

            })
        }

        // function pauseGame() {
        //     player.start = false;
        //     //startscreen.classList.remove('hide');
        //     // startscreen.innerHTML = "Game Over <br> Your Final Score is " + player.score + "<br> Press here to restart the Game"; 
        //     gamearea.classList.add('hide');
        //     score.classList.add('hide');
        //     console.log(player.score);
        //     Question_form.classList.remove('hide');
        //     resumeGame();
        //    // endGame();
        // }

        ///////////////////////////////////////

        function resumeGame(){
           // startscreen.classList.remove('hide');
            gamearea.classList.remove('hide');
            scores.classList.remove('hide');
            Question_form.classList.add('hide');
    
            startscreen.addEventListener('click', againstart);

              
            let car = document.querySelector('.car');
            let road = gamearea.getBoundingClientRect();// to measure dimension of road

            if (player.start) {

                moveLines();
                againmoveCar(car);
                if (keys.ArrowUp && player.y > (road.top + 70)) {
                    player.y -= player.speed; //here speed means car will move by speed number distance
                }
                if (keys.ArrowDown && player.y < (road.bottom - 70)) {
                    player.y += player.speed;
                }
                if (keys.ArrowLeft && player.x > 0) {
                    player.x -= player.speed;
                }
                if (keys.ArrowRight && player.x < (road.width - 70)) {  //50 = width of car
                    player.x += player.speed;
                }

                car.style.top = player.y + 'px'; //to attach px behind number eg: 44px
                car.style.left = player.x + 'px';//to attach px behind number

                window.requestAnimationFrame(resumeGame);//create loop for road animation
                //console.log(player.score++);
                player.score++;
                let ps = player.score - 1;
                if (player.score >= highest) {
                    highest = player.score;
                }
                score.innerHTML = "Your Score:" + ps + "<br><br>" + "Highest Score:" + highest;


            }

        }
        ///////////////////////////////////////////////////
        function endGame() {
            player.start = false;
            Question_form.classList.add('hide');
            explanationbox.classList.remove('hide');
            Explaining.innerHTML= questionList.explanation;
            status.innerHTML=" OPPS!!! 👎  &nbsp &nbsp &nbsp &nbsp &nbsp  😮😮🖤🖤  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp WRONG!!!".fontcolor("red") ;
            status1.innerHTML=" No worry........You can do............ All THE BEST 👍👍👍".fontcolor("#A702F5").fontsize(5) +"<br>  keep learning and enjoy the Game"+" <br> Restart again......... "
            btn1.onclick= function(){
                explanationbox.classList.add('hide');
                CarGame.classList.remove('hide');
            gamearea.classList.remove('hide');
            startscreen.classList.remove('hide');
            startscreen.innerHTML = "You lose <br> Your Final Score is " + ps + "<br> Press here to restart the Game<br><button class='btn' onclick='location.reload()'>Restart</button>";
            }
            // CarGame.classList.remove('hide');
            // gamearea.classList.remove('hide');
            // startscreen.classList.remove('hide');
      
            // startscreen.innerHTML = "You lose <br> Your Final Score is " + ps + "<br> Press here to restart the Game<br><button class='btn' onclick='location.reload()'>Restart</button>";
         

           // startscreen.addEventListener(' click', againstart);
        
            
            

        }  

        ///////////////////////////////////////////
        function moveCar(car) {
            let other = document.querySelectorAll('.other');
            other.forEach(function (item) {
                if (isCollide(car, item)) {
                    loadquestion();
                   // endGame();
                    // pauseGame();
                }
                if (item.y >= 750) {
                    item.y = -415;
                    item.style.left = Math.floor(Math.random() * 350) + 'px';
                }
                item.y += player.speed;
                item.style.top = item.y + 'px';

            })
        }
        /////////////////////////////////////////////////////
        // function  againmoveCar(car) {
        //             let other = document.querySelectorAll('.other');
        //             other.forEach(function (item) {
        //                 if (isCollide(car, item)) {
        //                     console.log('HIT');
        //                     //endGame();
        //                     //pauseGame();
        //                 }
        //                 if (item.y >= 750) {
        //                     item.y = -415;
        //                     item.style.left = Math.floor(Math.random() * 350) + 'px';
        //                 }
        //                 item.y += player.speed;
        //                 item.style.top = item.y + 'px';

        //             })
        //         }

        ////////////////////////////////////////////////
        function gamePlay() {

            let car = document.querySelector('.car');
            let road = gamearea.getBoundingClientRect();// to measure dimension of road

            if (player.start) {

                moveLines();
                moveCar(car);
                if (keys.ArrowUp && player.y > (road.top + 70)) {
                    player.y -= player.speed; //here speed means car will move by speed number distance
                }
                if (keys.ArrowDown && player.y < (road.bottom - 70)) {
                    player.y += player.speed;
                }
                if (keys.ArrowLeft && player.x > 0) {
                    player.x -= player.speed;
                }
                if (keys.ArrowRight && player.x < (road.width - 70)) {  //50 = width of car
                    player.x += player.speed;
                }

                car.style.top = player.y + 'px'; //to attach px behind number eg: 44px
                car.style.left = player.x + 'px';//to attach px behind number

                window.requestAnimationFrame(gamePlay);//create loop for road animation
                //console.log(player.score++);
                player.score++;
               ps = player.score - 1;
               s = ps;
                if (player.score >= highest) {
                    highest = ps;
                }
                scores.innerHTML = "Your Score:" + ps + "<br><br>" + "Highest Score:" + highest;


            }

        }

        ////////////////////////////////////////////////////
        function Reset() {
            highest = 0;
        }

        ////////////////////////////////////////////////
        function startClock(){
  timerArea.innerHTML = "Time Remaining: " + timer;
  if (timer <= 0) {
  endGame();
  } else {
    timer -= 1;
    runningTimer = setTimeout(startClock, 1000);
  }
}

///////////////////////////////
        function start() {
            // gamearea.classList.remove('hide');
            startscreen.classList.add('hide');
            gamearea.innerHTML = "";
            startClock();
            player.start = true;
            player.score = 0;
            window.requestAnimationFrame(gamePlay);

            for (x = 0; x < 6; x++) {
                let roadline = document.createElement('div');
                roadline.setAttribute('class', 'lines');
                roadline.y = (x * 150);
                roadline.style.top = roadline.y + 'px';
                gamearea.appendChild(roadline);
            }

            let car = document.createElement('div');//way to create element in document
            car.setAttribute('class', 'car');
            gamearea.appendChild(car);

            player.x = car.offsetLeft; // give the mentioned dimension
            player.y = car.offsetTop;


            for (x = 0; x < 4; x++) {
                let othercar = document.createElement('div');
                othercar.setAttribute('class', 'other');
                othercar.y = ((x + 1) * 350) * -1;
                othercar.style.top = othercar.y + 'px';
                othercar.style.left = Math.floor(Math.random() * 350) + 'px';
                othercar.style.backgroundColor = randomColor();
                gamearea.appendChild(othercar);
            }
        }

        //////////////////////////////////////////////// 

        // var correct = "Correct!!!";
        function againScreen(){
            Question_form.classList.add('hide');
            explanationbox.classList.remove('hide');
            status.innerHTML=" WELL DONE 👍  &nbsp &nbsp &nbsp 🎉🎉😀😀🧡🧡  &nbsp &nbsp "+ "&nbsp &nbsp &nbsp &nbsp CORRECT!!!  ".fontcolor("green") ;
            status1.innerHTML=" You are fantastic".fontcolor("#A702F5").fontsize(5) +"<br>  keep learning and enjoy the Game"+" <br> please continue......... "
            Explaining.innerHTML= questionList.explanation; 
            btn1.onclick= function(){
                explanationbox.classList.add('hide');
                CarGame.classList.remove('hide');
            startscreen.classList.remove('hide');
            startscreen.addEventListener('click', againstart);
            }
            // CarGame.classList.remove('hide');
            // startscreen.classList.remove('hide');
            
            // startscreen.addEventListener('click', againstart);
        }




        function againstart(){
            
            Question_form.classList.add('hide');
            CarGame.classList.remove('hide');
            startscreen.classList.remove('hide');
        
           startscreen.classList.add('hide');
                    gamearea.innerHTML = "";

                    player.start = true;
                    player.score =s;
                    window .requestAnimationFrame(resumeGame);

                    for (x = 0; x < 6; x++) {
                        let roadline = document.createElement('div');
                        roadline.setAttribute('class', 'lines');
                        roadline.y = (x * 150);
                        roadline.style.top = roadline.y + 'px';
                        gamearea.appendChild(roadline);
                    }

                    let car = document.createElement('div');//way to create element in document
                    car.setAttribute('class', 'car');
                    gamearea.appendChild(car);

                    player.x = car.offsetLeft; // give the mentioned dimension
                    player.y = car.offsetTop;


                    for (x = 0; x < 4; x++) {
                        let othercar = document.createElement('div');
                        othercar.setAttribute('class', 'other');
                        othercar.y = ((x + 1) * 350) * -1;
                        othercar.style.top = othercar.y + 'px';
                        othercar.style.left = Math.floor(Math.random() * 350) + 'px';
                        othercar.style.backgroundColor = randomColor();
                        gamearea.appendChild(othercar);
                    }





        }


        function randomColor() {
            function c() {
                let hex = Math.floor(Math.random() * 256).toString(16); //to convert decimal to hex
                return ("0" + String(hex)).substr(-2);
            }
            return "#" + c() + c() + c();
        }


        ////////////////////////////////////////////////////
        const quizdb = [
            {
                question: "Which of the following element is used as a thermocouple in nuclear reactor?",
                answers: [
                    "Boron",
                    "Platinum",
                    "Copper",
                    "Iron"],
                ans: "ans1",
                explanation :" Nuclear reactors are places where a large amount of heat is liberated, here boron is used as thermocouple element as it can measure temperature above 15000c.".fontcolor( "purple").fontsize(5)

            
                
            },
            {
                question: "________ can be used as a replacement for thermocouple lead?",
                answers: [
                    "Replacement lead",
                    "Replica",
                    "Compensation lead",
                    "None ",

                ], ans: "ans3",
                explanation :"Compensating leads are of the same materials as thermocouple leads and can be used as a replacement. ".fontcolor( "purple").fontsize(5)
               
            },
            {
                question: "Thermocouple is a _________________",
                answers: [
                    "Primary Transducer",
                    "secondary Transducer", "Tertiary Transducer",  "none of the above"

                ], ans: "ans1",
                explanation :"Compensating leads are of the same materials as thermocouple leads and can be used as a replacement. ".fontcolor( "purple").fontsize(5)
            },
            {
                question: 'How do you write "Hello World" in an alert box?',
                answers: [
                    'msg("Heo World");',
                    'prompt("Heo World");',
                    'alertBox("Heo World");',
                    'alert("Hello World");'
                ], ans: "ans1"
            },
            {
                question: "How do you create a function in JavaScript?",
                answers: [
                    "function myFunction()",
                    "function = Function()",
                    "make.function.Function()",
                    "function:Function()"], ans: "ans3"
            },
            {
                question: 'How do you call a function named "myFunction"?',
                answers: [
                    "call Function()",
                    "read Function()",
                    "myFunction()",
                    "run.Function()"], ans: "ans4"
            },
            {
                question: "How do you write an IF statement in JavaScript?",
                answers: [
                    "if (i === 5)",
                    "ii = 5 then",
                    "if === 5 then",
                    "if (i = 5)"], ans: "ans4"
            },
            {
                question: "!= means what in javascript?",
                answers: [
                    "Or",
                    "And",
                    "Plus d Equal To",
                    "Not Equal To",
                ], ans: "ans2"
            },
            {
                question: "What Characters Contains an Array?",
                answers: [
                    "< >",
                    "{ }",
                    "[ ]",
                    "# #"], ans: "ans1"
            }, {
                question: "!= means what in javascript?",
                answers: [
                    "Or",
                    "And",
                    "Plus d Equal To",
                    "Not Equal To",
                ], ans: "ans2"
            }, {
                question: "What Characters Contains an Array?",
                answers: [
                    "< >",
                    "{ }",
                    "[ ]",
                    "# #"], ans: "ans1"
            }
        ];

        var questionCount = 0;
        let score = 0;
        let questionList = quizdb[questionCount];

        const loadquestion = () => {
            player.start = false;
  CarGame.classList.add('hide');
           
            Question_form.classList.remove('hide');

            question.innerHTML = questionList.question;
            option1.innerHTML = questionList.answers[0];
            option2.innerHTML = questionList.answers[1];
            option3.innerHTML = questionList.answers[2];
            option4.innerHTML = questionList.answers[3];
        };
      //  loadquestion();



        const getCheckedAnswer = () => {
            let answer;
            answers.forEach((currentElement) => {
                if (currentElement.checked) {
                    answer = currentElement.id;
                }
            });
            return answer;
        };

        const checkedselect = () =>{

// if(document.getElementById('ans1').checked){
//     getCheckedAnswer();
// }else if(document.getElementById('ans2').checked){
//     getCheckedAnswer();
// }else if(document.getElementById('ans3').checked){
//     getCheckedAnswer();
// }else if(document.getElementById('ans4').checked){
//     getCheckedAnswer();
// }else{
// alert("hII");
// checkedselect();
// }





        }

       // getCheckedAnswer();
        submit.addEventListener('click', () => {

           const checkedAnswer = getCheckedAnswer();
            if (checkedAnswer == quizdb[questionCount].ans){
              //  score++;
                // questionCount++;
                // questionList = quizdb[questionCount];
                againScreen();
                console.log("abhi hoo");
        
            }else{
                // questionCount++;
                // questionList = quizdb[questionCount];
                console.log("abhi margaya");
endGame();
   } questionCount++;
                questionList = quizdb[questionCount];//questionCount++;
            // questionList = quizdb[questionCount];
            // console.log(questionCount);
            // if (questionCount < quizdb.length) {
            //     loadquestion();
            // } else {
            //     console.log("hello");

            // }


        });