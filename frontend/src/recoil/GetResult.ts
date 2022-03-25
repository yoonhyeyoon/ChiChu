import { selector } from 'recoil';
import { UserAge } from './UserAge';
import { UserGender } from './UserGender';

// export default selector<TResponseData>({
//   key: 'GetResult',
//   get: async ({ get }) => {
//     const planListData = get(PlanListDataState);
//     if (
//       planListData == undefined ||
//       window.location.pathname != `/${QUIZ_PAGENAME}`
//     )
//       return undefined;

//     const { age, gender } = planListData;

//     const axios = customAxios();
//     const response = await axios({
//       method: 'GET',
//       params: {
//         amount,
//         difficulty,
//         type: 'multiple',
//       },
//     });
//     const decodedResponseData = {
//       ...response.data,
//       results: response.data.results.map((quiz: TQuiz) => {
//         const decoded_correct_answer = decodeHtml(quiz.correct_answer);
//         const decoded_incorrect_answers = quiz.incorrect_answers.map((answer) =>
//           decodeHtml(answer),
//         );
//         return {
//           ...quiz,
//           question: decodeHtml(quiz.question),
//           correct_answer: decoded_correct_answer,
//           incorrect_answers: decoded_incorrect_answers,
//           examples: addCorrectAnswerRandomly(
//             decoded_incorrect_answers,
//             decoded_correct_answer,
//           ),
//         };
//       }),
//     };
//     return decodedResponseData;
//   },
//   set: ({ get, set }) => {
//     const age = get(UserAge);
//     const gender = get(UserGender);

//     set(PlanListDataState, { age, gender });
//     set(QuizNumbersState, DEFAULT_NUMBERS);
//     set(QuizDifficultyState, undefined);
//   },
// });