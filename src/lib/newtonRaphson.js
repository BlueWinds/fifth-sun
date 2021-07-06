/**
 * Standard implementation of the Newton-Raphson method to solve a non-linear equation
 *
 * \param[in] x Starting point
 * \param[in] F equation to be solved in the form F = 0. Callable as F(x)
 * \param[in] dF derivative of F with respect to x. Callable as dF(x)
 */
export default function newtonRaphson(x, F, dF, iterations) {
  for (let i = 0; i < iterations; i++) {
    const term = F(x) / dF(x)
    x -= term
  }

  return x
}
