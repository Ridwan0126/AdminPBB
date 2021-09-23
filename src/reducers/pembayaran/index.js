import {
  GET_LIST_PEMBAYARAN,
  UPDATE_PEMBAYARAN,
} from "../../actions/PembayaranAction";

const initialState = {
  getListPembayaranLoading: false,
  getListPembayaranResult: false,
  getListPembayaranError: false,

  updateStatusLoading: false,
  updateStatusResult: false,
  updateStatusError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PEMBAYARAN:
      return {
        ...state,
        getListPembayaranLoading: action.payload.loading,
        getListPembayaranResult: action.payload.data,
        getListPembayaranError: action.payload.errorMessage,
      };

    case UPDATE_PEMBAYARAN:
      return {
        ...state,
        updateStatusLoading: action.payload.loading,
        updateStatusResult: action.payload.data,
        updateStatusError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
