import { linksConstants } from '../_constants';

function getCateguris(linksItems) {
  // const uniqueCategories;
  // linksItems.map(linkItem => {
  //   if (uniqueCategories.indexOf(linkItem.Category) === -1) 
  //   { uniqueCategories.push(linkItem.Category) }
  // })
  // return uniqueCategories;
  return new Set(linksItems.map(limkItem => limkItem.Category));
};
export function links(state = {}, action) {
  switch (action.type) {
    case linksConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case linksConstants.GETALL_SUCCESS:
      return {
        items: action.links,
        categories: getCateguris(action.links)[Symbol.iterator]()
      };
    case linksConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case linksConstants.ADD_REQUEST:
      return {
        loading: true
      };
    case linksConstants.ADD_SUCCESS:
      return {
        items: action.links
      };
    case linksConstants.ADD_FAILURE:
      return {
        error: action.error
      };
    case linksConstants.DELETE_REQUEST:
      // add 'deleting:true' property to link being deleted
      return {
        ...state,
        items: state.items.map(link =>
          link.id === action.id
            ? { ...link, deleting: true }
            : link
        )
      };
    case linksConstants.DELETE_SUCCESS:
      // remove deleted link from state
      return {
        items: state.items.filter(link => link.id !== action.id)
      };
    case linksConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to link 
      return {
        ...state,
        items: state.items.map(link => {
          if (link.id === action.id) {
            // make copy of link without 'deleting:true' property
            const { deleting, ...linkCopy } = link;
            // return copy of link with 'deleteError:[error]' property
            return { ...linkCopy, deleteError: action.error };
          }

          return link;
        })
      };
    default:
      return state
  }
}