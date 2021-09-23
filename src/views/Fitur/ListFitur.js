import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Button,
  Spinner,
} from "reactstrap";
import { getListFitur, deleteFitur } from "actions/FiturAction";
import { Link } from "react-router-dom";
import swal from "sweetalert";

class ListFitur extends Component {
  componentDidMount() {
    this.props.dispatch(getListFitur());
  }

  removeData = (image, id) => {
    //akses ke action
    this.props.dispatch(deleteFitur(image, id));
  };

  componentDidUpdate(prevProps) {
    const { deleteFiturResult } = this.props;

    if (
      deleteFiturResult &&
      prevProps.deleteFiturResult !== deleteFiturResult
    ) {
      swal("Sukses!", deleteFiturResult, "success");
      this.props.dispatch(getListFitur());
    }
  }

  render() {
    const { getListFiturError, getListFiturLoading, getListFiturResult } =
      this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Fitur</CardTitle>
                <Link
                  to="/admin/Fitur/tambah"
                  className="btn btn-primary float-right"
                >
                  Tambah Fitur
                </Link>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Logo</th>
                      <th>Nama Fitur</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getListFiturResult ? (
                      Object.keys(getListFiturResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <img
                              src={getListFiturResult[key].image}
                              width="100"
                              alt={getListFiturResult[key].namaFitur}
                            />
                          </td>
                          <td>{getListFiturResult[key].namaFitur}</td>
                          <td>
                            <Link
                              className="btn btn-warning"
                              to={"/admin/Fitur/edit/" + key}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>

                            <Button
                              color="danger"
                              className="ml-2"
                              onClick={() =>
                                this.removeData(
                                  getListFiturResult[key].image,
                                  key
                                )
                              }
                            >
                              <i className="nc-icon nc-basket"></i> Hapus
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getListFiturLoading ? (
                      <tr>
                        <td colSpan="3" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListFiturError ? (
                      <tr>
                        <td colSpan="3" align="center">
                          {getListFiturError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="3" align="center">
                          Data Kosong
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getListFiturLoading: state.FiturReducer.getListFiturLoading,
  getListFiturResult: state.FiturReducer.getListFiturResult,
  getListFiturError: state.FiturReducer.getListFiturError,

  deleteFiturLoading: state.FiturReducer.deleteFiturLoading,
  deleteFiturResult: state.FiturReducer.deleteFiturResult,
  deleteFiturError: state.FiturReducer.deleteFiturError,
});

export default connect(mapStateToProps, null)(ListFitur);
