export const currentPage = page => {
  return dispatch => dispatch({ type: "CURRENT_PAGE", page });
};
