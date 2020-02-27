// class SwipeService {
//     constructor() {}

//     init(idOfSwiperContainer) {
//         const _C = document.querySelector(`#${idOfSwiperContainer}`),
//             N = _C.children.length,
//             NF = 30,
//             TFN = {
//                 'linear': function (k) {
//                     return k
//                 },
//                 'ease-in': function (k, e = 1.675) {
//                     return Math.pow(k, e)
//                 },
//                 'ease-out': function (k, e = 1.675) {
//                     return 1 - Math.pow(1 - k, e)
//                 },
//                 'ease-in-out': function (k) {
//                     return .5 * (Math.sin((k - .5) * Math.PI) + 1)
//                 }
//             };

//         let i = 0,
//             x0 = null,
//             locked = false,
//             w, ini, fin, rID = null,
//             anf;

//         function stopAni() {
//             cancelAnimationFrame(rID);
//             rID = null
//         };

//         function ani(cf = 0) {
//             _C.style.setProperty('--i', ini + (fin - ini) * TFN['ease-out'](cf / anf));

//             if (cf === anf) {
//                 stopAni();
//                 return
//             }

//             rID = requestAnimationFrame(ani.bind(this, ++cf))
//         };

//         function unify(e) {
//             return e.changedTouches ? e.changedTouches[0] : e
//         };

//         function lock(e) {
//             x0 = unify(e).clientX;
//             locked = true
//         };

//         function drag(e) {
//             e.preventDefault();

//             if (locked) {
//                 let dx = unify(e).clientX - x0,
//                     f = +(dx / w).toFixed(2);

//                 _C.style.setProperty('--i', i - f)
//             }
//         };

//         function move(e) {
//             if (locked) {
//                 let dx = unify(e).clientX - x0,
//                     s = Math.sign(dx),
//                     f = +(s * dx / w).toFixed(2);

//                 ini = i - s * f;

//                 if ((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > .2) {
//                     i -= s;
//                     f = 1 - f
//                 }

//                 fin = i;
//                 anf = Math.round(f * NF);
//                 ani();
//                 x0 = null;
//                 locked = false;
//             }
//         };

//         function size() {
//             w = window.innerWidth
//         };

//         size();
//         _C.style.setProperty('--n', N);

//         addEventListener('resize', size, false);

//         _C.addEventListener('mousedown', lock, false);
//         _C.addEventListener('touchstart', lock, false);

//         _C.addEventListener('mousemove', drag, false);
//         _C.addEventListener('touchmove', drag, false);

//         _C.addEventListener('mouseup', move, false);
//         _C.addEventListener('touchend', move, false);
//     }
// }
// // const swipeService = new SwipeService();
// export default swipeService;