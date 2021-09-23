import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_FITUR = "GET_LIST_FITUR";
export const TAMBAH_FITUR = "TAMBAH_FITUR";
export const GET_DETAIL_FITUR = "GET_DETAIL_FITUR";
export const UPDATE_FITUR = "UPDATE_FITUR";
export const DELETE_FITUR = "DELETE_FITUR";

export const getListFitur = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_FITUR);

    FIREBASE.database()
      .ref("fitur")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_FITUR, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_FITUR, error);
        alert(error);
      });
  };
};

export const getDetailFitur = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_FITUR);

    FIREBASE.database()
      .ref("fitur/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_FITUR, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_FITUR, error);
        alert(error);
      });
  };
};

export const tambahFitur = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_FITUR);

    //upload ke storage firebase
    var uploadTask = FIREBASE.storage()
      .ref("fitur")
      .child(data.imageToDB.name)
      .put(data.imageToDB);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        console.log(snapshot);
      },
      function (error) {
        console.log(error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          const dataBaru = {
            namaFitur: data.namaFitur,
            image: downloadURL,
          };

          FIREBASE.database()
            .ref("fitur")
            .push(dataBaru)
            .then((response) => {
              dispatchSuccess(dispatch, TAMBAH_FITUR, response ? response : []);
            })
            .catch((error) => {
              dispatchError(dispatch, TAMBAH_FITUR, error);
              alert(error);
            });
        });
      }
    );
  };
};

export const updateFitur = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_FITUR);

    //Cek apakah gambar diganti
    if (data.imageToDB) {
      //ambil file gambar lama dari firebase storage
      var desertRef = FIREBASE.storage().refFromURL(data.imageLama);

      // hapus gambar lama dari firebase storage
      desertRef
        .delete()
        .then(function () {
          //upload gambar yang baru
          var uploadTask = FIREBASE.storage()
            .ref("fitur")
            .child(data.imageToDB.name)
            .put(data.imageToDB);

          uploadTask.on(
            "state_changed",
            function (snapshot) {
              console.log(snapshot);
            },
            function (error) {
              console.log(error);
            },
            function () {
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  const dataBaru = {
                    namaFitur: data.namaFitur,
                    image: downloadURL,
                  };

                  FIREBASE.database()
                    .ref("fitur/" + data.id)
                    .update(dataBaru)
                    .then((response) => {
                      dispatchSuccess(
                        dispatch,
                        UPDATE_FITUR,
                        response ? response : []
                      );
                    })
                    .catch((error) => {
                      dispatchError(dispatch, UPDATE_FITUR, error);
                      alert(error);
                    });
                });
            }
          );
        })
        .catch(function (error) {
          dispatchError(dispatch, UPDATE_FITUR, error);
          alert(error);
        });
    } else {
      const dataBaru = {
        namaFitur: data.namaFitur,
        image: data.image,
      };

      FIREBASE.database()
        .ref("fitur/" + data.id)
        .update(dataBaru)
        .then((response) => {
          dispatchSuccess(dispatch, UPDATE_FITUR, response ? response : []);
        })
        .catch((error) => {
          dispatchError(dispatch, UPDATE_FITUR, error);
          alert(error);
        });
    }
  };
};

export const deleteFitur = (image, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_FITUR);

    //Hapus gambar dari storage
    var desertRef = FIREBASE.storage().refFromURL(image);

    // Delete the file
    desertRef
      .delete()
      .then(function () {
        //hapus juga data di realtime database
        FIREBASE.database()
          .ref("fitur/" + id)
          .remove()
          .then(() => {
            dispatchSuccess(dispatch, DELETE_FITUR, "Liga Sukses Dihapus");
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_FITUR, error);
            alert(error);
          });
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
        dispatchError(dispatch, DELETE_FITUR, error);
        alert(error);
      });
  };
};
