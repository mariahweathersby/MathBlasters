export default class ClientManager {
    constructor(isMobile = false) {
        this.mathDictionary = {
            1: ['1 X 1', '5 - 4', '9 % 9'],
            2: ['6 / 3', '18 / 9', '2 X 1'],
            3: ['6 / 2', ' 3 X 1', '33 / 11'],
            4: ['2 X 2', '16 / 8', '32 / 7'],
            5: ['5 X 1', '15 - 10', '7 - 2']
        };

        this.isMobile = isMobile;
        this.currentProblem = "";

    }

    fetchProblem = (selectedVal) => {
        let problemArray = this.mathDictionary[selectedVal];
        return Math.floor(Math.random() * problemArray.length);
    }
    
    updateProblem = (newProblem) => {
        this.currentProblem = newProblem;
    }


}