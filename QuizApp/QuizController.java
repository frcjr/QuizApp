@RestController
@RequestMapping("/api/quizzes")
public class QuizController {
    @Autowired
    private QuizService quizService;

    @GetMapping("/{id}/questions")
    public List<QuestionDto> getQuizQuestions(@PathVariable Long id) {
        return quizService.getQuizQuestions(id);
    }

    @PostMapping("/submit")
    public ScoreDto submitAnswers(@RequestBody QuizSubmission submission) {
        return quizService.calculateScore(submission);
    }
}
