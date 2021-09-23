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
  Spinner,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { deletePbb, getListPbb } from "../../actions/PBBAction";
import swal from "sweetalert";

class ListPbb extends Component {
  componentDidMount() {
    this.props.dispatch(getListPbb());
  }

  componentDidUpdate(prevProps) {
    const { deletePbbResult } = this.props;

    if (deletePbbResult && prevProps.deletePbbResult !== deletePbbResult) {
      swal("Sukses!", deletePbbResult, "success");
      this.props.dispatch(getListPbb());
    }
  }

  removeData = (images, key) => {
    this.props.dispatch(deletePbb(images, key));
  };

  render() {
    const { getListPbbError, getListPbbLoading, getListPbbResult } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Pbb</CardTitle>
                <Link
                  to="/admin/Pbb/tambah"
                  className="btn btn-primary float-right"
                >
                  Tambah Pbb
                </Link>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Nama</th>
                      <th>Tagihan</th>
                      <th>Jenis</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getListPbbResult ? (
                      Object.keys(getListPbbResult).map((key) => (
                        <tr key={key}>
                          <td>{getListPbbResult[key].nama}</td>
                          <td>Rp. {getListPbbResult[key].tagihan}</td>
                          <td>{getListPbbResult[key].jenis} </td>
                          <td>
                            <Link
                              className="btn btn-warning"
                              to={"/admin/Pbb/edit/" + key}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>

                            <Button
                              color="danger"
                              className="ml-2"
                              onClick={() =>
                                this.removeData(
                                  getListPbbResult[key].gambar,
                                  key
                                )
                              }
                            >
                              <i className="nc-icon nc-basket"></i> Hapus
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getListPbbLoading ? (
                      <tr>
                        <td colSpan="6" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListPbbError ? (
                      <tr>
                        <td colSpan="6" align="center">
                          {getListPbbError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="6" align="center">
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
  getListPbbLoading: state.PbbReducer.getListPbbLoading,
  getListPbbResult: state.PbbReducer.getListPbbResult,
  getListPbbError: state.PbbReducer.getListPbbError,

  deletePbbLoading: state.PbbReducer.deletePbbLoading,
  deletePbbResult: state.PbbReducer.deletePbbResult,
  deletePbbError: state.PbbReducer.deletePbbError,
});

export default connect(mapStateToProps, null)(ListPbb);
