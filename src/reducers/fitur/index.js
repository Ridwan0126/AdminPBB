import {
  GET_LIST_FITUR,
  TAMBAH_FITUR,
  GET_DETAIL_FITUR,
  UPDATE_FITUR,
  DELETE_FITUR,
} from "../../actions/FiturAction";

const initialState = {
  getListFiturLoading: false,
  getListFiturResult: false,
  getListFiturError: false,

  tambahFiturLoading: false,
  tambahFiturResult: false,
  tambahFiturError: false,

  getDetailFiturLoading: false,
  getDetailFiturResult: false,
  getDetailFiturError: false,

  updateFiturLoading: false,
  updateFiturResult: false,
  updateFiturError: false,

  deleteFiturLoading: false,
  deleteFiturResult: false,
  deleteFiturError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_FITUR:
      return {
        ...state,
        getListFiturLoading: action.payload.loading,
        getListFiturResult: action.payload.data,
        getListFiturError: action.payload.errorMessage,
      };

    case TAMBAH_FITUR:
      return {
        ...state,
        tambahFiturLoading: action.payload.loading,
        tambahFiturResult: action.payload.data,
        tambahFiturError: action.payload.errorMessage,
      };

    case GET_DETAIL_FITUR:
      return {
        ...state,
        getDetailFiturLoading: action.payload.loading,
        getDetailFiturResult: action.payload.data,
        getDetailFiturError: action.payload.errorMessage,
      };

    case UPDATE_FITUR:
      return {
        ...state,
        updateFiturLoading: action.payload.loading,
        updateFiturResult: action.payload.data,
        updateFiturError: action.payload.errorMessage,
      };

    case DELETE_FITUR:
      return {
        ...state,
        deleteFiturLoading: action.payload.loading,
        deleteFiturResult: action.payload.data,
        deleteFiturError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
