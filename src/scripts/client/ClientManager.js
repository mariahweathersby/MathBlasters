import { getNonZeroRandomNumber } from '../utils/Utils'

export default class ClientManager {
    constructor(isMobile = false) {
        this.mathDictionary = {
            1: ['1 X 1', '5 - 4', '9 / 9'],
            2: ['6 / 3', '18 / 9', '2 X 1'],
            3: ['6 / 2', ' 3 X 1', '33 / 11'],
            4: ['2 X 2', '16 / 8', '32 / 7'],
            5: ['5 X 1', '15 - 10', '7 - 2'],
            6: ['6 X 1', '36 / 6', '3 x 2'],
            7: ['77 X 11', '42 / 7', '21 x 3'],
            8: ['8 X 1', '24 / 4', '96 / 12'],
            9: ['9 X 1', '36 / 4', '90 / 10'],

        };

        this.isMobile = isMobile;
        this.currentProblem = "";
        this.currentAnswer = "";
        this.currentTime = 20;
        this.score = 0;

        this.UI = {
            problemDisplayEL: document.getElementById('current-problem'),
            timerDisplayEL: document.getElementById('timer'),
            scoreKeeperEL: document.getElementById('score-keeper'),
            userFeedbackDisplay: document.getElementById('user-feedback-display'),
            mathViewport: document.getElementById('math-viewport'),
            crosshair: document.getElementById('crosshair'),
            introDisplay: document.getElementById('intro-page-wrapper')
        }

    }


    activateUI = () => {
        this.UI.mathViewport.classList.add('active');
        this.UI.crosshair.classList.add('active');
        this.UI.introDisplay.classList.remove('active')
    }

    onStart = (newAnswer) => {
        this.currentAnswer = newAnswer;
        let arrayOptions = this.mathDictionary[newAnswer];
        let newProblemIndex = Math.floor(getNonZeroRandomNumber(1, 9));

        newProblemIndex = Math.abs(newProblemIndex);

        let newProblem = arrayOptions[newProblemIndex];

        this.activateUI();
        this.updateProblem(newProblem);
        this.initTimer();

    }

    initTimer = () => {
        let timeleft = 20;
        let downloadTimer = setInterval((self) => {
            if (timeleft.toString().length < 2) {
                this.UI.timerDisplayEL.innerHTML = '0' + timeleft;
            } else {
                this.UI.timerDisplayEL.innerHTML = timeleft;
            }

            timeleft -= 1;
            if(timeleft <= 0){
                clearInterval(downloadTimer);
                this.UI.timerDisplayEL.innerHTML = "00"
            }

        }, 1000);
    }

    fetchProblem = (selectedVal) => {
        let problemArray = this.mathDictionary[selectedVal];
        let problemIndex = Math.floor(Math.random() * problemArray.length);
        return problemArray[problemIndex];
    }
    
    updateProblem = () => {
        let newSelectedAnswerVal = 
            Math.floor(getNonZeroRandomNumber(1, 9));
        newSelectedAnswerVal = Math.abs(newSelectedAnswerVal);
        this.updateTargetAnswer(newSelectedAnswerVal);

        let newProblem = this.fetchProblem(newSelectedAnswerVal);
        this.currentProblem = newProblem;
        this.UI.problemDisplayEL.innerHTML = this.currentProblem;

    }

    updateTargetAnswer = (newAnswerVal) => {
        this.currentAnswer = newAnswerVal;
    }

    updateScore = (newScore) => {
        this.UI.scoreKeeperEL.innerHTML = newScore;
    }
    
    userInputResponse = (responseState) => {
        this.UI.userFeedbackDisplay.classList.add(responseState);
        setTimeout(() => { 
            this.UI.userFeedbackDisplay.classList.remove(responseState)              
        }, 150)
    }

    validateAnswer = (userSubmission) => {
        let responseState = '';
        let responseVal = 0;

        if (userSubmission === this.currentAnswer){
            responseState = 'correct';
            responseVal = 1;
            
            let newScore = this.score += 10;
            this.updateScore(newScore)

        } else {
            responseState = "incorrect";
        }

        this.userInputResponse(responseState);
        this.updateProblem();
        return responseVal;
    }


}