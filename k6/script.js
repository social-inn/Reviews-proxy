import http from "k6/http";
import { check } from "k6";

export let options = {
  vus: 1000,
  duration: "3m",
};

export default function() {
  let res = http.get('http://localhost:3000/reviews/' + Math.ceil(Math.random() * 10000000));
  check(res, {
    'status was 200': (r) => r.status == 200
  });
};

// export default function() {
//   var random = Math.floor(Math.random() * 1000000)
//   let res = http.post(`http://localhost:3000/reviews/${random}`);
//   check(res, {
//     "success": (r) => r.status == 201
//   });
// };