import {
  GET_LIST_PBB,
  UPLOAD_PBB,
  TAMBAH_PBB,
  GET_DETAIL_PBB,
  UPDATE_PBB,
  DELETE_PBB,
} from "../../actions/PBBAction";

const initialState = {
  getListPbbLoading: false,
  getListPbbResult: false,
  getListPbbError: false,

  uploadPbbLoading: false,
  uploadPbbResult: false,
  uploadPbbError: false,

  tambahPbbLoading: false,
  tambahPbbResult: false,
  tambahPbbError: false,

  getDetailPbbLoading: false,
  getDetailPbbResult: false,
  getDetailPbbError: false,

  updatePbbLoading: false,
  updatePbbResult: false,
  updatePbbError: false,

  deletePbbLoading: false,
  deletePbbResult: false,
  deletePbbError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PBB:
      return {
        ...state,
        getListPbbLoading: action.payload.loading,
        getListPbbResult: action.payload.data,
        getListPbbError: action.payload.errorMessage,
      };

    case UPLOAD_PBB:
      return {
        ...state,
        uploadPbbLoading: action.payload.loading,
        uploadPbbResult: action.payload.data,
        uploadPbbError: action.payload.errorMessage,
      };

    case TAMBAH_PBB:
      return {
        ...state,
        tambahPbbLoading: action.payload.loading,
        tambahPbbResult: action.payload.data,
        tambahPbbError: action.payload.errorMessage,
      };

    case GET_DETAIL_PBB:
      return {
        ...state,
        getDetailPbbLoading: action.payload.loading,
        getDetailPbbResult: action.payload.data,
        getDetailPbbError: action.payload.errorMessage,
      };

    case UPDATE_PBB:
      return {
        ...state,
        updatePbbLoading: action.payload.loading,
        updatePbbResult: action.payload.data,
        updatePbbError: action.payload.errorMessage,
      };

    case DELETE_PBB:
      return {
        ...state,
        deletePbbLoading: action.payload.loading,
        deletePbbResult: action.payload.data,
        deletePbbError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
