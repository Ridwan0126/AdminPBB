import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_PEMBAYARAN = "GET_LIST_PEMBAYARAN";
export const UPDATE_PEMBAYARAN = "UPDATE_PEMBAYARAN";

export const getListPembayaran = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_PEMBAYARAN);

    FIREBASE.database()
      .ref("histories")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_PEMBAYARAN, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_PEMBAYARAN, error);
        alert(error);
      });
  };
};

export const updatePembayaran = (order_id, transaction_status) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_PEMBAYARAN);

    const status =
      transaction_status === "settlement" || transaction_status === "capture"
        ? "lunas"
        : transaction_status;

    FIREBASE.database()
      .ref("histories")
      .child(order_id)
      .update({
        status: status,
      })
      .then((response) => {
        dispatchSuccess(dispatch, UPDATE_PEMBAYARAN, response ? response : []);
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_PEMBAYARAN, error);
        alert(error);
      });
  };
};
