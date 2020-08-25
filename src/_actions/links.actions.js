import { linksConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const linkActions = {
    AddNewLink,
    getAllLinks,
    deleteLink
};

function AddNewLink(link) {
    return dispatch => {
        dispatch(request());
        userService.postNewItem('links',link)
            .then(
                links => dispatch(success(links)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type:linksConstants.ADD_REQUEST } }
    function success(links) { return { type: linksConstants.ADD_REQUEST, links } }
    function failure(error) { return { type: linksConstants.ADD_FAILURE, error } }
}
function getAllLinks(userId) {
    return dispatch => {
        dispatch(request());
        userService.getById('UserLinks?userId=',userId)
            .then(
                links => dispatch(success(links)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type:linksConstants.GETALL_REQUEST } }
    function success(links) { return { type: linksConstants.GETALL_SUCCESS, links } }
    function failure(error) { return { type: linksConstants.GETALL_FAILURE, error } }
}
function deleteLink(id) {
    return dispatch => {
        dispatch(request(id));
        userService.deleteItem('links',id)
            .then(
                link => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: linksConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: linksConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: linksConstants.DELETE_FAILURE, id, error } }
}
