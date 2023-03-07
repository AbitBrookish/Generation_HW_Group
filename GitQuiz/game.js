const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: 'Which of the following is a core value of the Agile Manifesto?',
    choice1: 'Working software over the comprehensive documentation',
    choice2: 'Following a strict plan over responding to change',
    choice3: 'Contracts and negotiation over customer collaboration',
    choice4: 'Process and tools over individuals and interactions',
    answer: 1,
  },  
  {
    question: 'Which of the following is a Scrum artifact?',
    choice1: 'Burndown chart',
    choice2: 'Meeting minutes',
    choice3: 'Project plan',
    choice4: 'Performance report',
    answer: 1,
  },  
  {
    question: 'Who is responsible for prioritizing the Product Backlog in Scrum?',
    choice1: 'The Scrum Master',
    choice2: 'The Development Team',
    choice3: 'The Product Owner',
    choice4: 'The Stakeholders',
    answer: 3,
  },  
  {
    question: 'Which of the following is a Scrum event?',
    choice1: 'Sprint Retrospective',
    choice2: 'Daily Huddle',
    choice3: 'End of year review',
    choice4: 'Quarterly report',
    answer: 1,
  },
  {
    question: 'In Scrum, what is the purpose of the Sprint Review?',
    choice1: 'To plan the next Sprint',
    choice2: 'To inspect and adapt the current Sprint',
    choice3: 'To showcase the work completed during the Sprint',
    choice4: 'To discuss any impediments or issues encountered during the Sprint',
    answer: 3,
  },
  {
    question: 'What is the recommended length for a Sprint in Scrum?',
    choice1: '1 week',
    choice2: '2 weeks',
    choice3: '3 weeks',
    choice4: '4 weeks',
    answer: 2,
  },
  {
    question: 'Who is responsible for removing inpediments in Scrum?',
    choice1: 'The Scrum Master',
    choice2: 'The Product Owner',
    choice3: 'The Development Team',
    choice4: 'The Stakeholders',
    answer: 1,
  },
  {
    question: 'What is the purpose of the Daily Scrum in Scrum?',
    choice1: 'To discuss project status with stakeholders',
    choice2: 'To review and update the Product Backlog',
    choice3: 'To inspect and adapt progress toward the Sprint Goal',
    choice4: 'To discuss and resolve technical issues',
    answer: 3,
  },
  {
    question: 'Which of the following is NOT a Scrum role?',
    choice1: 'Scrum Master',
    choice2: 'Project Manager',
    choice3: 'Product Owner',
    choice4: 'Development Team',
    answer: 2,
  },
  {
    question: 'What is the purpose of the Sprint Goal in Scrum?',
    choice1: 'To track progress during the Spring',
    choice2: 'To provide a high-level objective for the Sprint',
    choice3: 'To define the scope of the Sprint',
    choice4: 'To identify the team\'s capacity for the Sprint',
    answer: 2,
  },
  {
    question: 'What is the purpose of the Sprint Retrospective in Scrum?',
    choice1: 'To plan the next Sprint',
    choice2: 'To inspect and adapt the current Sprint',
    choice3: 'To showcase the work completed during the Sprint',
    choice4: 'To discuss any impediments or issues encountered during the Sprint',
    answer: 2,
  },
  {
    question: 'Which of the following is NOT a benefit of using Agile methodologies?',
    choice1: 'Increased flexibility and adaptability',
    choice2: 'Faster time to market',
    choice3: 'Higher quality products',
    choice4: 'Greater predictability and control',
    answer: 4,
  },
  {
    question: 'What is the purpose of the Sprint Planning meeting in Scrum?',
    choice1: 'To review and update the Product Backlog',
    choice2: 'To discuss and resolve technical issues',
    choice3: 'To plan the work to be done in the upcoming Sprint',
    choice4: 'To review and assess the team\'s progress',
    answer: 3,
  },
  {
    question: 'What is the purpose of the Product Backlog in Scrum?',
    choice1: 'To track progress during the Sprint',
    choice2: 'To provide a high-level objective for the Sprint',
    choice3: 'To define the scope of the Sprint',
    choice4: 'To prioritize and manage the work to be done',
    answer: 4,
  },
  {
    question: 'What is the main goal of agile development methodologies?',
    choice1: 'to follow a strict plan and timeline',
    choice2: 'to deliver working software incrementally and iteratively',
    choice3: 'to rely on extensive documentation and specifications',
    choice4: 'to have a hierarchial structure with clear authority and roles',
    answer: 2,
  },
  {
    question: 'Which of the following is NOT one of the core values of the Agile Manifesto?',
    choice1: 'individuals and interactions over processes and tools',
    choice2: 'working software over comprehensive documentation',
    choice3: 'customer collaboration over contract negotiation',
    choice4: 'following a plan over responding to change',
    answer: 4,
  },
  {
    question: 'What is a Scrum Master responsible for in a Scrum team?',
    choice1: 'managing the bakclog and prioritizing tasks',
    choice2: 'ensuring the team follows Scrum practices and principles',
    choice3: 'Developing the software and writing code',
    choice4: 'testing and debugging the software',
    answer: 2,
  },
  {
    question: 'What is a product backlog in Scrum?',
    choice1: 'a list of tasks completed by the team during a sprint',
    choice2: 'a list of bugs and issues to be fixed',
    choice3: 'a list of features and requirements for the product',
    choice4: 'a list of team members and their responsibilities',
    answer: 3,
  },
  {
    question: 'What is the purpose of a Sprint Review in Scrum?',
    choice1: 'to review the work completed during the sprint and demonstrate the product increment to stakeholders',
    choice2: 'to plan and prioritize the work for the next sprint',
    choice3: 'to retrospectively review the teams\'s performance during the sprint and identify areas for improvement',
    choice4: 'to update the product backlog with new features and requirements',
    answer: 1,
  },
  {
    question: 'What is the difference between a sprint backlog and a product backlog in Scrum?',
    choice1: 'a sprint backlog contains only the highest-priority items from the product backlog',
    choice2: 'a sprint backlog contains all the items from the product backlog, but in a prioritized order',
    choice3: 'a product backlog contains only the items for the current sprint',
    choice4: 'a product backlog contains all the items for the entire product, while a sprint backlog contains only the items for the current sprint',
    answer: 4,
  }
]

const SCORE_POINTS = 50
const MAX_QUESTIONS = 20

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('/end.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return
    
    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if(classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    };

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()

    }, 1000);

  });
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame()