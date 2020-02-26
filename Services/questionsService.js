class QuestionService {
    constructor() {
        this.questionRef = _db.collection("questions");
        this.gameRef = _db.collection("games");
        this.questions = [];
    }

    fetchQuestions() {
        this.questions = [];
        this.questionRef.get().then(snapshotData => {
            snapshotData.forEach(doc => {
                let question = doc.data();
                question.id = doc.id;
                this.questions.push(question);
            })
        })
    }

}
const questionService = new QuestionService;
export default questionService;