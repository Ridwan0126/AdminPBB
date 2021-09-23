import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_PBB = "GET_LIST_PBB";
export const UPLOAD_PBB = "UPLOAD_PBB";
export const TAMBAH_PBB = "TAMBAH_PBB";
export const GET_DETAIL_PBB = "GET_DETAIL_PBB";
export const UPDATE_PBB = "UPDATE_PBB";
export const DELETE_PBB = "DELETE_PBB";

export const getListPbb = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_PBB);

    FIREBASE.database()
      .ref("pbb")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_PBB, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_PBB, error);
        alert(error);
      });
  };
};

export const getDetailPbb = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_PBB);

    FIREBASE.database()
      .ref("pbb/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_PBB, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_PBB, error);
        alert(error);
      });
  };
};

export const uploadPbb = (gambar, imageToDB) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPLOAD_PBB);

    //upload ke storage firebase
    var uploadTask = FIREBASE.storage()
      .ref("pbb")
      .child(gambar.name)
      .put(gambar);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        console.log(snapshot);
      },
      function (error) {
        dispatchError(dispatch, UPLOAD_PBB, error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          const dataBaru = {
            image: downloadURL,
            imageToDB: imageToDB,
          };

          dispatchSuccess(dispatch, UPLOAD_PBB, dataBaru);
        });
      }
    );
  };
};

export const tambahPbb = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_PBB);

    const dataBaru = {
      nama: data.nama,
      tagihan: data.tagihan,
      nop: data.nop,
      jenis: data.jenis,
      ready: data.ready,
      tahuns: data.tahunSelected,
      Fitur: data.Fitur,
      alamat: data.alamat,
      objek: data.objek,
      estimasi: data.estimasi,
      tempo: data.tempo,
    };

    FIREBASE.database()
      .ref("pbb")
      .push(dataBaru)
      .then((response) => {
        dispatchSuccess(dispatch, TAMBAH_PBB, response);
      })
      .catch((error) => {
        dispatchError(dispatch, TAMBAH_PBB, error);
        alert(error);
      });
  };
};

export const updatePbb = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_PBB);

    const dataBaru = {
      nama: data.nama,
      tagihan: data.tagihan,
      nop: data.nop,
      jenis: data.jenis,
      ready: data.ready,
      tahuns: data.tahunSelected,
      Fitur: data.Fitur,
      alamat: data.alamat,
      objek: data.objek,
      estimasi: data.estimasi,
      tempo: data.tempo,
    };

    FIREBASE.database()
      .ref("pbb/" + data.id)
      .update(dataBaru)
      .then((response) => {
        if (data.imageToDB1) {
          var desertRef = FIREBASE.storage().refFromURL(data.imageLama1);
          desertRef.delete().catch(function (error) {
            dispatchError(dispatch, UPDATE_PBB, error);
          });
        }

        if (data.imageToDB2) {
          var desertRef2 = FIREBASE.storage().refFromURL(data.imageLama2);
          desertRef2.delete().catch(function (error) {
            dispatchError(dispatch, UPDATE_PBB, error);
          });
        }

        dispatchSuccess(dispatch, UPDATE_PBB, "Update Jersey Sukses");
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_PBB, error);
        alert(error);
      });
  };
};

export const deletePbb = (images, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_PBB);

    var desertRef = FIREBASE.storage().refFromURL(images[0]);
    desertRef
      .delete()
      .then(function () {
        var desertRef2 = FIREBASE.storage().refFromURL(images[1]);

        desertRef2
          .delete()
          .then(function () {
            //hapus realtime database
            FIREBASE.database()
              .ref("pbb/" + id)
              .remove()
              .then(function () {
                dispatchSuccess(
                  dispatch,
                  DELETE_PBB,
                  "Jersey Berhasil di Hapus"
                );
              })
              .catch(function (error) {
                dispatchError(dispatch, DELETE_PBB, error);
              });
          })
          .catch(function (error) {
            dispatchError(dispatch, DELETE_PBB, error);
          });
      })
      .catch(function (error) {
        dispatchError(dispatch, DELETE_PBB, error);
      });
  };
};
